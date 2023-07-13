import { useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import GameContext from './context/GameContext';
import bgImage from '../assets/images/bg.png';
import cursorNormalSvg from '../assets/cursor-normal.svg';

import Modal from './elements/Modal';
import StartScreen from './elements/StartScreen';
import TargetingBox from './elements/TargetingBox';
import InputScreen from './elements/InputScreen';
import Leaderboard from './elements/Leaderboard';

import db from '../firebaseConfig';

const getData = async () => {
  const dataArr = [];
  const collectionRef = collection(db, 'characters');

  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((document) => {
    const docData = document.data();
    dataArr.push(docData);
  });

  return dataArr;
};

function Main() {
  const {
    items,
    showStartModal,
    setCharacters,
    setCharacterPosition,
    displayPosition,
  } = useContext(GameContext);
  const imgRef = useRef(null);

  const handleVisibility = () => showStartModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characters = await getData();
        setCharacters(characters);
      } catch (error) {
        throw error('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handlePosition = (e) => {
    const { pageX, pageY } = e;
    // console.log('PAGEX', pageX, 'PAGEY', pageY);

    // console.log(`Percentage X, ${(pageX / imgRef.current.offsetWidth) * 100}%`);
    // console.log(
    //   `Percentage Y, ${(pageY / imgRef.current.offsetHeight) * 100}%`
    // );

    const relativePerX = Math.round((pageX / imgRef.current.offsetWidth) * 100);
    const relativePerY = Math.round(
      (pageY / imgRef.current.offsetHeight) * 100
    );

    // console.log('Relative X%', relativePerX);
    // console.log('Relative Y%', relativePerY);

    displayPosition({
      positionBox: { display: 'flex', x: pageX - 4, y: pageY - 4 },
    });
    setCharacterPosition({
      characterPosition: { x: relativePerX, y: relativePerY },
    });
  };

  return (
    <MainWrapper>
      <Image
        src={bgImage}
        onClick={handlePosition}
        ref={imgRef}
        $pointerEvents={items.pointerEvents}
        $opacity={items.opacity}
      />

      {items.showStartModal && (
        <Modal>
          <StartScreen handler={handleVisibility} />
        </Modal>
      )}

      {items.showWinnerModal && (
        <Modal>
          <InputScreen />
        </Modal>
      )}

      {items.showLeaderboard && (
        <Modal>
          <Leaderboard />
        </Modal>
      )}
      <TargetingBox />
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
  min-height: 100%;
  cursor: url(${cursorNormalSvg}), auto;
  pointer-events: ${(props) => props.$pointerEvents};
  opacity: ${(props) => props.$opacity};
`;

export default Main;
