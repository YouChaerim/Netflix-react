import React from "react";
import TYPresenter from "./TVPresenter";
import { tvApi } from "../../api";

class TVContainer extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    onTheAir: null,
    error: null,
    loading: true,
    popularInfinite: null,
    airingTodayInfinite: null,
    onTheAirInfinite: null,
    topRatedInfinite: null,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();

      const {
        data: { results: popular },
      } = await tvApi.popular();

      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      const {
        data: { results: onTheAir },
      } = await tvApi.onTheAir();

      const {
        data: { results: popularInfinite },
      } = await tvApi.popularInfinite();

      const {
        data: { results: airingTodayInfinite },
      } = await tvApi.airingTodayInfinite();

      const {
        data: { results: onTheAirInfinite },
      } = await tvApi.onTheAirInfinite();

      const {
        data: { results: topRatedInfinite },
      } = await tvApi.topRatedInfinite();

      this.setState({ topRated, popular, airingToday, onTheAir, popularInfinite, airingTodayInfinite, onTheAirInfinite, topRatedInfinite });
    } catch {
      this.setState({ error: "Can't find TV Information." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return <TYPresenter {...this.state} />;
  }
}

export default TVContainer;
