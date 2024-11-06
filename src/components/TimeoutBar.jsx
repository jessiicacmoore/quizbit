import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getColorsByMode } from '@/utils/utils';

const StyledProgress = styled.progress`
  border-radius: 0.5rem;
  width: 50%;
  height: 1rem;

  ${({ $mode }) => {
    const { barColor, valueColor } = getColorsByMode($mode);

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

  return (
    <StyledProgress
      $mode={mode}
      id="timeout-bar"
      className={mode}
      max={timeout}
      value={remainingTime}
    />
  );
}

export default TimeoutBar;