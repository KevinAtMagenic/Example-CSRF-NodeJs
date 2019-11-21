const express = require('express');
//const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

const app = express();
//const port = process.env.PORT || 5000;
const port = 5000;
const csrfProtection = csrf({ cookie: true})
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// API calls
app.get('/api/hello', csrfProtection, (req, res) => {
  let token = req.csrfToken({ cookie: true });
  //res.cookie('CSRF_TOKEN', token)
  res.send(
    { 
      csrfToken: token
 });
});

app.post('/api/world', csrfProtection, (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
