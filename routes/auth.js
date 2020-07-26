const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post(
  "/register",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Minimal length - 6 symbols")
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid data for registration"
        })
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: `User already exists` });
      }

      const hashedPaswword = await bcrypt.hash(password);
      const user = new User({ email, password: hashedPaswword });

      await user.save();

      res.status(201).json({ message: "User was registered" });
    } catch (e) {
      res
        .status(500)
        .json({ message: `Something went terribly wrong,\n ${e}` });
    }
  }
);

router.post("/login", (req, res) => {});

module.exports = router;
