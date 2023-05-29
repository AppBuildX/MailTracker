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
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  callbacks: {
    signIn: function signIn(_ref) {
      var account, id_token, response, auth;
      return regeneratorRuntime.async(function signIn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              account = _ref.account;
              id_token = account.id_token;
              _context.next = 4;
              return regeneratorRuntime.awrap(_axiosInstance["default"].post("/api/auth/google/callback", {
                idToken: id_token
              }));

            case 4:
              response = _context.sent;
              auth = response.data.auth;
              return _context.abrupt("return", auth ? true : "/");

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    redirect: function redirect(_ref2) {
      var baseUrl;
      return regeneratorRuntime.async(function redirect$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              baseUrl = _ref2.baseUrl;
              return _context2.abrupt("return", baseUrl);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    session: function session(_ref3) {
      var _session;

      return regeneratorRuntime.async(function session$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _session = _ref3.session;
              return _context3.abrupt("return", _session);

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    jwt: function jwt(_ref4) {
      var token;
      return regeneratorRuntime.async(function jwt$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              token = _ref4.token;
              return _context4.abrupt("return", token);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }
};
exports.authOptions = authOptions;

var _default = (0, _nextAuth["default"])(authOptions);

exports["default"] = _default;