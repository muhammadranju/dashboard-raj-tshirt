require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const server = http.createServer(app);
const PORT = process.env.PORT || 4050;
server.listen(PORT, () => {
  console.log(`Dashbord app is running on http://localhost:${PORT}`);
});
