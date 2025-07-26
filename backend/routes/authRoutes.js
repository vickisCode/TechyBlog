const express = require('express');
const router = express.Router();
const { userSignup, userLogin } = require('../Controllers/authControllers')

router.post('/signup', userSignup);
router.post('/login', userLogin)

router.get('/logout', (req, res) => {
    res.status(200).json({
        message: "Logout successful. Please clear token from frontend."
    })
})



module.exports = router;
