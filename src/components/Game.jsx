import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import '../styles/typography.css';
import Cricket from './Cricket';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaTrophy, FaMusic, FaVolumeMute } from 'react-icons/fa';
import useSound from 'use-sound';

const themes = {
  default: {
    background: 'linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)',
    primary: '#7C4DFF',
    secondary: '#2c3e50'
  },
  night: {
    background: 'linear-gradient(45deg, #000000 0%, #1a0033 50%, #000000 100%)',
    primary: '#00ff99',
    secondary: '#ff00ff'
  },
  sunset: {
    background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 100%)',
    primary: '#FF0080',
    secondary: '#FFFFFF'
  }
};

const floatingNotes = keyframes`
  0% { transform: translate(0, 0) rotate(0deg) scale(0.8); opacity: 0; filter: hue-rotate(0deg); }
  50% { transform: translate(-20px, -100px) rotate(180deg) scale(1.2); opacity: 1; filter: hue-rotate(180deg); }
  100% { transform: translate(-40px, -200px) rotate(360deg) scale(0.8); opacity: 0; filter: hue-rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const spotlight = keyframes`
  0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
  50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
  100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
`;

const MusicNote = styled.div`
  position: absolute;
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #00ff99, 0 0 30px #ff00ff;
  animation: ${floatingNotes} 3s linear infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
  pointer-events: none;
  filter: brightness(1.5);
`;

const MusicButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: ${props => themes[props.theme || 'default']?.secondary || themes.default.secondary};
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  padding: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${props => themes[props.theme || 'default']?.background || themes.default.background};
  padding: 20px;
  transition: background 0.5s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(255,0,255,0.2) 0%,
      rgba(0,255,153,0.2) 25%,
      rgba(255,0,255,0.2) 50%,
      rgba(0,255,153,0.2) 75%,
      rgba(255,0,255,0.2) 100%);
    background-size: 400% 400%;
    animation: ${spotlight} 8s linear infinite;
    pointer-events: none;
    mix-blend-mode: overlay;
  }
`;

const Title = styled.h1`
  font-family: var(--font-display);
  color: ${props => themes[props.theme || 'default']?.secondary || themes.default.secondary};
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-extrabold);
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${pulse} 2s infinite ease-in-out;
  letter-spacing: var(--letter-spacing-tight);
`;

const GameArea = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const Sequence = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Arrow = styled.div`
  font-size: 2rem;
  padding: 1rem;
  border-radius: 50%;
  background: ${props => props.$active ? (themes[props.theme || 'default']?.primary || themes.default.primary) : '#e0e0e0'};
  color: white;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Score = styled.div`
  font-family: var(--font-primary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  color: ${props => themes[props.theme || 'default']?.secondary || themes.default.secondary};
  margin-top: 2rem;
  text-align: center;
  letter-spacing: var(--letter-spacing-normal);
`;

const Button = styled.button`
  font-family: var(--font-primary);
  background: ${props => themes[props.theme || 'default']?.primary || themes.default.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-semibold);
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;
  letter-spacing: var(--letter-spacing-wide);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }
