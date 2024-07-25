const express = require('express')
const {registerUser} = require("../controller/registerUser")
const {allUser} = require("../controller/allUser")
const {authUser} = require("../controller/authUser")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/').post(registerUser).get(protect,allUser)
router.post('/login', authUser)


module.exports = router;