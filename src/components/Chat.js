import React from 'react'

export default function Chat() {
    return (
        <div className="chat">
        <div className="chat-users">
          Комната: <b>6151919135491</b>
          <hr />
          <b>Онлайн 1:</b>
          <ul>
              <li>Name</li>
          </ul>
        </div>
        <div className="chat-messages">
          <div className="messages">
              <div className="message">
                <p>messages</p>
                <div>
                  <span>user name</span>
                </div>
              </div>
          </div>
          <form>
            <textarea
              className="form-control"
              rows="3"></textarea>
            <button type="button" className="btn btn-primary">
              Отправить
            </button>
          </form>
        </div>
      </div>
    )
}
