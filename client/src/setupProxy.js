const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "https://port-0-hwayang-client-server-7e6o2clhv5snco.sel4.cloudtype.app",
      changeOrigin: true,
    })
  );
};
