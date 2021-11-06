const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const fs = require("fs")
const methodOverride = require("method-override")

//middleware
app.use(ejsLayouts)
app.set("view engine", "ejs")
//body-parser middleware
//makes req.body work
app.use(express.urlencoded({ extended: false }))
//controllers middleware
app.use(methodOverride("_method"))
app.use("/dinosaurs", require("./controllers/dinosaurs.js"))
app.use(
  "/prehistoric_creatures",
  require("./controllers/prehistoric_creatures")
)
app.get("/", (req, res) => {
  res.render("home.ejs")
})

app.listen(8000)
