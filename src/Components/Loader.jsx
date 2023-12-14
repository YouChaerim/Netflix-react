import styled from "styled-components";
import loadingBar from "../assets/loading.svg";

const Container = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: white;
  font-size: 18px;
  margin-top: 10px;
`;

const Loader = () => (
  <Container>
    <LoadingContainer role="img" aria-label="Loading">
      <img src={loadingBar} alt="loadingBar"></img>
      <Title>Loading...</Title>
    </LoadingContainer>
  </Container>
);

export default Loader;
