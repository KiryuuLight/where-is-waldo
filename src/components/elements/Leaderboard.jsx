import { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import uniqid from 'uniqid';
import { ButtonVariantWrapper } from './ButtonVariant';
import GameContext from '../context/GameContext';

import db from '../../firebaseConfig';

function Leaderboard() {
  const [records, setRecords] = useState([]);
  const { items, restartGame } = useContext(GameContext);

  useEffect(() => {
    const getWinners = async () => {
      const arr = [];

      const querySnapshot = await getDocs(collection(db, 'leaderboard'));
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, data: doc.data() });
      });
      setRecords(arr);
    };

    getWinners();
  }, []);

  const resetCharacters = items.characters.map((character) => ({
    ...character,
    found: false,
  }));

  const handleReset = () => {
    restartGame({
      characters: resetCharacters,
      characterPosition: {
        x: 0,
        y: 0,
      },
      showCharacters: false,
      showTimer: {
        show: false,
        timer: { hours: 0, minutes: 0, seconds: 0 },
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
      name: '',
    });
  };

  return (
    <>
      <Title>Leaderboard</Title>

      <NameScore>Name - Score</NameScore>

      {records.length > 0 ? (
        records
          .sort(
            (a, b) =>
              a.data.time.hours * 3600 +
              a.data.time.minutes * 60 +
              a.data.time.seconds -
              (b.data.time.hours * 3600 +
                b.data.time.minutes * 60 +
                b.data.time.seconds)
          )
          .map((record) => {
            if (record.id === items.user.id)
              return (
                <Current key={uniqid()}>
                  {record.data.name} -{' '}
                  {record.data.time.hours.toString().padStart(2, '0')}:
                  {record.data.time.minutes.toString().padStart(2, '0')}:
                  {record.data.time.seconds.toString().padStart(2, '0')}
                </Current>
              );

            return (
              <NameScore key={uniqid()}>
                {record.data.name} -{' '}
                {record.data.time.hours.toString().padStart(2, '0')}:
                {record.data.time.minutes.toString().padStart(2, '0')}:
                {record.data.time.seconds.toString().padStart(2, '0')}
              </NameScore>
            );
          })
      ) : (
        <NameScore>Loading...</NameScore>
      )}

      <ButtonVariantWrapper onClick={handleReset}>
        Play Again
      </ButtonVariantWrapper>
    </>
  );
}

const Title = styled.div`
  color: #fff;
  font-family: Press Start 2P;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const NameScore = styled.div`
  font-size: 20px;
  color: #fff;
  text-transform: uppercase;
`;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Current = styled(NameScore)`
  color: #ebff03;
  animation: ${blinkAnimation} 1s infinite;
`;

export default Leaderboard;
