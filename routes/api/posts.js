const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load validators
const validatePostInput = require("../../validation/post");

// Load models
const Post = require("../../models/Post");

/**
 * @route   GET api/posts/test
 * @desc    Tests posts route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({msg: "Posts works"}));

/**
 * @route   POST api/posts
 * @desc    Create comment route
 * @access  Public
 */
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.user.id
    })

    newPost.save().then(post => res.json(post));
});

module.exports = router;