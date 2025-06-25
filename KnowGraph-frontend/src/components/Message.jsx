import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./Message.css";
import logo from "../assets/logo.png";

let addMessage;

const typeIcon = {
  success: <img src={logo} alt="logo" className="reddit-message-logo" />,
  error: <img src={logo} alt="logo" className="reddit-message-logo" />,
  info: <img src={logo} alt="logo" className="reddit-message-logo" />,
  warning: <img src={logo} alt="logo" className="reddit-message-logo" />,
};

const MessageContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    addMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
      setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, msg.duration || 2200);
    };
  }, []);

  return (
    <div className="reddit-message-root">
      {messages.map((msg, idx) => (
        <div key={idx} className={`reddit-message reddit-message-${msg.type}`}>
          <span className="reddit-message-icon">
            {typeIcon[msg.type] || typeIcon.info}
          </span>
          {msg.content}
        </div>
      ))}
    </div>
  );
};

// 保证只挂载一次
function mountMessageRoot() {
  if (!document.getElementById("reddit-message-root")) {
    const div = document.createElement("div");
    div.id = "reddit-message-root";
    document.body.appendChild(div);
    createRoot(div).render(<MessageContainer />);
  }
}

mountMessageRoot();

const Message = {
  success(content, duration) {
    addMessage && addMessage({ type: "success", content, duration });
  },
  error(content, duration) {
    addMessage && addMessage({ type: "error", content, duration });
  },
  info(content, duration) {
    addMessage && addMessage({ type: "info", content, duration });
  },
  warning(content, duration) {
    addMessage && addMessage({ type: "warning", content, duration });
  },
};

export default Message;
