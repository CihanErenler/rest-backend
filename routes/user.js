const router = require("express").Router();
const verify = require("../verifyToken");
const jwt = require("jsonwebtoken");
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

// update user
router.put('/', verify, async (req, res) => {
    const token = req.header('auth-token')
    const decode = await jwt.decode(token)
    const id = decode._id
    const updatedUser = {
        email: req.body.email,
        city: req.body.city,
        fav_food: req.body.fav_food
    }
    try {
        const user = await User.findByIdAndUpdate(id, updatedUser, {new:true})
        res.json({
            success: 1,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: 0,
        message: "Something went wrong",
        });
    }
})

// get user profile by id
// router.get('/:id', verify, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.json({
//             success: 1,
//             user
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//         success: 0,
//         message: "Something went wrong",
//         });
//     }
// })

// get my profile
router.get('/me', verify, async (req, res) => {
    const token = req.header('auth-token')
    const decode = await jwt.decode(token)
    const id = decode._id
    try {
        const user = await User.findById(id);
        res.json({
            success: 1,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: 0,
        message: "Something went wrong",
        });
    }
})

module.exports = router;