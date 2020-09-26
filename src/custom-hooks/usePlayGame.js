import {useState, useEffect, useRef} from "react";

const usePlayGame = (
    defaultTime = 15,
) => {
    const DEFAULT_TIME = defaultTime;
    const [text, setText] = useState("");
    const [running, setRunning] = useState(false);
    const [timer, setTimer] = useState(DEFAULT_TIME);
    const [count, setCount] = useState(0);
    // const [prevText, setPrevText] = useState([]);
    const textAreaRef = useRef(null);

    const wordCounter = (textString) => {
        const words = textString.trim().split(" ");
        const wordCount = words.filter(word => word !== "").length;
        return wordCount;
    };

    const handleTextChange = event => {
        const { value } = event.target;
        setText(value);
    };

    const startGame = () => {
        setRunning(true);
        setTimer(DEFAULT_TIME);
        setText("");
        textAreaRef.current.disabled = false;
        textAreaRef.current.focus();
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

    // useEffect(() => {
    //     if (!running) {
    //         if (text !== "") {
    //             setPrevText([...prevText, text.trim()])
    //         }
    //     }
    // }, [running])

    // const previousTexts = prevText && prevText.map((text, index) => 
    //         <li key={index}>
    //             <p>{text}</p>
    //             <p>{wordCounter(text)}</p>
    //         </li>
    //     )

    return {
        text,
        running,
        timer,
        count,
        textAreaRef,
        startGame,
        handleTextChange,
    }
}

export default usePlayGame;