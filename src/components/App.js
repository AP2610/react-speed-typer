import React from 'react';
import '../scss/App.scss';
import usePlayGame from "../custom-hooks/usePlayGame";

/**
 * Challenge: Using hooks, track the state of the text in the textarea on every keystroke
 * To verify it's working, you could just console.log the state on every change
 */

const App = props => {
    const { 
        text,
        handleTextChange,
        running,
        startGame,
        count,
        timer,
        textAreaRef
    } = usePlayGame();

    return (
        <div className="container">
            <h1 className="title">Speed Typer 3000</h1>
            <textarea 
                className="text-content" 
                value={text} 
                onChange={handleTextChange} 
                placeholder="Start typing..." 
				disabled={!running}
				ref={textAreaRef}
            />
            <h4 className="time-remaining">
                {timer > 0 ? `Time remaining: ${timer}` : "Times up! Try again."}
            </h4>
            <button onClick={startGame} disabled={running}>Start</button>
            {/* If you want to display the previously typed strings as tabbular data then it is semantically correct to use a table */}
            <h2>Word count: {count}</h2>
            {/* <ul>
                <li><p>[Text]</p><p>[Count]</p></li>
                {previousTexts}
            </ul> */}
        </div>
    )
}

export default App;
