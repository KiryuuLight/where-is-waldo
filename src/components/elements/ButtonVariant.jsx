import { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { collection, addDoc } from 'firebase/firestore';
import { ButtonWrapper } from './Button';
import GameContext from '../context/GameContext';
import db from '../../firebaseConfig';

function ButtonVariant({ content, data }) {
  const { items, saveUser, showWinnerModal, showLeaderBoard } =
    useContext(GameContext);

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'leaderboard'), {
        name: data,
        time: items.showTimer.timer,
      });
      saveUser({ id: docRef.id, name: data });
      showWinnerModal(false);
      showLeaderBoard(true);
    } catch (e) {
      throw Error('Error adding document: ', e);
    }
  };

  return (
    <ButtonVariantWrapper onClick={handleSubmit}>
      {content}
    </ButtonVariantWrapper>
  );
}

export const ButtonVariantWrapper = styled(ButtonWrapper)`
  background-color: #d42d2d;

  &:hover {
    background-color: #cb0f0f;
  }
`;

ButtonVariant.propTypes = {
  content: PropTypes.string,
  data: PropTypes.string,
};

export default ButtonVariant;
