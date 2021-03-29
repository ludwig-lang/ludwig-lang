import React, {useState} from 'react'
import {MDXProvider} from '@mdx-js/react'
import ReactDOM from 'react-dom';
import './index.css'
import Editor from 'react-simple-code-editor'
import ludwig from 'ludwig-lang-frontend'
/* eslint-disable */
import Content from '!babel-loader!@mdx-js/loader!./index.md'


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
                                        rows={Math.min(results.match(/[^\r\n]+/g).length + 1, 20)}
                                        value={results}/>

    function execute() {
        let output = ''
        const env = ludwig.env()
        const {str} = env
        env.println = x => {
            output += `${x}\n`
        }
        env.print = x => {
            output += x + ''
        }
        setResults('')
        setError('')
        setIdle(false)

        setTimeout(() => {
            try {
                const res = ludwig.eval(code, '', env)
                setResults(output + ((res !== null && res !== undefined) ? str(res) : ''))
            } catch (e) {
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
            {results && <p>{output}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

ReactDOM.render(
    <div style={{width: '80%', margin: 'auto'}}>
        <MDXProvider components={{code: LudwigSnippet}}>
            <Content/>
        </MDXProvider>
    </div>
    ,
    document.getElementById('root')
);
