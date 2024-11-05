import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledProgress = styled.progress`
  border-radius: 0.5rem;
  width: 50%;
  height: 1rem;

  ${({ $mode }) => {
    const barColor = $mode === 'answered' ? '#FAD9BD' 
                  : $mode === 'correct' ? '#D7EED7' 
                  : $mode === 'wrong' ? '#eb8c95' 
                  : '#99DBF8';
                  
    const valueColor = $mode === 'answered' ? '#f39f5a' 
                   : $mode === 'correct' ? '#8dcd8d' 
                   : $mode === 'wrong' ? '#dc3545' 
                   : '#00a6ed';

    return `
      &::-webkit-progress-bar {
        border-radius: 0.5rem;
        background-color: ${barColor};
      }
      &::-webkit-progress-value {
        border-radius: 0.5rem;
        background-color: ${valueColor};
      }
    `;
  }}
`;

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

  return <StyledProgress $mode={mode} id="timeout-bar" className={mode} max={timeout} value={remainingTime} />;
}

export default TimeoutBar;