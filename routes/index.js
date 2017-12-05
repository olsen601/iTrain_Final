var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET Login/home page */
router.get('/', function(req, res, next) {
  res.render('login');
});
/* Get signup page */
router.get('/signup', function(req, res, next) {
    res.render('signup');
});

//post to login
router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
}));

//post to signup
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

/*get profile page */
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile', {
        username: req.user.local.username,
        signupDate: req.user.signupDate,
        userData: req.user.userData
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;
