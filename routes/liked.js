const router = require("express").Router();
const verify = require("../verifyToken");
const Rest = require("../model/rests");
const jwt = require("jsonwebtoken");

// Add a liked place to database
router.post("/liked", verify, async (req, res) => {
  const body = req.body;
  const token = req.header('auth-token')
  const decode = await jwt.decode(token)
  const id = decode._id

  const place = new Rest({
    rest_id: body.rest_id,
    user_id: id,
    name: body.name,
    img_url: body.img_url,
    rating: body.rating,
    address: body.address,
  });

  try {
    const saved = await place.save(place);
    res.status(200).json({
      success: 1,
      message: saved,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: 0,
      message: "Something went wrong",
    });
  }
});

// Get all liked restaurants
router.get("/liked", verify, async (req, res) => {
  const token = req.header('auth-token')
  const decode = await jwt.decode(token)
  const id = decode._id

  try {
    const list = await Rest.find({user_id: id});
    res.status(200).json({
      success: 1,
      message: list,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: 0,
      message: "There is no item in database",
    });
  }
});

// Delete liked restaurant from database
router.delete("/liked/:id", verify, async (req, res) => {
  const id = req.params.id;

  try {
    await Rest.findByIdAndDelete(id);
    res.status(204).json({
      success: 1,
      message: "Item deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: 0,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
