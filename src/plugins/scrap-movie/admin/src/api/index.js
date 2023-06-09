import { request } from "@strapi/helper-plugin";

const movieRequest = {
  getMovies: async () => {
    return await request("/scrap-movie/movie", { method: "GET" });
  },
  scrapMovies: async () => {
    return await request("/scrap-movie/movie/sync", { method: "GET" });
  },
  searchOnTmdb: async (title) => {
    return await request(`/scrap-movie/tmdb?title=${title}`, { method: "GET" });
  },
  updateMovie: async (id, tmdbMovieId) => {
    return await request(`/scrap-movie/movie/${id}`, {
      method: "PUT",
      body: { data: { tmdbMovieId } },
    });
  },
};

export default movieRequest;
