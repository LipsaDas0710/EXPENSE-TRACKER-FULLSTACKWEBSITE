const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google auth route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google callback route
// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//      console.log('Authenticated user:', req.user);
//     const username = req.user.name.givenName; 
//     res.redirect(`/expense/${username}`) // redirect to homepage or dashboard after successful login
//   }
// );

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     console.log('req.user:', req.user); // Should print full user doc

//     if (!req.user || !req.user.username) return res.redirect('/login');

//     const redirectUrl = `/expense/${encodeURIComponent(req.user.username)}`;
//     console.log('Redirecting to:', redirectUrl);
//     res.redirect(redirectUrl);
//   }
// );


// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     try {
//       console.log('req.user:', req.user);
//       if (!req.user || !req.user.username) return res.redirect('/login');

//       const redirectUrl = `/expense/${encodeURIComponent(req.user.username)}`;
//       console.log('Redirecting to:', redirectUrl);
//       res.redirect(redirectUrl);
//     } catch (e) {
//       console.error('Error in redirect handler:', e);
//       res.redirect('/login');
//     }
//   }
// );

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
        console.log('✅ Redirecting to:', redirectUrl);
        res.redirect(redirectUrl);
      });
    });
  })(req, res, next);
});





module.exports = router;
