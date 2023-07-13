import { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import GameContext from '../context/GameContext';

function Timer({ showTimer, winner }) {
  const { saveRecord } = useContext(GameContext);
  const [crono, setCrono] = useState({ seconds: 0, minutes: 0, hours: 0 });

  function setTimer() {
    setCrono((previousValue) => {
      let newSeconds = previousValue.seconds + 1;
      let newMinutes = previousValue.minutes;
      let newHours = previousValue.hours;

      if (newSeconds >= 60) {
        newSeconds = 0;
        newMinutes += 1;
      }

      if (newMinutes >= 60) {
        newMinutes = 0;
        newHours += 1;
      }

      if (newHours >= 24) {
        newHours = 0;
      }

      return {
        seconds: newSeconds,
        minutes: newMinutes,
        hours: newHours,
      };
    });
  }

  useEffect(() => {
    if (winner) {
      saveRecord(crono);
      setCrono({ seconds: 0, minutes: 0, hours: 0 });
      return () => {};
    }

    let intervalId;

    if (showTimer.show) {
      intervalId = setInterval(() => {
        setTimer();
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTimer.show, winner]);

  return (
    <TimerWrapper $showTimer={showTimer.show}>{`${crono.hours
      .toString()
      .padStart(2, '0')}:${crono.minutes
      .toString()
      .padStart(2, '0')}:${crono.seconds
      .toString()
      .padStart(2, '0')}`}</TimerWrapper>
  );
}

const TimerWrapper = styled.p`
  display: ${(props) => (props.$showTimer ? 'block' : 'none')};
  margin: 0;
  color: #c1b4b4;
`;

Timer.propTypes = {
  showTimer: PropTypes.shape({
    show: PropTypes.bool,
    timer: PropTypes.shape({
      seconds: PropTypes.number,
      minutes: PropTypes.number,
      hours: PropTypes.number,
    }),
  }),
  winner: PropTypes.bool,
};

export default Timer;
