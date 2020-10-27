const express = require("express")
const employeeContoller = require("./controller/employee.controller")

const router = express.Router()

router.get("/", employeeContoller.getAll)
// router.get("/:id", employeeContoller.getOne)
router.post("/", employeeContoller.create)
// router.patch("/:id", employeeContoller.update)
// router.delete("/:id", employeeContoller.delete)

module.exports = router
