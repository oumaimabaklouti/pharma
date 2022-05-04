const express = require("express")  //importer les packages //
const dotenv = require ("dotenv")
const mongoose = require("mongoose")
const cors = require('cors');

const docteur = require("./routes/docteur")
const medicament = require("./routes/medicament") //import routes
const certif = require("./routes/certif")

const bodyParser = require("body-parser") // import 
const app = express() //sortie 
app.use(express.json())  // use json from express 
app.use(cors())
dotenv.config()  //on doit l'utilisé en mode configuré
app.use(bodyParser.urlencoded({extended:true})) // body parsing middleware 


//db connection//
mongoose.connect(process.env.URL,err =>  {
    if(err) throw err
    console.log("connected to mongo DB")
})



app.use("/api",docteur) //ajouté la chaîne "/api" //middlewares //
app.use("/api",medicament)
app.use("/api",certif) 




const PORT = process.env.PORT||8080 //récupérer la variable de .env

app.listen(PORT,()=> {    //lancer le server p(le port et une fonction callback)
    console.log("le server est lancé sur le port "+PORT)
})







//http://localhost:8080/api/medicament/all