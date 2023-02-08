'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GanttBar = (_temp = _class = function (_Component) {
  _inherits(GanttBar, _Component);

  function GanttBar() {
    _classCallCheck(this, GanttBar);

    return _possibleConstructorReturn(this, (GanttBar.__proto__ || Object.getPrototypeOf(GanttBar)).apply(this, arguments));
  }

  _createClass(GanttBar, [{
    key: 'getSteps',
    value: function getSteps() {
      var _this2 = this;

      var templates = this.context.templates;
      var templateName = this.props.templateName;

      var template = templates[templateName];
      return _lodash2.default.map(template.steps, function (step, index) {
        return _this2.getStep(index, template);
      });
    }
  }, {
    key: 'getStep',
    value: function getStep(index, template) {
      var _context = this.context,
          leftBound = _context.leftBound,
          rightBound = _context.rightBound;
      var steps = this.props.steps;

      var stepStartTime = steps[index];
      var stepEndTime = template.steps.length > index ? steps[index + 1] : null;
      if (!stepEndTime) return null;
      var stepDuration = (0, _moment2.default)(stepEndTime).diff(stepStartTime, 'seconds');
      var theoreticalWidth = this.durationToWidth(stepDuration);
      var startPixel = this.timeToPixel(stepStartTime);
      var endPixel = this.timeToPixel(stepEndTime);
      var displayWidth = endPixel - startPixel;
      var offTimelineLeft = false;
      var offTimelineRight = false;
      if ((0, _moment2.default)(stepStartTime).diff((0, _moment2.default)(leftBound), 'seconds') < 0) {
        offTimelineLeft = true;
      }
      if ((0, _moment2.default)(rightBound).diff((0, _moment2.default)(stepEndTime), 'seconds') < 0) {
        offTimelineRight = true;
      }
      return {
        name: template.steps[index].name,
        color: template.steps[index].color,
        duration: stepDuration,
        theoreticalWidth: theoreticalWidth,
        displayWidth: displayWidth,
        startPixel: startPixel,
        endPixel: endPixel,
        offTimelineLeft: offTimelineLeft,
        offTimelineRight: offTimelineRight,
        startTime: stepStartTime,
        endTime: stepEndTime
      };
    }
  }, {
    key: 'durationToWidth',
    value: function durationToWidth(duration) {
      var _context2 = this.context,
          leftBound = _context2.leftBound,
          rightBound = _context2.rightBound,
          timelineWidth = _context2.timelineWidth;

      var timelineDuration = (0, _moment2.default)(rightBound).diff(leftBound, 'seconds');
      var percentage = duration > 0 ? duration / timelineDuration : 0;
      return timelineWidth * percentage;
    }
  }, {
    key: 'timeToPixel',
    value: function timeToPixel(time) {
      var _context3 = this.context,
          leftBound = _context3.leftBound,
          timelineWidth = _context3.timelineWidth;

      var leftBoundPixel = 0;
      var rightBoundPixel = timelineWidth;
      var timeDurationFromLeftBound = (0, _moment2.default)(time).diff(leftBound, 'seconds');
      var timeWidthFromLeftBound = this.durationToWidth(timeDurationFromLeftBound);
      var pixel = timeWidthFromLeftBound;
      if (leftBoundPixel < pixel && pixel < rightBoundPixel) return pixel;
      if (pixel <= leftBoundPixel) return leftBoundPixel;
      if (pixel >= rightBoundPixel) return rightBoundPixel;
      return null;
    }
  }, {
    key: 'defaultRender',
    value: function defaultRender() {
      var style = this.props.style;

      var steps = this.getSteps();
      return _react2.default.createElement(
        'div',
        { ref: 'bar', style: { display: 'flex' } },
        _lodash2.default.map(steps, function (step, index) {
          return _react2.default.createElement(
            'div',
            { key: 'reg' + step.name + index },
            _react2.default.createElement('div', {
              style: _extends({}, style, {
                borderTopLeftRadius: step.offTimelineLeft ? '6%' : '0%',
                borderBottomLeftRadius: step.offTimelineLeft ? '6%' : '0%',
                borderTopRightRadius: step.offTimelineRight ? '6%' : '0%',
                borderBottomRightRadius: step.offTimelineRight ? '6%' : '0%',
                width: step.displayWidth + 'px',
                backgroundColor: step.color,
                marginLeft: index === 0 ? step.startPixel + 'px' : '0px'
              })
            })
          );
        })
      );
    }
  }, {
    key: 'debugRender',
    value: function debugRender() {
      var dateFormat = this.context.dateFormat;

      var steps = this.getSteps();
      return _react2.default.createElement(
        'div',
        { ref: 'bar' },
        _lodash2.default.map(steps, function (step, index) {
          return _react2.default.createElement(
            'div',
            { key: 'deb' + step.name + index },
            _react2.default.createElement(
              'div',
              null,
              'Start Time: ',
              (0, _moment2.default)(step.startTime).format(dateFormat),
              _react2.default.createElement('br', null),
              'End Time: ',
              (0, _moment2.default)(step.endTime).format(dateFormat),
              _react2.default.createElement('br', null),
              'Start Pixel: ',
              step.startPixel,
              _react2.default.createElement('br', null),
              'End Pixel: ',
              step.endPixel,
              _react2.default.createElement('br', null),
              'Theoretical Width: ',
              step.theoreticalWidth,
              _react2.default.createElement('br', null),
              'Display Width: ',
              step.displayWidth
            ),
            _react2.default.createElement('div', {
              style: {
                height: '20px',
                width: step.displayWidth + 'px',
                backgroundColor: step.color,
                marginLeft: step.startPixel
              }
            }),
            _react2.default.createElement('hr', null)
          );
        }),
        this.defaultRender()
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.context.debug) return this.debugRender();
      return this.defaultRender();
    }
  }]);

  return GanttBar;
}(_react.Component), _class.propTypes = {
  templateName: _propTypes2.default.string.isRequired,
  steps: _propTypes2.default.array.isRequired,
  style: _propTypes2.default.object.isRequired
}, _class.contextTypes = {
  templates: _propTypes2.default.object.isRequired,
  dateFormat: _propTypes2.default.string.isRequired,
  debug: _propTypes2.default.bool.isRequired,
  leftBound: _propTypes2.default.object.isRequired,
  rightBound: _propTypes2.default.object.isRequired,
  timelineWidth: _propTypes2.default.number.isRequired,
  activeRow: _propTypes2.default.number
}, _temp);
exports.default = GanttBar;