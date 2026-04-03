const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ExpressError = require('../util/ExpressError');
const wrapAsync = require('../util/wrapAsync');
const { isAuthenticated, authorizeRoles } = require('../middleware/authenticated.js');

router.patch("/:id/role", isAuthenticated, authorizeRoles("admin"), wrapAsync(async (req, res) => {
  const { role } = req.body;

  const valid = ["admin", "analyst", "viewer"];
  if (!valid.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findById(req.params.id);
  user.role = role;
  await user.save();

  res.json(user);
}));

module.exports = router;