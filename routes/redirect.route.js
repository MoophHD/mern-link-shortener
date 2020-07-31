const router = require("express").Router();
const Link = require("../models/link");

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;
      await link.save();

      return res.redirect(link.from);
    }

    res.status(404).json({ message: "Link wasn't found}" });
  } catch (e) {
    res.status(500).json({ message: `Something went terribly wrong,\n ${e}` });
  }
});

module.exports = router;
