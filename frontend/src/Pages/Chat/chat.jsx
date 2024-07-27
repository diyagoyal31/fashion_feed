import React from 'react';
import './chat.css';

const Chat = () => {
  return (
    <main className="main-content">
      <div className="chat-layout">
        <aside className="sidebar">
          <div className="sidebar-content">
            <div className="messages-header">
              <div className="messages-title">
                <h2>Messages</h2>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4280b8432c6114136693a07b3fbcad16b7ad6c18db9d26c952f9080bee6f828?apiKey=e0ff1949bd6d4c81976d269bea4a004f&&apiKey=e0ff1949bd6d4c81976d269bea4a004f"
                  className="messages-icon"
                  alt=""
                />
              </div>
            </div>
            <hr className="divider" />
            <div className="search-messages">
              <input
                type="text"
                className="search-input"
                placeholder="Search messages"
                aria-label="Search messages"
              />
            </div>
            <div className="message-list">
              <div className="message-item">
                <div className="message-header">
                  <span className="user-name">User Name</span>
                  <span className="message-time">24m</span>
                </div>
               
              </div>
            </div>
          </div>
        </aside>
        <section className="chat-area">
          <div className="chat-content">
            <div className="chat-header">
              <h3 className="chat-user">User Name</h3>
              <div className="user-status">
                <span className="status-indicator"></span>
                <span className="status-text">Online</span>
              </div>
            </div>
            <div className="chat-messages">
              <div className="message-received">
                <span className="user-avatar">U</span>
                <div className="message-content">
                  <p className="message-bubble">Hello I am testing</p><br></br><br></br>
                  <p className="message-bubble">Can you help me choose Outfit?</p>
                </div>
                <br></br>
              </div>
              <div className="message-sent">
                <div className="message-content">
                  <p className="message-bubble sent-bubble">Yes sure</p>
                </div>
                <span className="user-avatar">U</span>
              </div>
            </div>
            <form className="chat-input">
              <label htmlFor="chat-message" className="visually-hidden">
               
              </label>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f725321c51a090332b35a4169c43588d13e6d47d51670943706d068997a3a69e?apiKey=e0ff1949bd6d4c81976d269bea4a004f&&apiKey=e0ff1949bd6d4c81976d269bea4a004f"
                className="attachment-icon"
                alt="Attachment icon"
              />
              <div className="input-wrapper">
                <input
                  type="text"
                  id="chat-message"
                  placeholder="Type a message"
                />
                <button type="submit" aria-label="Send message">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/22dc23f41ecf8013de8e3709b5fddff368dc9c6634ce28eab4a5b76856395b4b?apiKey=e0ff1949bd6d4c81976d269bea4a004f&&apiKey=e0ff1949bd6d4c81976d269bea4a004f"
                    className="send-icon"
                    alt="Send icon"
                  />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Chat;
