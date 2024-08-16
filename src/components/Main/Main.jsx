import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

export default function Main() {
    const { onSent, recentPrompt, showResult, loading, resultData, input, setInput } =  useContext(Context)

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            e.preventDefault()
            onSent()
        }
    }

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" className="user-icon" />
            </div>

            <div className="main-container">

                {!showResult? 
                <>
                    <div className="greet">
                        <span className="hello-text">Hello, Dev.</span>
                        <h1 className="help-text">How can I help you today?</h1>
                    </div>

                    <section className="suggestion-container">
                        <div className="suggestion hover-effect">
                            <p>Suggest beautiful places to see on an upcoming road trip</p>
                            <div className="img-container">
                                <img src={assets.compass_icon} alt="" className="suggestion-icon" />
                            </div>
                        </div>

                        <div className="suggestion hover-effect">
                            <p>Briefly summarize this concept: urban planning</p>
                            <div className="img-container">
                                <img src={assets.bulb_icon} alt="" className="suggestion-icon" />
                            </div>
                        </div>

                        <div className="suggestion hover-effect">
                            <p>Brainstorm team bonding activities for our work retreat</p>
                            <div className="img-container">
                                <img src={assets.message_icon} alt="" className="suggestion-icon" />
                            </div>
                        </div>

                        <div className="suggestion hover-effect">
                            <p>Tell me about React js and React native</p>
                            <div className="img-container">
                                <img src={assets.code_icon} alt="" className="suggestion-icon" />
                            </div>
                        </div>
                    </section>
                </> : 
                <div className="result">
                    <div className="user-input-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>

                    <div className="generated-result">
                        <img src={assets.gemini_icon} alt="" />
                        {loading && 
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>}
                        <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                    </div>
                </div>} 

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" 
                            placeholder="Enter a prompt here" 
                            onChange={(e) => {setInput(e.target.value)}}
                            value={input}
                            onKeyDown={handleKeyPress}
                        />
                        <div className="search-icons">
                            <img src={assets.gallery_icon} alt="" className="search-icon"/>
                            <img src={assets.mic_icon} alt="" className="search-icon"/>
                            <img onClick={() => onSent()} src={assets.send_icon} alt=""  className="search-icon"/>
                        </div>
                    </div>
                    <p className="disclaimer-text">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
                </div>
            </div>
        </div>
    );
}
