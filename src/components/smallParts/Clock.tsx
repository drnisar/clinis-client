import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const today = new Date();

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          fontSize: "150px",
          fontFamily: "Digital-7",
          letterSpacing: "5px",
          fontWeight: "bold",
        }}
      >
        {time.toLocaleTimeString()}
      </h2>
      <h4>{today.toDateString()}</h4>
    </div>
  );
};

export default Clock;
