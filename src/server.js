require("dotenv").config();
const app = require("./app.js");
const http = require("http");

const PORT = process.env.PORT;

console.log(PORT);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
