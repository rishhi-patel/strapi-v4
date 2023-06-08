import { request } from "@strapi/helper-plugin";

const movieRequest = {
  getMovies: async () => {
    return await request("/scrap-movie/movie", { method: "GET" });
  },
  scrapMovies: async () => {
    return await request("/scrap-movie/movie/sync", { method: "GET" });
  },
};

export default movieRequest;
