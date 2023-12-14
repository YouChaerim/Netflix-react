import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Message = ({ text }) => {
  return (
    <Container>
      <span>{text}</span>
    </Container>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
