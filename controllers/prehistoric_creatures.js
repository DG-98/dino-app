const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get("/", (req, res) => {
  let prehistoric_creatures = fs.readFileSync("./prehistoric_creatures.json")
  let creatureData = JSON.parse(prehistoric_creatures)

  let typeFilter = req.query.typeFilter
  if (typeFilter) {
    creatureData = creatureData.filter((creature) => {
      return creature.name.toLowerCase() === typeFilter.toLowerCase()
    })
  }
  res.render("./prehistoric_creatures/index.ejs", { creatureData })
})

router.get("/new", (req, res) => {
  res.render("./prehistoric_creatures/new.ejs")
})

router.get("/edit/:idx", (req, res) => {
  let prehistoric_creatures = fs.readFileSync("./prehistoric_creatures.json")
  let creatureData = JSON.parse(prehistoric_creatures)

  res.render("prehistoric_creatures/edit.ejs", {
    creatureID: req.params.idx,
    creature: creatureData[req.params.idx],
  })
})

router.put("/:idx", (req, res) => {
  let prehistoric_creatures = fs.readFileSync("./prehistoric_creatures.json")
  let creatureData = JSON.parse(prehistoric_creatures)

  // re-assign name and type fields to be edited
  creatureData[req.params.idx].type = req.body.type
  creatureData[req.params.idx].img_url = req.body.img_url

  //save the edited dinos to the json file
  fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))
  res.redirect("/prehistoric_creatures")
})

router.get("/:idx", (req, res) => {
  //get dinos
  let prehistoric_creatures = fs.readFileSync("./prehistoric_creatures.json")
  let creatureData = JSON.parse(prehistoric_creatures)

  //get array index from url parameter
  let creatureIndex = req.params.idx

  res.render("./prehistoric_creatures/show.ejs", {
    myCreature: creatureData[creatureIndex],
  })
})

router.post("/", (req, res) => {
  // get dino array
  let prehistoric_creatures = fs.readFileSync("./prehistoric_creatures.json")
  let creatureData = JSON.parse(prehistoric_creatures)

  //add new dino to dinoData
  creatureData.push(req.body)

  //save updated dinoData to json
  fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))

  //redirect to GET dinosaurs (index)
  res.redirect("/prehistoric_creatures")

  console.log(req.body)
})

router.delete("/:idx", (req, res) => {
  let prehistoric_creatures = fs.readFileSync("./prehistoric_creatures.json")
  let creatureData = JSON.parse(prehistoric_creatures)

  //remove deleted dinosaur from dinosaurs array
  creatureData.splice([req.params.idx], 1)

  //save new dinos to json file
  fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))

  res.redirect("/prehistoric_creatures")
})

module.exports = router
