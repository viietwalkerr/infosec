const express = require('express');
const { xssFilter } = require('helmet');
const helmet = require('helmet');
const app = express();

/**
 * Use to hide X-Powered-By header
 * Hackers exploit vulnerabilities in Express/Node
 * This hides the X-Powered-By: Express header
 */
app.use(helmet.hidePoweredBy());

/**
 * Page could be put in <frame> or <iframe> tags which can cause users
 * to click hidden buttons set by hacker (puts a layer over page)
 */
app.use(helmet.frameguard({action: 'deny'}));

/**
 * xssFilter() is used to neutralize Cross Site Scripting (XSS)
 */
app.use(xssFilter());

/**
 * Browsers can use content or MIME sniffing to override response "Content-Type"
 * headers to guess and process data using implicit content type.
 * Middleware sets X-Content-Type-Options header to nosniff instructing
 * the browser to NOT bypass provided Content-Type
 */
app.use(helmet.noSniff());










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
