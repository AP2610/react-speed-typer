import React, { useState, useEffect, StrictMode } from 'react';
import '../scss/App.scss';

/**
 * Challenge: Using hooks, track the state of the text in the textarea on every keystroke
 * To verify it's working, you could just console.log the state on every change
 */

const App = props => {
    const DEFAULT_TIME = 5;
    const [text, setText] = useState("");
    const [prevText, setPrevText] = useState([]);
    const [timer, setTimer] = useState(DEFAULT_TIME);
    const [running, setRunning] = useState(false)
    const [count, setCount] = useState(0);

    const wordCounter = (textString) => {
        const words = textString.trim().split(" ");
        const wordCount = words.filter(word => word !== "").length;
        return wordCount;
    };

    const handleTextChange = event => {
        const {value} = event.target;
        setText(value);
    };

    const startGame = () => {
        setRunning(true);
        setTimer(DEFAULT_TIME);
        setText("");
    }

    useEffect(() => {
        if (running) {
            setCount(wordCounter(text));
        }
    }, [running, text])

    useEffect(() => {
        if (running && timer > 0) {
            const timerId = setTimeout(() => {
                setTimer(prevTimer => prevTimer - 1)
            }, 1000);
    
            return () => {
                clearTimeout(timerId)
            };
        } else if (timer === 0) {
            setRunning(false);
        }
    }, [timer, running]);

    useEffect(() => {
        if (!running) {
            if (text !== "") {
                setPrevText([...prevText, text.trim()])
            }
        }
    }, [running])

    const previousTexts = prevText && prevText.map((text, index) => 
            <li key={index}>
                <p>{text}</p>
                <p>{wordCounter(text)}</p>
            </li>
        )

    return (
        <div className="container">
            <h1 className="title">Speed Typer 3000</h1>
            <textarea 
                className="text-content" 
                value={text} 
                onChange={handleTextChange} 
                placeholder="Start typing..." 
                disabled={!running}
            />
            <h4 className="time-remaining">
                {timer > 0 ? `Time remaining: ${timer}` : "Times up!!!"}
            </h4>
            <button onClick={startGame} disabled={running}>Start</button>
            <h2>Word count: {count}</h2>
            <ul>
                <li><p>[Text]</p><p>[Count]</p></li>
                {previousTexts}
            </ul>
        </div>
    )
}

export default App;
