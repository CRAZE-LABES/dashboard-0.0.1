module.exports = {
  proxy: "localhost:5000",
  files: ["public/**/*", "views/**/*", "routes/**/*"],
  ignore: ["node_modules"],
  reloadDelay: 10,
  ui: false,
  notify: false,
  port: 3001
};
