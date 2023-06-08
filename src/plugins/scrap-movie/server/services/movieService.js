"use strict";

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
});
