const express = require('express');
const {handleGenerateNewShortURL,handleGetAnalytics} = require("../Controllers/url");

const router = express.Router();

router.post("/",handleGenerateNewShortURL)

router.get("/analytics/:shortID",handleGetAnalytics)


module.exports = router;