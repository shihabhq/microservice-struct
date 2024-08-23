import connectDB from "./db.js";
import express from "express";
import errorHandler from "./utils/err.js";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(router);

app.use(errorHandler);

const uri = "mongodb://127.0.0.1:27017/attendance";

connectDB(uri)
  .then(() => {
    console.log("database connected");
    app.listen(8000, () => {
      console.log("app is running behind");
    });
  })
  .catch((e) => console.log(e));
