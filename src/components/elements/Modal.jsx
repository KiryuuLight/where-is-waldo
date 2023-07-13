import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

function Modal({ children }) {
  return <ModalWrapper>{children}</ModalWrapper>;
}

const appear = keyframes`
  0% {opacity : 0.2};
  50% {opacity : 0.5};
  70% {opacity : 0.7};
  100% {opacity : 1};
`;

const ModalWrapper = styled.div`
  display: flex;
  max-width: 600px;
  padding: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border: 5px solid #fff;
  background: #303a48;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  p,
  h3 {
    margin: 0;
  }

  animation: ${appear} 1s ease-in-out;
`;

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
