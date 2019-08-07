var mongoose = require("mongoose");
// DB schema
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model("contact", contactSchema); //  contact(Table명) Collection model을 생성

module.exports = Contact;
