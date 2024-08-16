import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")


    function resultAnimation(index, nextWord) {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const newChat = async () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input)
            response = await runChat(input);
        }
        let formattedResponse = response
            .split("**").map((part, i) => i % 2 === 1 ? `<b>${part}</b>` : part).join("")
            .replace(/\*\s/g, "<br>&#8226; ")
            .replace(/(\d+\.)\s/g, "<br>$1 ")
            .replace(/\n/g, " <br>")
            .replace(/^##\s+/, "");

        setInput(""); 
        let newResponseArray = formattedResponse.split(" ")
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i]
            resultAnimation(i, nextWord + " ")
        }
        setLoading(false);
        setInput("")
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider