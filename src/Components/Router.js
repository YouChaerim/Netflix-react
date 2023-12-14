import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import Movie from "../Routes/Movie";
import TV from "../Routes/TV";
import Search from "../Routes/Search";
import Detail from "../Routes/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/movie/popular" element={<Movie />}></Route>
        <Route path="/movie/now-playing" element={<Movie />}></Route>
        <Route path="/movie/upcoming" element={<Movie />}></Route>
        <Route path="/movie/top-rated" element={<Movie />}></Route>
        <Route path="/tv" element={<TV />}></Route>
        <Route path="/tv/airing-today" element={<TV />}></Route>
        <Route path="/tv/on-the-air"element={<TV />}></Route>
        <Route path="/tv/top-rated" element={<TV />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/movie/:id" element={<Detail />}></Route>
        <Route path="/tv/:id" element={<Detail />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
