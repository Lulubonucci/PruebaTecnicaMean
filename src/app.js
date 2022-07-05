const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const indexRoutes = require("./routes/routes");
const connectDB = require("./db/connect");
require("dotenv").config();

const app = express();

app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use("/", indexRoutes);

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(app.get("port"), () => {
      console.log("server on port", app.get("port"));
    });
  } catch (error) {
    console.log(error);
  }
};

start();
