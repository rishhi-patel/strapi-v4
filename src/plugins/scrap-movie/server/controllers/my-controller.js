'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('scrap-movie')
      .service('myService')
      .getWelcomeMessage();
  },
});
