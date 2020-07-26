import React, { useState, useEffect } from 'react';
import '../scss/App.scss';

/**
 * Challenge: Using hooks, track the state of the text in the textarea on every keystroke
 * To verify it's working, you could just console.log the state on every change
 */

const App = props => {
    const [text, setText] = useState("");
    const [timer, settimer] = useState(5);
    const [running, setRunning] = useState(false)
    const [count, setCount] = useState(0);

    const wordCounter = (textString) => {
        const words = textString.trim().split(" ");
        const wordCount = words.filter(word => word !== "").length;
        setCount(wordCount);
    };

    const handleTextChange = event => {
        const {value} = event.target;
        setText(value);
    };

    useEffect(() => {
        if (running) {
            wordCounter(text)
        }
    })

    useEffect(() => {
        if (running) {
            const timerId = setTimeout(() => {
                settimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0)
            }, 1000);
    
            return () => {
                clearTimeout(timerId)
            };
        };
    });

    return (
        <div className="container">
            <h1 className="title">This is the title</h1>
            <textarea className="text-content" value={text} onChange={handleTextChange} placeholder="Start typing..." />
            <h4 className="time-remaining">Time remaining: {timer === 0 ? "Times up!!!" : timer}</h4>
            <button onClick={() => setRunning(prevRunning => !prevRunning)}>Start</button>
            <h2>Word count: {count}</h2>
        </div>
    )
}

export default App;
