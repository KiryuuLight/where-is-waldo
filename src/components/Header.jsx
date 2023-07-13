import { useContext } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import GameContext from './context/GameContext';
import MessageUser from './elements/MessageUser';
import Timer from './elements/Timer';
import CharacterImage from './elements/CharacterImage';

function Header() {
  const { items } = useContext(GameContext);

  return (
    <HeaderWrapper>
      <Nav>
        <Logo>Find Me</Logo>
        <CharactersToFind $showCharacters={items.showCharacters}>
          {items.characters.map((character) => (
            <CharacterImage
              key={uniqid()}
              src={character.src}
              found={character.found}
            />
          ))}
        </CharactersToFind>
        <Timer
          showTimer={items.showTimer}
          winner={items.characters.every((character) => character.found)}
        />
      </Nav>

      <MessageUser showMessage={items.showMessage} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100vw;
  z-index: 1;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #303a48;
  padding: 10px 0;

  h1,
  p {
    padding: 19px;
  }
`;

const Logo = styled.h1`
  margin: 0;
  color: #d15976;
  font-size: 19px;
  text-transform: uppercase;
`;

const CharactersToFind = styled.div`
  display: ${(props) => (props.$showCharacters ? 'flex' : 'none')};
  gap: 0 15px;
`;

export default Header;
