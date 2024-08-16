import React, { useContext, useState } from "react";
import "./Sidebar.css";
import {assets} from "../../assets/assets";
import { Context } from "../../context/Context";

export default function Sidebar() {
    const [extended, setExtended] = useState(false)
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    const handleMenu = () => {
        setExtended(!extended)
    }

    const loadPrompt = async(prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    let limitedPrompts = prevPrompts.slice(-10);
    return( 
        <div>
            <div className="sidebar">
                <div className="top">
                    <div>
                        <img src= {assets.menu_icon} alt="" className="icon menu-icon" onClick={handleMenu}/>
                    </div>

                    <div onClick={() => newChat()} className="new-chat">
                        <img src={assets.plus_icon} alt="" className="plus"/>
                        {extended && <p>New Chat</p>}
                    </div>

                    {extended && (
                        <div className="recent">
                            <p className="recent-title">Recent</p>
                            {limitedPrompts.map((item, index) => {
                                return(
                                    <div 
                                        className="recent-entry hover-effect"
                                        onClick={() => loadPrompt(item)}
                                        key={index}
                                    >
                                        <img src={assets.message_icon} alt="" className="icon"/>
                                        <p>{item.slice(0,18)}...</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                <div className="bottom">
                    <div className="bottom-item hover-effect">
                        <img src={assets.question_icon} alt="" className="icon"/>
                        {extended && <p>Help</p>}
                    </div>

                    <div className="bottom-item hover-effect">
                        <img src={assets.history_icon} alt="" className="icon"/>
                        {extended && <p>Activity</p>}
                    </div>

                    <div className="bottom-item hover-effect">
                        <img src={assets.setting_icon} alt="" className="icon"/>
                        {extended && <p>Settings</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
