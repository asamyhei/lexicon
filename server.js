//Install express server
const path = require("path");
const https = require("https");
const fs = require("fs");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/data", function(req, res) {
  fs.readFile((__dirname + "/src/assets/data.json"), (err, data) => {
    if (err) {
      throw err;
    }
    let lexicon = JSON.parse(data);
    //console.log(lexicon);
    return res.send(lexicon);
  });
});

app.post("/api/data", function(req, res) {
  var lexicon = null;

  fs.readFile((__dirname + "/src/assets/data.json"), (err, data) => {
    if (err) {
      throw err;
    }

    lexicon = JSON.parse(data);
    if (lexicon.data.find(entry => entry.name === req.body.name)) {
      return res.send("item alreadyy exist");
    }
    lexicon.data.push(req.body);

    fs.writeFile((__dirname + "/src/assets/data.json"), JSON.stringify(lexicon), (err2) => {
      if (err2) {
        throw err2;
      }
      return res.send(req.body);
    });
  });
});

app.put("/api/data", function(req, res) {
  var lexicon = null;

  fs.readFile((__dirname + "/src/assets/data.json"), (err, data) => {
    if (err) {
      throw err;
    }

    lexicon = JSON.parse(data);
    let word = lexicon.data.find(entry => entry.name === req.body.name);
    if (word) {
      word.description = req.body.description;
    } else {
      return res.send("not found");
    }

    fs.writeFile((__dirname + "/src/assets/data.json"), JSON.stringify(lexicon), (err2) => {
      if (err2) {
        throw err2;
      }
      return res.send(req.body);
    });
  });
});

app.delete("/api/data", function(req, res) {
  var lexicon = null;

  fs.readFile((__dirname + "/src/assets/data.json"), (err, data) => {
    if (err) {
      throw err;
    }

    lexicon = JSON.parse(data);
    lexicon.data = lexicon.data.filter(entry => entry.name !== req.body.name);

    fs.writeFile((__dirname + "/src/assets/data.json"), JSON.stringify(lexicon), (err2) => {
      if (err2) {
        throw err2;
      }
      return res.send(`deleted ${req.body.name}`);
    });
  });
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/pompous-lexicon"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/pompous-lexicon/index.html"));
});

setInterval(function() {
  https.get("https://pompous-lexicon.herokuapp.com", function(res) {
    var a;
  });
}, 300000); // every 5 minutes (300000)

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
