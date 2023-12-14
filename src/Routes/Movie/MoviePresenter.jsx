import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";
import styled from "styled-components";
import uniqBy from "lodash.uniqby";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import useInfiniteScroll from "../../useInfiniteScroll";
import { moviesApi } from "../../api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 65px;
`;

const TitleContainer = styled.div`
  margin-top: 90px;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const TitleContent = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: white;
  margin-bottom: 25px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: gray;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ButtonContent = styled.div`
  display: flex;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const ButtonLink = styled(Link)`
  color: white;
  border-bottom: 3px solid ${(props) => (props.current ? "#E30914" : "transparent")};
  color: ${(props) => (props.current ? "#E30914" : "white")};
  margin: 0 15px;
  padding: 10px 10px;
  box-sizing: border-box;
  font-size: 17px;
  font-weight: bold;

  @media (max-width: 768px) {
    margin: 0 5px;
    font-size: 13px;
    font-weight: normal;
  }
`;

const GototopButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 60px;
  z-index: 200;
  width: 50px;
  height: 50px;
  background: linear-gradient(to right, #536976, #292e49);
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  border: none;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 3px 2px;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
`;

const MoviePresenter = ({ nowPlaying, upcoming, popular, topRated, error, loading, nowPlayingInfinite, popularInfinite, upcomingInfinite, topRatedInfinite }) => {
  const location = useLocation();
  const {pathname} = location;

  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const page = useInfiniteScroll();

  const getInfiniteApi = async () => {
    if (page !== 1) {
      if (pathname === "/movie") {
        try {
          const {
            data: { results: newPopularMovies },
          } = await moviesApi.popularInfinite(page);
          const totalMovies = [...popularMovies, ...newPopularMovies];
          const uniqByMovies = uniqBy(totalMovies, "id");

          setPopularMovies(uniqByMovies);
        } catch (error) {
          console.log(error);
        }
      } else if (pathname === "/movie/now-playing") {
        try {
          const {
            data: { results: newNowPlayingMovies },
          } = await moviesApi.nowPlayingInfinite(page);
          const totalMovies = [...nowPlayingMovies, ...newNowPlayingMovies];
          const uniqByMovies = uniqBy(totalMovies, "id");

          setNowPlayingMovies(uniqByMovies);
        } catch (error) {
          console.log(error);
        }
      } else if (pathname === "/movie/upcoming") {
        try {
          const {
            data: { results: newUpcomingMovies },
          } = await moviesApi.upcomingInfinite(page);
          const totalMovies = [...upcomingMovies, ...newUpcomingMovies];
          const uniqByMovies = uniqBy(totalMovies, "id");

          setUpcomingMovies(uniqByMovies);
        } catch (error) {
          console.log(error);
        }
      } else if (pathname === "/movie/top-rated") {
        try {
          const {
            data: { results: newTopRatedMovies },
          } = await moviesApi.topRatedInfinite(page);
          const totalMovies = [...topRatedMovies, ...newTopRatedMovies];
          const uniqByMovies = uniqBy(totalMovies, "id");

          setTopRatedMovies(uniqByMovies);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    getInfiniteApi();
  }, [page]);

  return loading ? (
    <Loader></Loader>
  ) : (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>넷플릭스 - 영화</title>
        </Helmet>
      </HelmetProvider>

      {popular && popular.length > 0 && pathname === "/movie" && (
        <TitleContainer>
          <TitleContent>
            <Title>인기 영화</Title>
            <SubTitle>
              현재 인기 있는 영화 목록을 가져옵니다.
              <br />
              영화 목록은 매일 자동 업데이트됩니다.
            </SubTitle>
          </TitleContent>
        </TitleContainer>
      )}

      {nowPlaying && nowPlaying.length > 0 && pathname === "/movie/now-playing" && (
        <TitleContainer>
          <TitleContent>
            <Title>현재 상영중인 영화</Title>
            <SubTitle>
              현재 상영중인 영화 목록을 가져옵니다.
              <br />
              지정된 날짜 내에서 상영중인 모든 영화를 찾습니다.
            </SubTitle>
          </TitleContent>
        </TitleContainer>
      )}

      {upcoming && upcoming.length > 0 && pathname === "/movie/upcoming" && (
        <TitleContainer>
          <TitleContent>
            <Title>상영 예정인 영화</Title>
            <SubTitle>
              상영 예정인 영화 목록을 가져옵니다.
              <br />
              지정된 날짜 내에서 앞으로 상영 예정인 영화를 찾습니다.
            </SubTitle>
          </TitleContent>
        </TitleContainer>
      )}

      {topRated && topRated.length > 0 && pathname === "/movie/top-rated" && (
        <TitleContainer>
          <TitleContent>
            <Title>평점높은 영화</Title>
            <SubTitle>
              모든 영화 중에서 평점이 높은 영화 목록을 가져옵니다.
              <br />
              평점이 높은 영화를 기준으로 정렬합니다.
            </SubTitle>
          </TitleContent>
        </TitleContainer>
      )}

      <ButtonContainer>
        <ButtonContent>
          <ButtonLink to="/movie" current={pathname === "/movie" && true}>
            인기 영화
          </ButtonLink>
          <ButtonLink to="/movie/now-playing" current={pathname === "/movie/now-playing" && true}>
            현재 상영중
          </ButtonLink>
          <ButtonLink to="/movie/upcoming" current={pathname === "/movie/upcoming" && true}>
            상영 예정
          </ButtonLink>
          <ButtonLink to="/movie/top-rated" current={pathname === "/movie/top-rated" && true}>
            평점높은 영화
          </ButtonLink>
        </ButtonContent>
      </ButtonContainer>

      {popular && popular.length > 0 && pathname === "/movie" && (
        <Section title="인기 영화">
          {popular.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {popularInfinite && popularInfinite.length > 0 && pathname === "/movie" && (
        <Section title="인기 영화">
          {popularMovies.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {nowPlaying && nowPlaying.length > 0 && pathname === "/movie/now-playing" && (
        <Section title="현재 상영중">
          {nowPlaying.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {nowPlayingInfinite && nowPlayingInfinite.length > 0 && pathname === "/movie/now-playing" && (
        <Section title="현재 상영중">
          {nowPlayingMovies.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {upcoming && upcoming.length > 0 && pathname === "/movie/upcoming" && (
        <Section title="상영 예정">
          {upcoming.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {upcomingInfinite && upcomingInfinite.length > 0 && pathname === "/movie/upcoming" && (
        <Section title="상영 예정">
          {upcomingMovies.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {topRated && topRated.length > 0 && pathname === "/movie/top-rated" && (
        <Section title="평점높은 영화">
          {topRated.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {topRatedInfinite && topRatedInfinite.length > 0 && pathname === "/movie/top-rated" && (
        <Section title="평점높은 영화">
          {topRatedMovies.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      <GototopButton onClick={() => window.scrollTo(0, 0)}>
        <i className="fas fa-arrow-up" style={{ color: "white", fontSize: "25px" }}></i>
      </GototopButton>

      {error && <Message text={error}></Message>}
    </Container>
  );
};

MoviePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  topRated: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  popularInfinite: PropTypes.array,
  nowPlayingInfinite: PropTypes.array,
  upcomingInfinite: PropTypes.array,
  topRatedInfinite: PropTypes.array,
};

export default MoviePresenter;
