import objectReduce from 'fast-loops/lib/objectReduce';
import cssifyObject from 'css-in-js-utils/lib/cssifyObject';

export default function cssifyKeyframeRule(frames) {
  return objectReduce(frames, function (css, frame, percentage) {
    return '' + css + percentage + '{' + cssifyObject(frame) + '}';
  }, '');
}