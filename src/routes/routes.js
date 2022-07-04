const express = require("express");
const { getAll } = require("../controlers/controler");
const router = express.Router();



router.get("/get", getAll )










module.exports = router;
