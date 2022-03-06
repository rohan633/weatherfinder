const express=require("express");
const cors=require("cors");
const axios=require("axios");
var bodyParser = require('body-parser');
const app= express();
app.set('view engine', 'ejs');
// 0-60000
//https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=908141c9817effdb47e0a0b3ceb011f0
app.use( express.static( "public" ) );
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(parser.json())
app.use(bodyParser.json());
app.get('/weather',(req,res)=>{
    const d = new Date();
    let date=d.toDateString();
    res.render("view/weather",{
        name:"Surat",
        temp:"25.99",
        country:"IN",
        status:"200",
        errmsg:"",
        date:date
    });
})
app.get('/',(req,res)=>{
    res.render("view/index");
})
app.post('/weather',(req,res)=>{
    // console.log(req.body.cityname);
    const d = new Date();
    let date=d.toDateString();
    const cityname=req.body.cityname;
    let temp="";
    let name="";
    let country="";
    let status="";
    let errmsg="Please Write Currectly City Name!";
     (async()=>{
         try{
            let abc = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=908141c9817effdb47e0a0b3ceb011f0`);
                console.log(abc.data);
                temp=abc.data.main.temp_max;
                name=abc.data.name;
                country=abc.data.sys.country;
                res.render("view/weather",{
                    name:name,
                    temp:temp,
                    country:country,
                    status:"200",
                    errmsg:"",
                    date:date
                });
         }catch(err){
                res.render("view/weather",{
                    name:"xyz",
                    temp:errmsg,
                    country:"IN",
                    status:"404",
                    errmsg:errmsg,
                    date:date
                });
         }
        
        
     })();
})
app.listen(5000,(req,res)=>{
    console.log("server is running");
})