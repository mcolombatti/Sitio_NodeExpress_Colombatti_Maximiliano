import express from "express";
import pageRouter from "./routers/pageRouter.js";
import testimonialsApiRouter from "./routers/testimonialsApiRouter.js";
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/api/testimonials", testimonialsApiRouter);
app.use("/home", pageRouter);

app.listen(80, function () {
  console.log("el servidor esta encendido");
});
