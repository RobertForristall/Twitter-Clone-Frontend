import React from "react";

export default function Tweet (props) {

    return <div className="tweet-container">
        <button className="round-button">
            <img 
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg" 
                alt=""
                style={{width: "110px", height: "110px", borderRadius: "50%"}}    
            />
        </button>

        <p className="tweet-msg tweet-font">{props.tweet.msg}</p>
        
    </div>
}