import React, { useEffect } from 'react';

export default function Home(props) {
  useEffect(() => {
    document.title = props.title;
  });

  return (
    <div className="home-container">
      <h1
        style={{
          textAlign: "center",
          paddingTop: "20px",
          paddingBottom: "30px"
        }}
      >
        Chat with your friends, majestically.
      </h1>
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
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        Fun fact: bison can run up to 35 miles per hour.
      </div>
      <button onClick={props.auth.login} className="button">
        Login / Register
      </button>
      <div style={{ textAlign: 'center', color: 'lightgray', paddingTop: '20px' }}>
        A project by <a style={{ color: 'lightgray'}} href='https://github.com/eyeino'>@eyeino</a>
      </div>
    </div>
  );
}