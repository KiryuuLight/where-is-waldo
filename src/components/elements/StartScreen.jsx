import styled from 'styled-components';
import PropTypes from 'prop-types';
import r1 from '../../assets/images/r1.png';
import r2 from '../../assets/images/r2.png';
import r3 from '../../assets/images/r3.png';
import Button from './Button';

function StartScreen({ handler }) {
  return (
    <>
      <Title>Rules</Title>
      <Description>
        Locate the following three characters on the screen as quickly as you
        can. Once the game commences, scroll downwards and remain alert. The
        swifter you find them, the higher your score will be. When the game
        concludes, you&apos;ll be able to view the results of other players.
      </Description>
      <SearchCharacters>
        <img src={r1} alt="" srcSet="" />
        <img src={r2} alt="" srcSet="" />
        <img src={r3} alt="" srcSet="" />
      </SearchCharacters>
      <Button content="Start" turnOff={handler} />
    </>
  );
}

const Title = styled.h3`
  color: white;
  font-size: 50px;
  text-transform: uppercase;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 35px;
  }

  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

const Description = styled.p`
  color: #7cdca2;
  font-size: 14px;
  line-height: 30px;

  @media (max-width: 900px) {
    font-size: 12px;
  }

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const SearchCharacters = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;

  @media (max-width: 900px) {
    img {
      width: 50px;
    }
  }

  @media (max-width: 600px) {
    img {
      width: 40px;
    }
  }
`;

StartScreen.propTypes = {
  handler: PropTypes.func,
};

export default StartScreen;
