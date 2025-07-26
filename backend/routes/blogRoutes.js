const express = require('express');
const router = express.Router();
const { createBlog, readallBlog, readbyId, updatebyId, deletebyId, updatebyPatch, searchBlogs } = require('../Controllers/blogController')

router.post('/', createBlog);
router.get('/', readallBlog);
router.get('/:id', readbyId);
router.put('/:Id', updatebyId);
router.patch('/:Id', updatebyPatch);
router.delete('/:Id', deletebyId);
router.get('/search', searchBlogs);

module.exports = router;