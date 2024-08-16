// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/:date",(req,res)=>{{
  try{
    let date=req.params.date;
    const regex = /^\d+$/;
    let response;

    if(regex.test(date)){
        const dateInt = parseInt(date);
        const dateObj = new Date(dateInt);
        if(dateObj.toString() === "Invalid Date"){
            return res.status(500).json({
                error: "Invalid Date"
            })
        }
        response = {
            unix: dateInt,
            utc: dateObj.toUTCString()
        }
        return res.json(response)
        
    }
    const dateObj = new Date(date);
    if(dateObj.toString() === "Invalid Date"){
        return res.status(500).json({
            error: "Invalid Date"
        })
    }
    response={
        unix: dateObj.getTime(),
        utc: dateObj.toUTCString()
    }
    return res.json(response)


    
}catch(e){
    return res.json({
        error : "Invalid Date"
    })

}
}

})
app.get("/api",(req,res)=>{
  const dateObj = new Date();
  res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
  })
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
