const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

const app = express();
const port = 5000;
const csrfProtection = csrf({ cookie: true})
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/hello', csrfProtection, (req, res) => {
  let token = req.csrfToken({ cookie: true });
  res.send(
    { 
      csrfToken: token
 });
});

app.post('/api/world', csrfProtection, (req, res) => {
  console.log('req.body', req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
