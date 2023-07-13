import { useState } from 'react';
import styled from 'styled-components';
import ButtonVariant from './ButtonVariant';

function InputScreen() {
  const [playerName, setPlayerName] = useState('');

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <>
      <Title>You Won</Title>
      <HeroText>Enter Username</HeroText>
      <InputUser value={playerName} onChange={handleChange} />
      <ButtonVariant content="Ok" data={playerName} />
    </>
  );
}

const Title = styled.div`
  color: #fff;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const HeroText = styled(Title)`
  font-size: 20px;
`;

const InputUser = styled.input`
  all: unset;
  background-color: #d9d9d9;
  color: #646262;
  font-size: 15px;
  padding: 10px;
`;

export default InputScreen;
