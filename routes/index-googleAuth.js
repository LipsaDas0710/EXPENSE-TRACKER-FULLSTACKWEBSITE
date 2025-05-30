const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirect to Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

//Google redirects here after authentication
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful login
    res.redirect(`/expense/${req.user.username}`);
  });

module.exports = router;
