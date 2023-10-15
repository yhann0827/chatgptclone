import "./App.css";
import { useState, useRef, useEffect } from "react";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.jpg";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openai";
function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi I am ChatGPT, a state-of-the-art language model developed by OpenAI. I'm designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seek information, or even request assistance with various tasks. Just let me know how can I help you!",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
  };

  const handleEnter = async e => {
    if (e.key === "Enter") await handleSend();
  };

  const handleQuery = async e => {
    const text = e.target.value;
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img className="logo" src={gptLogo} alt="Logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img className="addBtn" src={addBtn} alt="new chat" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query" value={"What is Programming?"} onClick={handleQuery}>
              <img src={msgIcon} alt="Query" />
              What is Programming?
            </button>
            <button className="query" value={"How to use an API?"} onClick={handleQuery}>
              <img src={msgIcon} alt="Query" />
              How to use an API??
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listitems">
            <img className="listitemsImg" src={home} alt="Home" />
            Home
          </div>
          <div className="listitems">
            <img className="listitemsImg" src={saved} alt="Saved" />
            Saved
          </div>
          <div className="listitems">
            <img className="listitemsImg" src={rocket} alt="Upgrade" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={1} className={message.isBot ? "chat bot" : "chat"}>
              <img className="chatimg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onKeyDown={handleEnter}
              onChange={e => {
                setInput(e.target.value);
              }}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="" />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places or facts. ChatGPT August 20 Version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
