import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import GameContext from '../context/GameContext';

function TargetingBox() {
  const { items, showMessage, showWinnerModal, setCharacterFound } =
    useContext(GameContext);

  useEffect(() => {
    const isEvery =
      items.characters.length > 0 &&
      items.characters.every((char) => char.found);

    if (isEvery) showWinnerModal(true);
  }, [items.characters]);

  const handleCorrectAnswer = (name) => {
    const characterFind = items.characters.find(
      (character) => name === character.name
    );

    if (
      items.characterPosition.x >= characterFind.positionX[0] &&
      items.characterPosition.x <= characterFind.positionX[1] &&
      items.characterPosition.y >= characterFind.positionY[0] &&
      items.characterPosition.y <= characterFind.positionY[1]
    ) {
      setCharacterFound(characterFind);
      showMessage({
        showMessage: {
          show: true,
          message: `You found ${name}`,
        },
      });
    } else {
      showMessage({
        showMessage: {
          show: true,
          message: `${name} isn't here!`,
        },
      });
    }
  };

  const style = {
    display: items.positionBox.display,
    top: items.positionBox.y,
    left: items.positionBox.x,
  };

  return (
    <TargetingBoxWrapper style={style}>
      <GuessBox />
      <MenuBox>
        {items.characters.map((character) => {
          if (character.found === false) {
            return (
              <ButtonSelect
                key={uniqid()}
                onClick={() => handleCorrectAnswer(character.name)}
              >
                {character.name}
              </ButtonSelect>
            );
          }
          return null;
        })}
      </MenuBox>
    </TargetingBoxWrapper>
  );
}

const TargetingBoxWrapper = styled.div`
  position: absolute;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  cursor: pointer;
`;

const GuessBox = styled.div`
  width: 39px;
  height: 39px;
  border: 2px solid white;
  border-radius: 4px;
  opacity: 0.9;

  @media (max-width: 1024px) {
    opacity: 0.8;
  }
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  border: 1px solid #fff;
  cursor: pointer;
  background-color: #303a48;
`;

const ButtonSelect = styled.button`
  all: unset;
  color: #fff;
  font-size: 12px;
  text-transform: capitalize;

  &:hover {
    color: red;
  }

  @media (max-width: 1024px) {
    font-size: 8px;
  }

  &:disabled {
    color: #b58787;
  }
`;

export default TargetingBox;
