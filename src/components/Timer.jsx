import React, { useEffect, useState } from "react";

const Timer = ({ setTimeStop, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimeStop(true);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimeStop, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
};

export default Timer;
