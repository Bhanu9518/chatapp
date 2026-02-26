// 


import express from "express";
import ChatRoute from "./src/routes/chat.routes.js";
import AuthRoute from "./src/routes/auth.routes.js";
import morgan from "morgan";
import cors from "cors";
import ErrorMiddleware from "./src/middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// ✅ Simple static folder
app.use(express.static("public")); //this is use so that all the file sin public folder(if it conatins style.css or javascript) has uploaded so all the file is use if we dont use it then our other file like css and js will not b shown in 1
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/src/public/index.html");   //cwd means 
});

app.use("/api/chat", ChatRoute);
app.use("/api/auth", AuthRoute);
app.use(ErrorMiddleware);

export default app;
