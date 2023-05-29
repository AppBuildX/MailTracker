"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.authOptions = void 0;

var _nextAuth = _interopRequireDefault(require("next-auth"));

var _google = _interopRequireDefault(require("next-auth/providers/google"));

var _axiosInstance = _interopRequireDefault(require("@/lib/axiosInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authOptions = {
  providers: [(0, _google["default"])({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })],
  callbacks: {
    signIn: function signIn(_ref) {
      var account, id_token, response, auth;
      return regeneratorRuntime.async(function signIn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              account = _ref.account;
              _context.prev = 1;
              id_token = account.id_token;
              _context.next = 5;
              return regeneratorRuntime.awrap(_axiosInstance["default"].post("/api/auth/google/callback", {
                idToken: id_token
              }));

            case 5:
              response = _context.sent;
              auth = response.data.auth;
              return _context.abrupt("return", auth ? true : "/");

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 10]]);
    }
  }
};
exports.authOptions = authOptions;

var _default = (0, _nextAuth["default"])(authOptions);

exports["default"] = _default;