const express = require("express");
const {
  getAll,
  createNews,
  putNews,
  deleteNews,
} = require("../controlers/controler");
const router = express.Router();

router.get("/get", getAll);
router.post("/post", createNews);
router.put("/put/:_id", putNews);
router.delete("/delete/:_id", deleteNews);

module.exports = router;
