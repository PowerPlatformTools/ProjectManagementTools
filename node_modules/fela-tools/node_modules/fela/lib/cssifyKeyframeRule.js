'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyKeyframeRule;

var _objectReduce = require('fast-loops/lib/objectReduce');

var _objectReduce2 = _interopRequireDefault(_objectReduce);

var _cssifyObject = require('css-in-js-utils/lib/cssifyObject');

var _cssifyObject2 = _interopRequireDefault(_cssifyObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssifyKeyframeRule(frames) {
  return (0, _objectReduce2.default)(frames, function (css, frame, percentage) {
    return '' + css + percentage + '{' + (0, _cssifyObject2.default)(frame) + '}';
  }, '');
}