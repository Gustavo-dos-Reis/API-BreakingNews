const router =require("express").Router();

const swaggerUi = require("swagger-ui-express")
const swaggerRouter = require("../swagger.json");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerRouter));

module.exports = router;