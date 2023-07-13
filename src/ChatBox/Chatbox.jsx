import React, { useState, useEffect, useRef, useCallback } from "react";
import EmojiPicker from "@emoji-mart/react";
import EmojiMartData from "@emoji-mart/data";

import "./Chatbox.css";

import avatarCat from "./avatar-cat.jpg";

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [listMessage, setListMessage] = useState([]);
  const [countMessage, setCountMessage] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(false);

  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      const MessageRandom = getRandomMessage();

      setTimeout(() => {
        setListMessage([
          ...listMessage,
          {
            id: 2,
            message: MessageRandom,
          },
        ]);
      }, 2000);
    } else {
      setIsFirstRender(true);
    }
  }, [countMessage]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.trim() !== "") {
      setListMessage([
        ...listMessage,
        {
          id: 1,
          message: message,
        },
      ]);
      setCountMessage(countMessage + 1);
    }

    setMessage("");
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
    setShowEmojiPicker(false);
  };

  const getRandomMessage = () => {
    const messages = [
      "Xin chào!",
      "Có gì mới?",
      "Bạn có câu hỏi gì không?",
      "Rất vui được trò chuyện với bạn!",
      "Cái gì cơ",
      "Thế à",
      "Tuyệt đấy",
      "Bạn thôi đi",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);

    return messages[randomIndex];
  };

  const renderMessage = useCallback(() => {
    return listMessage.map((message, index) => {
      if (message.id === 1) {
        return (
          <div className="chatbox-message-owner" key={index}>
            <div className="message-owner">{message.message}</div>
          </div>
        );
      } else {
        return (
          <div className="chatbox-message-guest" key={index}>
            <img className="avatar-guest" src={avatarCat} alt="avatar" />
            <div className="message-guest">{message.message}</div>
          </div>
        );
      }
    });
  }, [listMessage]);

  return (
    <div className="chatbox-container">
      <div
        className={`chatbox-bubble ${isChatOpen ? "open" : ""}`}
        onClick={toggleChat}
      >
        <div className="chatbox-bubble-icon">
          <span className="chatbox-bubble-icon-line" />
          <span className="chatbox-bubble-icon-line" />
          <span className="chatbox-bubble-icon-line" />
        </div>
      </div>
      {isChatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3 className="chatbox-title">Chat</h3>
            <button className="chatbox-close" onClick={toggleChat}>
              &times;
            </button>
          </div>
          <div className="chatbox-body">
            <div className="chatbox-message">{renderMessage()}</div>
          </div>
          <form className="chatbox-footer" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chatbox-input"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={handleInputChange}
            />
            <button type="submit" className="chatbox-send">
              Gửi
            </button>
            <div className="chatbox-emoji-picker" ref={emojiPickerRef}>
              <span
                className="chatbox-emoji-picker-toggle"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😃
              </span>
            </div>
          </form>
        </div>
      )}
      {showEmojiPicker && (
        <div className="emoji-picker">
          <EmojiPicker
            data={EmojiMartData}
            previewPosition="none"
            onEmojiSelect={handleEmojiSelect}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
