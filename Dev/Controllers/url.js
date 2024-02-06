const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is requires" });
  const shortID = shortid.generate();
  await URL.create({
    shortID: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.json({ 
    totalClicks: result.visitHistory.length,
    analytics : result.visitHistory,
 });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
