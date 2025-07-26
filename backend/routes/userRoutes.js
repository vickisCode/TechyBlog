const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// GET profile
router.get('/profile/:Id', userController.userProfile);

// PUT – Full Update
router.put('/profile/:Id', userController.updateProfileById);

// PATCH – Partial Update
router.patch('/profile/:Id', userController.patchProfileById);

module.exports = router;
