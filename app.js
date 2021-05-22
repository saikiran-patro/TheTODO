const express = require("express")
const bodyParser=require("body-parser")
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://SaiKiran-admin:adminsaikiran198@cluster1.didxr.mongodb.net/todoDB",{useNewUrlParser:true,useUnifiedTopology: true})
//databases
const itemsSchema =new mongoose.Schema({ name:String})
const item=mongoose.model("item",itemsSchema)

// const Item1=new item({ name:"item 1 testing"})
// const Item2=new item({name:"item 2 testing"})
// const Item3=new item({ name:"item 3 testing"})

//const myitems=[Item1, Item2, Item3]

//mongoose.connection.close();





var routeName="";
app=express()
app.set('view engine', 'ejs');
app.get("/",(request,response) =>{
  routeName="/"
  var today=new Date();
  var cday=today.getDay();
  var day=""
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  day=today.toLocaleDateString('en-US',options)
  item.find({},(err,mytodos)=>{

    
    
    
      console.log(mytodos)
      routeName="/"
      response.render("list",{someday:day,todos:mytodos,route:routeName});


    
        })
  
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.post("/",(request,response) =>{
  var t=request.body.tod;
  if(t!=""){
    const Item= new item({ name:t})
    Item.save();
 
  }
  
  response.redirect("/")
  
})


app.post("/delete",(request,response) =>{
  let deleteId=request.body.checked
  item.deleteOne({_id:deleteId},(err)=>{
    if (err){
      console.log(err);
    }
    else{
      console.log("successfully deleteOne")


    }

  })
  response.redirect("/")
})


//

app.listen(3000,() => {
    console.log("server starting...");
    console.log("server started");
   

})