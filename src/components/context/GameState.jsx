import { useReducer } from 'react';
import PropTypes from 'prop-types';
import GameContext from './GameContext';
import reducer from './GameReducer';
import {
  START_GAME,
  RESTART_GAME,
  SET_CHARACTERS,
  SET_CHARACTER_POSITION,
  SET_CHARACTER_FOUND,
  SHOW_MESSAGE,
  DISPLAY_POSITION,
  SAVE_RECORD,
  SAVE_USER,
  SHOW_WINNER_MODAL,
  SHOW_START_MODAL,
  SHOW_LEADERBOARD,
} from './types';

function GameState({ children }) {
  const initialState = {
    items: {
      characters: [],
      characterPosition: {
        x: 0,
        y: 0,
      },
      showCharacters: false,
      showTimer: {
        show: false,
        timer: {
          seconds: 0,
          minutes: 0,
          hours: 0,
        },
      },
      showMessage: {
        show: false,
        message: '',
      },
      showStartModal: true,
      showWinnerModal: false,
      showLeaderboard: false,
      pointerEvents: 'none',
      opacity: 0.3,
      positionBox: {
        display: 'none',
        x: 0,
        y: 0,
      },
      user: {
        id: '',
        name: '',
      },
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const initGame = (items) => {
    dispatch({ type: START_GAME, payload: items });
  };

  const restartGame = (items) => {
    dispatch({ type: RESTART_GAME, payload: items });
  };

  const setCharacters = (characters) => {
    dispatch({ type: SET_CHARACTERS, payload: characters });
  };

  const setCharacterFound = (character) => {
    dispatch({ type: SET_CHARACTER_FOUND, payload: character });
  };

  const setCharacterPosition = (position) => {
    dispatch({ type: SET_CHARACTER_POSITION, payload: position });
  };

  const showMessage = (status) => {
    dispatch({ type: SHOW_MESSAGE, payload: status });
  };

  const displayPosition = (position) => {
    dispatch({ type: DISPLAY_POSITION, payload: position });
  };

  const saveRecord = (time) => {
    dispatch({ type: SAVE_RECORD, payload: time });
  };

  const saveUser = (user) => {
    dispatch({ type: SAVE_USER, payload: user });
  };

  const showStartModal = (boolean) => {
    dispatch({ type: SHOW_START_MODAL, payload: boolean });
  };

  const showWinnerModal = (boolean) => {
    dispatch({ type: SHOW_WINNER_MODAL, payload: boolean });
  };

  const showLeaderBoard = (boolean) => {
    dispatch({ type: SHOW_LEADERBOARD, payload: boolean });
  };

  return (
    <GameContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        items: state.items,
        initGame,
        restartGame,
        setCharacters,
        setCharacterFound,
        setCharacterPosition,
        showMessage,
        showStartModal,
        showWinnerModal,
        showLeaderBoard,
        displayPosition,
        saveRecord,
        saveUser,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

GameState.propTypes = {
  children: PropTypes.node,
};

export default GameState;
