import arrayReduce from 'fast-loops/lib/arrayReduce';

import cssifyKeyframeRule from './cssifyKeyframeRule';

export default function cssifyKeyframe(frames, animationName) {
  var prefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];
  var prerendered = arguments[3];

  var keyframe = prerendered || cssifyKeyframeRule(frames);

  return arrayReduce(prefixes, function (cssKeyframe, prefix) {
    return cssKeyframe + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
  }, '');
}