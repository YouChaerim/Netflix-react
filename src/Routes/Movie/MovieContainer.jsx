import React from "react";
import MoviePresenter from "./MoviePresenter";
import { moviesApi } from "../../api";

class MovieContainer extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    topRated: null,
    error: null,
    loading: true,
    popularInfinite: null,
    nowPlayingInfinite: null,
    upcomingInfinite: null,
    topRatedInfinite: null,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();

      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();

      const {
        data: { results: popular },
      } = await moviesApi.popular();

      const {
        data: { results: topRated },
      } = await moviesApi.topRated();

      const {
        data: { results: popularInfinite },
      } = await moviesApi.popularInfinite();

      const {
        data: { results: nowPlayingInfinite },
      } = await moviesApi.nowPlayingInfinite();

      const {
        data: { results: upcomingInfinite },
      } = await moviesApi.upcomingInfinite();

      const {
        data: { results: topRatedInfinite },
      } = await moviesApi.topRatedInfinite();

      this.setState({ nowPlaying, upcoming, popular, topRated, popularInfinite, nowPlayingInfinite, upcomingInfinite, topRatedInfinite });
    } catch (error) {
      console.log(error);
      this.setState({ error: "Can't find Movie Information." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return <MoviePresenter {...this.state} />;
  }
}

export default MovieContainer;
