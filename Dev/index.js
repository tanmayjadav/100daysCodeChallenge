const express = require("express");
const URL = require("./models/url");
const path = require("path")
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("db connected");
});

app.use(express.json());
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

app.use("/url", urlRoute);

app.get("/test", async(req,res)=>{
    const urlall = await URL.find({});
    return res.render("home",{
        urls:urlall
    })
});

app.get("/url/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    {
        new: true, // return the updated document
        lean: true, // return a plain JavaScript object
    },
  );
  console.log(entry)
//   console.log(entry.redirectUrl)
  res.redirect(entry.redirectUrl);
});


app.listen(PORT, () => console.log(`server Started at ${PORT}`));
