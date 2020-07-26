import React, { useState } from 'react';
import '../scss/App.scss';

/**
 * Challenge: Using hooks, track the state of the text in the textarea on every keystroke
 * To verify it's working, you could just console.log the state on every change
 */

const App = props => {
    const [text, setText] = useState("");
    const [count, setCount] = useState(0)

    return (
        <div className="container">
            <h1 className="title">This is the title</h1>
            <textarea className="text-content" value={text} onChange={() => setText(console.log("You typed something"))} placeholder="Start typing..." />
            <h4 className="time-remaining">Time remaining: </h4>
            <button>Start</button>
            <h2>Word count: </h2>
        </div>
    )
}

export default App;
