// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) { 
  const IS_NUMBER_REGEX = /^\d+$/g;
  let dateToParse;

  if (req.params.date === undefined) {
    const date = new Date();

    return res.json({ 
      unix: date.getTime(), 
      utc: date.toUTCString(),
    });
  }

  if (Date.parse(req.params.date)) {
    dateToParse = req.params.date;
  }

  if (IS_NUMBER_REGEX.test(req.params.date)) {
    dateToParse = Number.parseInt(req.params.date);
  }

  if (dateToParse === undefined) {
    return res.json({
      error: 'Invalid date',
    });
  }

  const date = new Date(dateToParse);

  return res.json({ 
    unix: date.getTime(), 
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
