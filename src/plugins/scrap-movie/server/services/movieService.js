"use strict";

const { default: axios } = require("axios");
const { scrapeMovies } = require("../utils/scrapper");

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::scrap-movie.movie",
      query
    );
  },

  async delete(id) {
    return await strapi.entityService.delete("plugin::scrap-movie.movie", id);
  },

  async create(data) {
    console.log({ data });
    return await strapi.entityService.create("plugin::scrap-movie.movie", data);
  },

  async update(id, data) {
    return await strapi.entityService.update(
      "plugin::scrap-movie.movie",
      id,
      data
    );
  },

  async toggle(id) {
    const result = await strapi.entityService.findOne(
      "plugin::scrap-movie.movie",
      id
    );

    return await strapi.entityService.update("plugin::scrap-movie.movie", id, {
      data: { isDone: !result.isDone },
    });
  },
  async scrap() {
    return await scrapeMovies(strapi);
  },

  async searchMoviesTMDB({ title }) {
    try {
      const apiKey = "871d3df1619959711d0354348ba7e3a3";
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        title
      )}`;
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error searching movies in TMDB:", error);
      return [];
    }
  },
});
