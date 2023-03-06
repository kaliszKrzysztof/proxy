const express = require('express');
const morgan = require("morgan");
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
const PORT = 3001;
const HOST = "localhost";
const PRIVATE_API_URL = "https://g3czeu5yof.execute-api.us-west-1.amazonaws.com/prod/";
const PUBLIC_API_URL = 'https://o6w9tgek4l.execute-api.us-west-1.amazonaws.com/prod/';

app.use(morgan('dev'));


app.use(
  "/api",
  createProxyMiddleware({
    target: PRIVATE_API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/api`]: "",
    },
  })
);

app.use(
  "/api-public",
  createProxyMiddleware({
    target: PUBLIC_API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/api-public`]: "",
    },
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
