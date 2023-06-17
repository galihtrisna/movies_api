const express = require("express");
const app = express();
const port = 8081;
const cors = require("cors");
const cinemaRoute = require("./router/cinema");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api", cinemaRoute);

app.listen(process.env.PORT || port, () => console.log(`App Listening on port http://localhost:${port} !`));
