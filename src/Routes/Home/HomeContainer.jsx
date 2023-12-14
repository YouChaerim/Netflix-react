import React from "react";
import HomePresenter from "./HomePresenter";
import { homeApi } from "../../api";

class HomeContainer extends React.Component {
  state = {
    nowPlaying: null,
    movieDetail: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results },
      } = await homeApi.nowPlaying();
      let movieArray = [];

      for (let i = 0; i < 1; i++) {
        movieArray.push(results.map((result) => result.id));
      }

      const movieId = movieArray[0][Math.floor(Math.random() * movieArray[0].length)];
      const { data: movieDetail } = await homeApi.movieDetail(movieId);

      if (movieDetail.videos.results.length === 0) {
        const { data: movieDetail } = await homeApi.movieDetail(497698);
        this.setState({ movieDetail });
        return;
      }

      this.setState({ movieDetail });
    } catch (error) {
      console.log(error);
      this.setState({ error: "Can't find Home Video." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return <HomePresenter {...this.state} />;
  }
}

export default HomeContainer;
