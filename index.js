var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override"); // 대부분의 브라우저의 form은 get과 post 만을 허용하고 나머지(delete)는 허용하지 않음
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);  //mongoose에서 내는 몇가지 경고를 안나게 하는 코드
mongoose.set('useFindAndModify', false); //mongoose에서 내는 몇가지 경고를 안나게 하는 코드
mongoose.set('useCreateIndex', true);    //mongoose에서 내는 몇가지 경고를 안나게 하는 코드
mongoose.connect('mongodb://localhost/database'); //DB연결
var db = mongoose.connection; // mongoose의 db object를 가져와 db변수에 넣는 과정입니다. 이 db변수에는 DB와 관련된 이벤트 리스너 함수들이 있습니다.
//성공했을경우
db.once("open", function(){
  console.log("DB connected");
});
//애러났을경우
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method")); // _method의 query로 들어오는 값(id?_method=delete)으로 HTTP method(delete)로 바꿈

// Routes
app.use("/", require("./routes/home")); //1
app.use("/contacts", require("./routes/contacts")); //2

// Port setting
var port = 3000;
app.listen(3000, function(){
  console.log("server on! http://localhost:"+port);
});
