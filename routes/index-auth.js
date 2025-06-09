const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google auth route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));


router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      console.error('OAuth error:', err);
      return res.redirect('/login');
    }
    if (!user) {
      console.log('User not found after Google auth.');
      return res.redirect('/login');
    }

    // Login the user
    req.logIn(user, (err) => {
      if (err) {
        console.error('Session login error:', err);
        return res.redirect('/login');
      }

      // 🔥 Force session save before redirect
      req.session.save(() => {
        const redirectUrl = `/expense/${encodeURIComponent(user.username)}`;
        res.redirect(redirectUrl);
      });
    });
  })(req, res, next);
});





module.exports = router;
