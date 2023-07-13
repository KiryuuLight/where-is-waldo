import styled from 'styled-components';
import PropTypes from 'prop-types';

function CharacterImage({ src, found }) {
  return <ImageWrapper $found={found} src={src} alt="header" />;
}

const ImageWrapper = styled.img`
  width: 60px;
  border-radius: 40px;
  filter: grayscale(${(props) => (props.$found ? '1' : '0')});

  @media (max-width: 700px) {
    width: 40px;
  }
`;

CharacterImage.propTypes = {
  found: PropTypes.bool,
  src: PropTypes.string,
};

export default CharacterImage;
