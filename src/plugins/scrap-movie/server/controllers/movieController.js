"use strict";

module.exports = {
  async find(ctx) {
    try {
      return await strapi
        .plugin("scrap-movie")
        .service("movieService")
        .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    console.log({ ctx });
    try {
      ctx.body = await strapi
        .plugin("scrap-movie")
        .service("movieService")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      ctx.body = await strapi
        .plugin("scrap-movie")
        .service("movieService")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};