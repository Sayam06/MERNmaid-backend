const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "{key}",
  { useNewUrlParser: true }
);

const authSchema = new mongoose.Schema({
  username: String,
  googleId: String,
});

app.post("/auth/android/google/post", function (req, res) {
  const User = mongoose.model("users", authSchema);

  User.findOne({ googleId: req.body.googleId }, function (err, found) {
    if (err) {
      res.send(err);
    } else {
      if (!found) {
        const newUser = new User({
          username: req.body.username,
          googleId: req.body.googleId,
        });
        newUser.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send(req.body.googleId);
          }
        });
      } else {
        res.send(req.body.googleId);
      }
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server is running on port 3000!");
});
