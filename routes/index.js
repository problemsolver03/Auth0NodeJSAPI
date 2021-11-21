var express = require("express");
var router = express.Router();
const { auth } = require("express-oauth2-jwt-bearer");

//checkJwt is the middleware to be used to check if the user is authenticate the access token will be passed on request header
const checkJwt = auth({
  audience: "http://localhost:3000", // your api endpoint
  issuerBaseURL: `https://replaceWithYourAPPUrl`, //you'll find this on Applications>DefaultApp(or your app)>Basic Information>Domain
});

/* GET home page. */
router.get("/authorize", function (req, res, next) {
  var request = require("request");
  var data = {
    client_id: "replace you desired application client ID created on Auth0",
    username: "username",
    password: "password",
    client_secret: "replace you desired application client ID created on Auth0",
    audience: "http://localhost:3000/", // your api endpoint
    grant_type: "password",
  };

  var options = {
    method: "POST",
    url: "yourAppURLfromAuth0/oauth/token", // only replace yourAppURLfromAuth0 and leave /oauth/token
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
    console.log(body);
  });
});

router.get("/authorized", checkJwt, function (req, res) {
  //pass previoulsly generated access token in request header as bearer token to access this route.
  res.send("Secured Resource");
});

module.exports = router;
