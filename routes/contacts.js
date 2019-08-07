var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact"); //1


// Contacts - Index
router.get("/", function(req, res){
  Contact.find({}, function(err, contacts){ //검색조건, 콜백함수
    if(err) return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});
// Contacts - New
router.get("/new", function(req, res){
  res.render("contacts/new");
});
// Contacts - create
router.post("/", function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});
// Contacts - show
// "contacts/abcd1234"가 입력되면 "contacts/:id" route에서 이를 받아 req.params.id에 "abcd1234"
router.get("/:id", function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){ // model의 document를 하나 찾는 함수
    if(err) return res.json(err);
    res.render("contacts/show", {contact:contact});  });
});
// Contacts - edit
router.get("/:id/edit", function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render("contacts/edit", {contact:contact});  });
});
// Contacts - update
router.put("/:id", function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts/"+req.params.id);  });
});
// Contacts - destroy
router.delete("/:id", function(req, res){
  Contact.deleteOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");  });
});

module.exports = router;
