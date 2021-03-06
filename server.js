const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database successfully connected"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("listening to request on port " + PORT);
});
