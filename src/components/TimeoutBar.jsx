import { useState, useEffect } from 'react';

function TimeoutBar({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setRemainingTime(timeout);
    
    const timer = setTimeout(onTimeout, timeout);

    const intervalTime = 100;
    const interval = setInterval(() => {
      setRemainingTime((prev) => Math.max(prev - intervalTime, 0));
    }, intervalTime);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [timeout, onTimeout]);

  return <progress id="timeout-bar" className={mode} max={timeout} value={remainingTime} />;
}

export default TimeoutBar;