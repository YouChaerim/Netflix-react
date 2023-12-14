import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import QnA from "../../Components/QnA";
import Footer from "../../Components/Footer";
import Description from "../../Components/Description";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  color: white;
  position: absolute;
  top: 39%;
  left: 40px;
  transform: translateY(-50%);
  width: 550px;
  font-family: "Do Hyeon", sans-serif;
  animation: homeAni 0.7s ease-in;

  @keyframes homeAni {
    from {
      opacity: 0;
      transform: translateY(-40%);
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    padding: 0 15px;
    top: 83%;
  }
`;

const Title = styled.h1`
  font-size: 53px;
  text-shadow: rgba(255, 255, 255, 0.6) 0px 5px 10px;
  font-family: "Do Hyeon", sans-serif;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const SubTitle = styled.h2`
  font-size: 28px;
  margin-top: 25px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-top: 15px;
  }
`;

const Genres = styled.div`
  font-size: 20px;
  color: rgb(108, 117, 125);
  margin-top: 18px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const YearRuntimeContainer = styled.div`
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Year = styled.span`
  font-size: 20px;
  color: rgb(108, 117, 125);

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Runtime = styled.span`
  font-size: 20px;
  color: rgb(108, 117, 125);

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const YearRuntimeSpan = styled.span`
  margin: 0 5px;
  color: rgb(108, 117, 125);
`;

const Rating = styled.div`
  font-size: 20px;
  color: white;
  margin-top: 12px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const RatingChild = styled.span`
  font-size: 22px;
  color: dodgerblue;
  margin-left: 7px;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const Overview = styled.div`
  font-size: 21px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.2;
  }
`;

const HomeSubContainer = styled.div`
  width: 100%;
`;

const HomePresenter = ({ movieDetail, error, loading }) => {
  const checkPC = "win16|win32|win64|macintel|mac|";
  const checkPCMobileBool = checkPC.indexOf(navigator.platform.toLowerCase()) < 0;

  return loading ? (
    <Loader></Loader>
  ) : (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>넷플릭스 - 홈</title>
        </Helmet>
      </HelmetProvider>

      {movieDetail && (
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movieDetail.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movieDetail.videos.results[0].key}`}
            width="640"
            height="360"
            frameborder="0"
            allow="autoplay; fullscreen"
          ></Iframe>
          <Content>
            <Title>{movieDetail.title}</Title>
            <SubTitle>{movieDetail.tagline}</SubTitle>
            <Genres>{movieDetail.genres.map((genre, index) => (movieDetail.genres.length - 1 === index ? genre.name : `${genre.name} • `))}</Genres>
            <YearRuntimeContainer>
              <Year>{movieDetail.release_date.substring(0, 4)}</Year>
              <YearRuntimeSpan>•</YearRuntimeSpan>
              <Runtime>{movieDetail.runtime}분</Runtime>
            </YearRuntimeContainer>
            <Rating>
              평점
              <RatingChild>{movieDetail.vote_average}</RatingChild>
            </Rating>
            {checkPCMobileBool ? <Overview>{movieDetail.overview.substring(0, 310)}..</Overview> : <Overview>{movieDetail.overview.substring(0, 150)}..</Overview>}
          </Content>
          <HomeSubContainer>
            <Description></Description>
            <QnA></QnA>
            <Footer></Footer>
          </HomeSubContainer>
        </HomeContainer>
      )}
      {error && <Message text={error}></Message>}
    </Container>
  );
};

HomePresenter.propTypes = {
  movieDetail: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;
