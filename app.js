const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use(express.json({ extended: true }));
app.use("/link", require("./routes/link.route"));
app.use("/auth", require("./routes/auth.route"));

const PORT = config.get("port") || 3000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`Example app listening on port ${PORT}!`)
    );
  } catch (e) {
    console.log(`Server error, message: ${e}`);
    process.exit(1);
  }
}

start();