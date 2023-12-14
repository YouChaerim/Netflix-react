import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "d20d691c4dcca268fa8e0c655d698616",
    language: "ko-KR",
  },
});

export const homeApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  movieDetail: (id) => api.get(`movie/${id}`, { params: { append_to_response: "videos" } }),
};

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  topRated: () => api.get("movie/top_rated"),
  movieDetail: (id) => api.get(`movie/${id}`, { params: { append_to_response: "videos" } }),
  similarMovies: (id) => api.get(`/movie/${id}/similar`),
  recommendations: (id) => api.get(`/movie/${id}/recommendations`),
  credits: (id) => api.get(`/movie/${id}/credits`),
  keywords: (id) => api.get(`/movie/${id}/keywords`),
  reviews: (id) => api.get(`/movie/${id}/reviews`, { params: { language: "en-US" } }),
  images: (id) => api.get(`/movie/${id}/images`, { params: { include_image_language: "kr,null" } }),
  search: (term) => api.get("search/movie", { params: { query: term } }),
  popularInfinite: (page) => api.get(`movie/popular`, { params: { page: page } }),
  nowPlayingInfinite: (page) => api.get(`movie/now_playing`, { params: { page: page } }),
  upcomingInfinite: (page) => api.get(`movie/upcoming`, { params: { page: page } }),
  topRatedInfinite: (page) => api.get(`movie/top_rated`, { params: { page: page } }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  onTheAir: () => api.get("tv/on_the_air"),
  tvDetail: (id) => api.get(`tv/${id}`, { params: { append_to_response: "videos" } }),
  tvDetail2: (id) => api.get(`tv/${id}`, { params: { language: "en-US", append_to_response: "videos" } }),
  similarMovies: (id) => api.get(`/tv/${id}/similar`),
  recommendations: (id) => api.get(`/tv/${id}/recommendations`),
  credits: (id) => api.get(`/tv/${id}/credits`),
  keywords: (id) => api.get(`/tv/${id}/keywords`),
  reviews: (id) => api.get(`/tv/${id}/reviews`, { params: { language: "en-US" } }),
  images: (id) => api.get(`/tv/${id}/images`, { params: { include_image_language: "kr,null" } }),
  search: (term) => api.get("search/tv", { params: { query: term } }),
  popularInfinite: (page) => api.get(`tv/popular`, { params: { page: page } }),
  airingTodayInfinite: (page) => api.get(`tv/airing_today`, { params: { page: page } }),
  onTheAirInfinite: (page) => api.get(`tv/on_the_air`, { params: { page: page } }),
  topRatedInfinite: (page) => api.get(`tv/top_rated`, { params: { page: page } }),
};

export default api;
