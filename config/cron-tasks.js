module.exports = {
  syncMovies: {
    task: async ({ strapi }) => {
      console.log("Data Sync Started");
      await strapi.plugin("scrap-movie").service("movieService").scrap();
      console.log("Data Sync Completed");
    },
    options: {
      // Every minute
      rule: "0 0 * * * *",
    },
  },
};