`;

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
  position: relative;
  padding: 2rem;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 3rem;
    color: ${props => themes[props.theme || 'default']?.secondary || themes.default.secondary};
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
    animation: ${pulse} 2s infinite ease-in-out;
  }

  button {
    font-size: 1.5rem;
    padding: 1.2rem 2.4rem;
    background: ${props => themes[props.theme || 'default']?.primary || themes.default.primary};
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const Game = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showingSequence, setShowingSequence] = useState(false);
  const [activeArrow, setActiveArrow] = useState(null);
  const [level, setLevel] = useState(1);
  const [theme, setTheme] = useState('default');
  const [highScore, setHighScore] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [playBackgroundMusic, { stop: stopBackgroundMusic }] = useSound('./sounds/background-music.mp3', {
    volume: 0.5,
    loop: true
  });

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('highScore');
      if (savedScore) {
        setHighScore(parseInt(savedScore));
      }
    } catch (error) {
      console.warn('Erro ao acessar o localStorage:', error);
    }
  }, []);
  
  const [playSuccess] = useSound('./sounds/success.wav');
  const [playError] = useSound('./sounds/error.wav');
  const [playClick] = useSound('./sounds/click.wav');

  const directions = ['up', 'down', 'left', 'right'];
  const directionIcons = {
    up: <FaArrowUp />,
    down: <FaArrowDown />,
    left: <FaArrowLeft />,
    right: <FaArrowRight />
  };

  const generateSequence = () => {
    const newDirection = directions[Math.floor(Math.random() * directions.length)];
    setSequence([...sequence, newDirection]);
  };

  const showSequence = async () => {
    setShowingSequence(true);
    setPlayerSequence([]);
    const baseSpeed = 800;
    const speedReduction = Math.min(level * 50, 500);
    const speed = Math.max(baseSpeed - speedReduction, 300);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa inicial para preparação
      
      for (let i = 0; i < sequence.length; i++) {
        setActiveArrow(sequence[i]);
        if (audioEnabled) playClick();
        await new Promise(resolve => setTimeout(resolve, speed));
        setActiveArrow(null);
        await new Promise(resolve => setTimeout(resolve, speed / 2));
      }
      
      await new Promise(resolve => setTimeout(resolve, 500)); // Pausa final antes do jogador começar
    } catch (error) {
      console.error('Erro ao mostrar sequência:', error);
    } finally {
      setActiveArrow(null);
      setShowingSequence(false);
    }
  };

  const initializeAudio = async () => {
    try {
      // Create and resume AudioContext
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      await audioContext.resume();
      setAudioEnabled(true);
    } catch (error) {
      console.warn('Failed to initialize audio:', error);
      setAudioEnabled(false);
    }
  };

  const startGame = async () => {
    await initializeAudio();
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setLevel(1);
    setIsPlaying(true);
    setShowingSequence(false);
    setActiveArrow(null);
    generateSequence();
  };

  const toggleMusic = () => {
    if (audioEnabled) {
      // Desabilita todos os sons quando o ícone de mudo está visível
      setAudioEnabled(false);
      if (isMusicPlaying) {
        stopBackgroundMusic();
        setIsMusicPlaying(false);
      }
    } else {
      // Habilita todos os sons e inicia a música de fundo
      setAudioEnabled(true);
      if (!isMusicPlaying) {
        playBackgroundMusic();
        setIsMusicPlaying(true);
      }
    }
  };

  useEffect(() => {
    let timeoutId;
    if (sequence.length > 0 && isPlaying && !showingSequence && playerSequence.length === 0) {
      timeoutId = setTimeout(() => {
        showSequence();
      }, 1000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sequence, isPlaying]);

  const handleArrowClick = (direction) => {
    if (!isPlaying || showingSequence) return;

    if (audioEnabled) playClick();
    setActiveArrow(direction);

    const newPlayerSequence = [...playerSequence, direction];
    setPlayerSequence(newPlayerSequence);

    const currentIndex = newPlayerSequence.length - 1;
    
    if (direction !== sequence[currentIndex]) {
      if (audioEnabled) playError();
      if (score > highScore) {
        setHighScore(score);
        try {
          localStorage.setItem('highScore', score.toString());
        } catch (error) {
          console.warn('Erro ao salvar no localStorage:', error);
        }
      }
      // Reiniciar o jogo com uma única sequência após um breve delay
      setTimeout(() => {
        setSequence([]);
        setPlayerSequence([]);
        setScore(0);
        setLevel(1);
        setShowingSequence(false);
        setActiveArrow(null);
        const newDirection = directions[Math.floor(Math.random() * directions.length)];
        setSequence([newDirection]);
      }, 1000);
      return;
    }

    setTimeout(() => setActiveArrow(null), 200);

    if (newPlayerSequence.length === sequence.length) {
      if (audioEnabled) playSuccess();
      const newScore = score + 1;
      setScore(newScore);
      setPlayerSequence([]);
      if (newScore > 0 && newScore % 3 === 0) {
        setLevel(prevLevel => prevLevel + 1);
      }
      setTimeout(() => {
        setPlayerSequence([]);
        generateSequence();
      }, 1500);
    }
  };

  useEffect(() => {
    if (level >= 5 && theme === 'default') {
      setTheme('sunset');
    } else if (level >= 10 && theme === 'sunset') {
      setTheme('night');
    }
  }, [level]);

  const musicNotes = ['♪', '♫', '♬', '♩'];

  return (
    <>
      <GameContainer theme={theme}>
        <MusicButton onClick={toggleMusic} theme={theme}>
          {audioEnabled ? <FaMusic /> : <FaVolumeMute />}
        </MusicButton>
        {Array.from({ length: 10 }).map((_, i) => (
          <MusicNote
            key={i}
            delay={Math.random() * 2}
            left={Math.random() * 100}
          >
            {musicNotes[Math.floor(Math.random() * musicNotes.length)]}
          </MusicNote>
        ))}
        {!isPlaying ? (
          <WelcomeScreen theme={theme}>
            <h1>Dança dos Grilos 🦗</h1>
            <Cricket isActive={true} showingSequence={false} />
            <button onClick={startGame}>Começar a Dançar!</button>
          </WelcomeScreen>
        ) : (
          <GameArea>
            <Cricket isActive={isPlaying} showingSequence={showingSequence} />
            <Sequence>
              {directions.map((direction) => (
                <Arrow
                  key={direction}
                  onClick={() => handleArrowClick(direction)}
                  $active={playerSequence[playerSequence.length - 1] === direction || activeArrow === direction}
                  theme={theme}
                >
                  {directionIcons[direction]}
                </Arrow>
              ))}
            </Sequence>

            <Score>
              {isPlaying ? (
                <>
                  <div>Pontuação: {score}</div>
                  <div>Nível: {level}</div>
                  <div>Sequência atual: {sequence.length}</div>
                  <div style={{ color: '#FFD700', marginTop: '10px' }}>
                    <FaTrophy /> Recorde: {highScore}
                  </div>
                </>
              ) : (
                <>
                  <div>Fim de jogo! Pontuação final: {score}</div>
                  <div style={{ color: '#FFD700', marginTop: '10px' }}>
                    <FaTrophy /> Recorde: {highScore}
                  </div>
                </>
              )}
            </Score>

            <Button onClick={startGame} theme={theme}>
              {isPlaying ? '➕ Seguência' : 'Iniciar Jogo'}
            </Button>
          </GameArea>
        )}
      </GameContainer>
    </>
  );
};

export default Game;