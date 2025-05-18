import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const dance = keyframes`
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-10px) rotate(5deg) scale(1.1);
  }
  50% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  75% {
    transform: translateY(-10px) rotate(-5deg) scale(1.1);
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
`;

const CricketContainer = styled.div`
  position: relative;
  margin: 20px auto;
  animation: ${props => props.$isActive ? css`${dance} ${props.$showingSequence ? '0.5s' : '1s'} infinite` : 'none'};
  transform-origin: bottom center;
  transition: opacity 0.3s ease;
`;

const Cricket = ({ isActive, showingSequence }) => {
  return (
    <CricketContainer
      $isActive={isActive}
      $showingSequence={showingSequence}
      style={{ opacity: isActive ? 1 : 0.5 }}
    >
      <svg width="50" height="50" viewBox="0 0 100 100">
        {/* Corpo do grilo */}
        <ellipse cx="50" cy="60" rx="30" ry="25" fill="#2E7D32" />
        
        {/* Cabeça */}
        <circle cx="50" cy="35" r="15" fill="#2E7D32" />
        
        {/* Olhos */}
        <circle cx="45" cy="32" r="3" fill="white" />
        <circle cx="55" cy="32" r="3" fill="white" />
        
        {/* Antenas */}
        <path d="M 45 25 Q 35 15 30 10" stroke="#2E7D32" strokeWidth="2" fill="none" />
        <path d="M 55 25 Q 65 15 70 10" stroke="#2E7D32" strokeWidth="2" fill="none" />
        
        {/* Pernas */}
        <path d="M 25 60 Q 15 70 10 65" stroke="#2E7D32" strokeWidth="3" fill="none" />
        <path d="M 75 60 Q 85 70 90 65" stroke="#2E7D32" strokeWidth="3" fill="none" />
        <path d="M 30 70 Q 20 85 15 80" stroke="#2E7D32" strokeWidth="3" fill="none" />
        <path d="M 70 70 Q 80 85 85 80" stroke="#2E7D32" strokeWidth="3" fill="none" />
      </svg>
    </CricketContainer>
  );
};

export default Cricket;