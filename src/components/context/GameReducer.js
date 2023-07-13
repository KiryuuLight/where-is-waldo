import {
  START_GAME,
  SET_CHARACTERS,
  SET_CHARACTER_POSITION,
  SET_CHARACTER_FOUND,
  RESTART_GAME,
  SHOW_START_MODAL,
  SHOW_MESSAGE,
  SHOW_WINNER_MODAL,
  SHOW_LEADERBOARD,
  DISPLAY_POSITION,
  SAVE_RECORD,
  SAVE_USER,
} from './types';

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case START_GAME:
      return {
        ...state,
        items: {
          ...state.items,
          ...payload.items,
        },
      };

    case SET_CHARACTERS:
      return {
        ...state,
        items: {
          ...state.items,
          characters: [...payload],
        },
      };

    case SET_CHARACTER_POSITION:
      return {
        ...state,
        items: {
          ...state.items,
          characterPosition: payload.characterPosition,
        },
      };

    case SET_CHARACTER_FOUND: {
      const newCharacterValues = state.items.characters.map((character) => {
        if (character.name === payload.name)
          return { ...character, found: true };
        return character;
      });

      return {
        ...state,
        items: {
          ...state.items,
          characters: newCharacterValues,
        },
      };
    }

    case SHOW_MESSAGE:
      return {
        ...state,
        items: {
          ...state.items,
          showMessage: payload.showMessage,
        },
      };

    case SHOW_START_MODAL:
      return {
        ...state,
        items: {
          ...state.items,
          showStartModal: payload,
        },
      };

    case SHOW_WINNER_MODAL:
      return {
        ...state,
        items: {
          ...state.items,
          showWinnerModal: payload,
        },
      };

    case DISPLAY_POSITION:
      return {
        ...state,
        items: {
          ...state.items,
          positionBox: payload.positionBox,
        },
      };

    case SAVE_RECORD:
      return {
        ...state,
        items: {
          ...state.items,
          showTimer: { ...state.items.showTimer, timer: payload },
        },
      };

    case SAVE_USER:
      return {
        ...state,
        items: {
          ...state.items,
          user: payload,
        },
      };

    case SHOW_LEADERBOARD:
      return {
        ...state,
        items: {
          ...state.items,
          showLeaderboard: payload,
        },
      };

    case RESTART_GAME:
      return {
        ...state,
        items: { ...state.items, ...payload },
      };

    default:
      throw Error('Unknown action');
  }
}

export default reducer;
