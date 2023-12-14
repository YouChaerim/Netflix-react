import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

class SearchContainer extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    lodaing: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { searchTerm } = this.state;

    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateSearchTerm = (event) => {
    const {
      target: { value },
    } = event;

    this.setState({ searchTerm: value });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;

    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);

      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);

      this.setState({ movieResults, tvResults, loading: true });
    } catch (error) {
      console.log(error);
      this.setState({ error: "Can't fint Results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return <SearchPresenter {...this.state} handleSubmit={this.handleSubmit} updateSearchTerm={this.updateSearchTerm} />;
  }
}

export default SearchContainer;
