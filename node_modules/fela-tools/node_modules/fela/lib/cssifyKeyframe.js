'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyKeyframe;

var _arrayReduce = require('fast-loops/lib/arrayReduce');

var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

var _cssifyKeyframeRule = require('./cssifyKeyframeRule');

var _cssifyKeyframeRule2 = _interopRequireDefault(_cssifyKeyframeRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssifyKeyframe(frames, animationName) {
  var prefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];
  var prerendered = arguments[3];

  var keyframe = prerendered || (0, _cssifyKeyframeRule2.default)(frames);

  return (0, _arrayReduce2.default)(prefixes, function (cssKeyframe, prefix) {
    return cssKeyframe + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
  }, '');
}