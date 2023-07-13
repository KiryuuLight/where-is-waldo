import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GameContext from '../context/GameContext';

function MessageUser({ showMessage }) {
  const { displayPosition } = useContext(GameContext);

  const [showMessageUser, setShowMessageUser] = useState(false);
  const [textMessage, setTextMessage] = useState('');

  useEffect(() => {
    displayPosition({
      positionBox: { display: 'none', x: 0, y: 0 },
    });

    if (showMessage.show) {
      setShowMessageUser(true);
      setTextMessage(showMessage.message);
      setTimeout(() => {
        setShowMessageUser(false);
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMessage]);

  return (
    <MessageUserWrapper $showMessage={showMessageUser}>
      {textMessage}
    </MessageUserWrapper>
  );
}

const MessageUserWrapper = styled.div`
  display: ${(props) => (props.$showMessage ? 'block' : 'none')};
  width: 600px;
  text-align: center;
  text-transform: uppercase;
  position: absolute;
  background-color: #303a48;
  top: 100px;
  color: #fff;
  padding: 10px;
  border: 1px solid #fff;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

MessageUser.propTypes = {
  showMessage: PropTypes.shape({
    show: PropTypes.bool,
    message: PropTypes.string,
  }),
};

export default MessageUser;
