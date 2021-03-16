import React, {useState} from 'react'
import {MDXProvider} from '@mdx-js/react'
import ReactDOM from 'react-dom';
import './index.css'
/* eslint-disable */
import Content from '!babel-loader!@mdx-js/loader!./index.md'
import ludwig from 'ludwig-lang'

const closeChars = new Map([
    ['`', '`'],
    ['[', ']']
]);

function LudwigSnippet(props) {
    const [code, setCode] = useState(props.children.trim())
    const [results, setResults] = useState()
    const [error, setError] = useState('')
    const [idle, setIdle] = useState(true)


    const input = <textarea defaultValue={code}
                            readOnly={!idle}
                            style={{fontFamily: 'Monospace', width: '100%', resize: 'none'}}
                            spellCheck={false}
                            rows={(code.match(/[^\r\n]+/g) || []).length + 1}
                            onChange={e => {
                                setCode(e.target.value)
                                const text = e.target
                                const maxHeight = 400
                                let adjustedHeight = text.clientHeight;
                                if (!maxHeight || maxHeight > adjustedHeight) {
                                    adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
                                    if (maxHeight)
                                        adjustedHeight = Math.min(text.scrollHeight, adjustedHeight);
                                    if (adjustedHeight > text.clientHeight)
                                        text.style.height = adjustedHeight + "px";
                                }
                            }}
                            onInput={e => {
                                const pos = e.target.selectionStart;
                                const val = [...e.target.value];

                                const char = val.slice(pos - 1, pos)[0];
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
                                   rows={results.match(/[^\r\n]+/g).length + 1}
                                   cols="80"
                                   style={{fontFamily: 'Monospace', resize: 'none', width: '100%', 'background-color': 'black', color: 'white'}}
                                   value={results}/>



    function execute() {
        let output = ''
        const env = ludwig.env()
        env.println = x => {
            output += `${x}\n`
        }
        setResults('')
        setError('')
        setIdle(false)

        setTimeout(() => {
            try {
                const res = ludwig.eval(code, '', env)
                const savedToStr = Function.prototype.toString
                Function.prototype.toString = () => 'λ'
                try {
                    setResults(output + ((res !== null && res !== undefined) ? res + '' : ''))
                } finally {
                    Function.prototype.toString = savedToStr
                }
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
