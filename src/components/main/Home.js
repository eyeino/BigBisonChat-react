import React, { useEffect } from 'react';

export default function Home(props) {
  useEffect(() => {
    document.title = props.title;
  });

  return (
    <div className="home-container">
      <div className="text-wrapper">
        <h1>
          Chat with your friends, majestically.
        </h1>
        <div className="home-bubbles">
          <div className="bubble-wrap bubble-right">
            <div className="bubble-body bubble-right">
              Going to the ranch at 8. Be there!
            </div>
          </div>
          <div className="bubble-wrap bubble-left">
            <div className="bubble-body bubble-left">
              It's lit! I'll bring the grass!
            </div>
          </div>
        </div>
        <div className="home-bottom">
          <div>Fun fact: bison can run</div>
          <div>up to 35 miles per hour.</div>
          <button onClick={props.auth.login} className="button">
            Login / Register
          </button>
          <p>
            A project by <a href='https://github.com/eyeino'>@eyeino</a>
          </p>
        </div>
      </div>
    </div>
  );
}