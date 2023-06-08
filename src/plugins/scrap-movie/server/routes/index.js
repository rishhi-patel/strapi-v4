module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "GET",
    path: "/movie",
    handler: "movieController.find",
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/movie",
    handler: "movieController.create",
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "PUT",
    path: "/movie/:id",
    handler: "movieController.update",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/movie/sync",
    handler: "movieController.sync",
    config: {
      policies: [],
      auth: false,
    },
  },
];
