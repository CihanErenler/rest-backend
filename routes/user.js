const router = require("express").Router();
const verify = require("../verifyToken");
const User = require('../model/user');

// get all users
router.get('/', verify, async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            success: 1,
            users
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({
        success: 0,
        message: "Something went wrong",
        });
    }
})

// get user profile by id
router.get('/:id', verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({
            success: 1,
            user
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({
        success: 0,
        message: "Something went wrong",
        });
    }
})

module.exports = router;