import React, {useState} from 'react'
import {MDXProvider} from '@mdx-js/react'
import ReactDOM from 'react-dom';
import './index.css'
import Editor from 'react-simple-code-editor'
import ludwig from 'ludwig-lang'
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

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const highlight = (source) => {
    const tokens = ludwig.tokenize(source, false, false)
    return tokens.map(t => `<span class="ludwig-${tokenType(t.value)}">${escapeHtml(t.value)}</span>`).join('')
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
        <Editor value={code}
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

    const output = results && <textarea readOnly
                                        rows={Math.min(results.match(/[^\r\n]+/g).length + 1, 20)}
                                        cols="80"
                                        style={{
                                            fontFamily: 'Monospace',
                                            resize: 'none',
                                            width: '100%',
                                            'background-color': 'black',
                                            color: 'white'
                                        }}
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
                setError(e.message)
            } finally {
                setIdle(true)
            }
        }, 0)
    }

    return (
        <p>
            <div style={{position: 'relative'}}>
                {input}
                <button type="button" disabled={!idle} style={{position: 'absolute', right: '0px', top: '0px'}}
                        onClick={execute}>▶️Run️
                </button>
            </div>
            {results && <p>{output}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </p>
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
