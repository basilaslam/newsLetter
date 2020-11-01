//jshint esversion: 6

const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const { response } = require("express")
const { json } = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))


app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=> { 

    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email

    const data = {
        members : [
            {
                email_address: email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)

    const url = "https://us2.api.mailchimp.com/3.0/lists/b59b33893b"

    const Options = {
        method: "POST",
        auth : "Basil:a7aae017a8e3cc5865efac86e0303efef-us2"
    }


   const request =  https.request(url, Options, (response)=>{

    if (response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html")
    }
        response.on("data",(data)=>{
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()

});

app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("server 3333")   
})

// API-key
// 7aae017a8e3cc5865efac86e0303efef-us2
// List-Id
// b59b33893b

