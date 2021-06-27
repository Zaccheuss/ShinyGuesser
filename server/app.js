import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pwd } from "./directoryHelper.js";
import { router } from "./routes/scoreRoutes.js";

dotenv.config({ path: pwd + "/.env" });

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})

app.use("/", router);