const express = require("express")
const associationController = require("../controllers/associationController")

const router = express.Router()

router.get('/one-to-one', associationController.testOneToOne)
router.get('/one-to-many', associationController.testOneToMany)
router.get('/many-to-many', associationController.testManyToMany)
router.get("/filteration",associationController.filteration)
router.get("/foo-bar", associationController.barFoo)

module.exports = router