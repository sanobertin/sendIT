'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();
var path = require('path');
bodyParser = require('body-parser');
var execute = require('./api/models/db').execute;
var parcelsRoutes = require('./api/routes/parcels');
var usersRoutes = require('./api/routes/users');
var staticRoutes = require('./api/routes/staticfiles');

// change
app.use('/api/v1/parcels', parcelsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1', staticRoutes);
app.use(_express2.default.urlencoded()); // to support URL-encoded bodies
app.use(_express2.default.static(path.join(__dirname + '/UI')));
app.set('views', path.join(__dirname + '/UI')); // specify the views directory


var a = 'CREATE TABLE parcels(' + 'parcelID SERIAL,' + 'owner TEXT NOT NULL,' + 'parcelName TEXT NOT NULL,' + 'fromlocation TEXT NOT NULL, ' + 'tolocation TEXT NOT NULL, ' + 'presentLocation TEXT NOT NULL, ' + 'price DECIMAL(600, 3) NOT NULL, ' + 'status TEXT NOT NULL, ' + 'PRIMARY KEY (parcelID), ' + 'FOREIGN KEY (userID) REFERENCES users(userID)' + ');';
app.get('/test', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return execute(a);

          case 2:
            result = _context.sent;

            res.send(result);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('server is OK on port ' + port);
});

module.exports = app;