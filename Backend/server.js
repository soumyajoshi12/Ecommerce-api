const app = require("./app");
const dotenv = require("dotenv");
const { databaseconnection } = require("./models/database");

// config
dotenv.config({ path: "Backend/.env" });

// connecting to database
databaseconnection();



app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
