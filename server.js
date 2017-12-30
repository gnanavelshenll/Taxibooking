'use strict';

require('zone.js/dist/zone-node');

const express = require('express');
//const ngUniversal = require('@nguniversal/express-engine');
const appServer = require('./dist/main.bundle');

function angularRouter(req, res) {

  res.render('index', {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: "${req.protocol}://${req.get('host')}"
    }]
  });

}

const app = express();

app.get('/', angularRouter);

app.use(express.static('${__dirname}/dist'));

app.get('/api', (req, res) => {
  res.json({ data: 'Content from HTTP request.' });
});

// app.engine('html', ngUniversal.ngExpressEngine({
//   bootstrap: appServer.AppServerModuleNgFactory
// }));

let template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();

app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', 'dist');

app.get('*', angularRouter);

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});