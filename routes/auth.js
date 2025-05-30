const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google auth route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google callback route
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.render("hello"); // redirect to homepage or dashboard after successful login
  }
);

module.exports = router;
