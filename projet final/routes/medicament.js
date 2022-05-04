const router = require("express").Router()  //call it as a function //
const { createMedicament } = require("../controllers/medicamentController")
const { getALLMedicaments } = require("../controllers/medicamentController")
const { getMedicament } = require("../controllers/medicamentController") //dec
const { updateMedicament } = require("../controllers/medicamentController")
const { deleteMedicament } = require("../controllers/medicamentController")




router.route("/medicament/nouveau").post(createMedicament)
router.route("/medicament/all").get(getALLMedicaments)
router.route("/medicament/:id").get(getMedicament)
router.route("/medicament/modifier/:id").put(updateMedicament)
router.route("/medicament/:id").delete(deleteMedicament)


module.exports = router