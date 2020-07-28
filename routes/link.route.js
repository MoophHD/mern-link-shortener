const router = require("express").Router();
const Link = require("../models/link");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortId = require("shortid");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.status(200).json({ link: existsing });
    }

    const code = shortId.generate();
    const to = baseUrl + "/t/" + code;
    const link = new Link({
      from,
      to,
      code,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link }); 
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong,\n ${e}` });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong,\n ${e}` });
  }
});

router.get(":id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong,\n ${e}` });
  }
});

module.exports = router;
