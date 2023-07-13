import { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GameContext from '../context/GameContext';

function Button({ content, turnOff }) {
  const { initGame } = useContext(GameContext);

  const data = {
    items: {
      showCharacters: true,
      pointerEvents: 'auto',
      opacity: 1,
      showTimer: {
        show: true,
        timer: {
          seconds: 0,
          minutes: 0,
          hours: 0,
        },
      },
    },
  };

  const handleInitGame = () => {
    turnOff();
    initGame(data);
  };

  return <ButtonWrapper onClick={handleInitGame}>{content}</ButtonWrapper>;
}

Button.propTypes = {
  content: PropTypes.string,
  turnOff: PropTypes.func,
};

export const ButtonWrapper = styled.button`
  all: unset;
  color: #fff;
  padding: 10px;
  background-color: #267e92;
  text-transform: uppercase;
  font-family: inherit;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #1d9ab6;
  }
`;

export default Button;
