var express = require("express");
var router = express.Router(); //1
// Home
router.get("/", function(req, res){
  res.redirect("/contacts");
});

module.exports = router; // 3
