import React, {useState} from 'react'
import {MDXProvider} from '@mdx-js/react'
import ReactDOM from 'react-dom';
import './index.css'
import Editor from 'react-simple-code-editor'
import ludwig from 'ludwig-lang-frontend'
import fetch from 'sync-fetch'
import path from 'path-browserify'
/* eslint-disable */
import Content from '!babel-loader!@mdx-js/loader!./index.md'


let currentPath = '/ludwig-lang/'
const loaded = new Map()
ludwig.builtins.load = modulePath => {
    const filename = path.normalize(path.join(currentPath, modulePath.endsWith('.ludwig') ? modulePath : (modulePath + '.ludwig')))
    if (!loaded.has(filename)) {
        const source = fetch(filename).text()
        const savedPath = currentPath
        currentPath = path.dirname(filename)
        try {
            loaded.set(filename, ludwig.eval(source, filename))
        } finally {
            currentPath = savedPath
        }

    }
    return loaded.get(filename)
}

const closeChars = new Map([
    ['`', '`'],
    ['[', ']']
]);

const tokenType = value => {
    switch (value) {
        case '[':
            return 'lb'
        case ']':
            return 'rb'
        case '\\':
            return 'lambda'
        case '=':
            return 'assignment'
        default:
            if (value.trim().length === 0) {
                return 'ws'
            }
            if (value.startsWith('#')) {
                return 'comment'
            }
            if (value.startsWith('`')) {
                if (!value.endsWith('`') || value.length === 1) {
                    return 'unterminated-string'
                }
                return 'string'
            }
            return 'symbol'
    }
}

const escapeHtml= s => s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")

const highlight = (source) => {
    const tokens = ludwig.tokenize(source, false, false)
    let level = 0
    return tokens.map(t => {
        let type = tokenType(t.value)
        switch (type) {
            case 'lb':
                level++
                type = 'lb-' + ((level - 1) % 4 + 1)
                break
            case 'rb':
                type = 'rb-' + (level < 0 ? 0 : (level - 1) % 4 + 1)
                level--
                break
        }
        const s = `<span class="ludwig-${type}">${escapeHtml(t.value)}</span>`
        return s
    }).join('')
}

function LudwigSnippet(props) {
    const [code, setCode] = useState(props.children.trim())
    const [results, setResults] = useState()
    const [error, setError] = useState('')
    const [idle, setIdle] = useState(true)

    const language = props.className && props.className.replace(/language-/, '')
    if (language && language !== 'ludwig') {
        return <pre>{code}</pre>
    }

    const input =
        <Editor className={'ludwig-editor'}
                value={code}
                readOnly={!idle}
                onValueChange={setCode}
                highlight={highlight}
                onKeyPress={e => {
                    const pos = e.target.selectionStart;
                    const val = [...e.target.value];

                    const char = e.key;
                    const closeChar = closeChars.get(char);

                    if (closeChar) {
                        val.splice(pos, 0, closeChar);
                        e.target.value = val.join('');
                        e.target.selectionEnd = pos;
                    }
                }
                }
        />

    const output = results && <Editor className={'ludwig-output'}
                                        readOnly
                                        highlight={escapeHtml}
                                        rows={Math.min(results.match(/[^\r\n]+/g).length, 20)}
                                        value={results}/>

    const errorMessage = error && <Editor className={'ludwig-error'}
                                          readOnly
                                          highlight={escapeHtml}
                                          rows={1}
                                          value={error}/>

    function execute() {
        let output = ''
        const env = ludwig.env()
        ludwig.builtins.print = x => {
            output += ludwig.builtins.str(x)
        }
        setResults('')
        setError('')
        setIdle(false)

        setTimeout(() => {
            try {
                const res = ludwig.eval(code, '', env)
                setResults(output + ((res !== null && res !== undefined) ? env.str(res) : ''))
            } catch (e) {
                if (e instanceof ludwig.LudwigError) {
                    console.error(e.cause)
                }
                console.error(e)
                setError(e.message)
            } finally {
                setIdle(true)
            }
        }, 0)
    }

    return (
        <div>
            <div style={{position: 'relative',}}>
                {input}
                <button type="button" disabled={!idle} style={{position: 'absolute', right: '0px', top: '0px'}}
                        onClick={execute}>▶️Run️
                </button>
            </div>
            {output}
            {errorMessage}
        </div>
    )
}

function HiddenBlockquote(props) {
    return null
}

ReactDOM.render(
    <MDXProvider components={{code: LudwigSnippet, blockquote: HiddenBlockquote}}>
        <Content/>
    </MDXProvider>
    ,
    document.getElementById('root')
);
