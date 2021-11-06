const { Router } = require("express")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  let creatures = fs.readFileSync("./prehistoric_creatures.json")
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
  let creatures = fs.readFileSync("./prehistoric_creatures.json")
  let creatureData = JSON.parse(prehistoric_creatures)

  res.render("prehistoric_creatures/edit.ejs", {
    dinoID: req.params.idx,
    dino: dinoData[req.params.idx],
  })
})

module.exports = router
