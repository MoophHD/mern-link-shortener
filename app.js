const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require('path');

const app = express();
app.use(express.json({ extended: true }));
app.use("/link", require("./routes/link.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/t", require("./routes/redirect.route"));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = config.get("port") || 3000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`App listening on port ${PORT}!`)
    );
  } catch (e) {
    console.log(`Server error, message: ${e}`);
    process.exit(1);
  }
}

start();