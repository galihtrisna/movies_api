const express = require("express");
const app = express();
const port = 8081;
const cors = require("cors");
const cinemaRoute = require("./router/cinema");

app.use(
  cors({
    origin: "http://localhost:3000", // Tentukan asal yang diizinkan
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api", cinemaRoute);

app.listen(process.env.PORT || port, () => console.log(`App Listening on port http://localhost:${port} !`));
