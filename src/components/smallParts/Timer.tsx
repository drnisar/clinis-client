import React from "react";
import { useStopwatch } from "react-timer-hook";

const Timer = () => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  return (
    <div style={{ textAlign: "center" }}>
      <p>Surgery Timer</p>
      <div
        style={{
          fontSize: "150px",
          fontFamily: "Digital-7",
          letterSpacing: "5px",
          fontWeight: "bold",
        }}
      >
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Timer;
