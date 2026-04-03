const User = require('../models/user');
const express = require('express');
const router = express.Router();
const passport = require('../init/passport');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email });
        await User.register(user, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);

      if (!user.isActive) {
        req.logout((e) => {});
        return res.status(403).json({ error: 'Your account has been deactivated' });
      }

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });

  })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;