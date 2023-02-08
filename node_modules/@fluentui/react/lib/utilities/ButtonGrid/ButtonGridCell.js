import * as React from 'react';
import { css } from '../../Utilities';
import { CommandButton } from '../../Button';
import { useId } from '@fluentui/react-hooks';
export var ButtonGridCell = function (props) {
    var _a;
    var defaultId = useId('gridCell');
    var item = props.item, _b = props.id, id = _b === void 0 ? defaultId : _b, className = props.className, role = props.role, selected = props.selected, _c = props.disabled, disabled = _c === void 0 ? false : _c, onRenderItem = props.onRenderItem, cellDisabledStyle = props.cellDisabledStyle, cellIsSelectedStyle = props.cellIsSelectedStyle, index = props.index, label = props.label, getClassNames = props.getClassNames, onClick = props.onClick, onHover = props.onHover, onMouseMove = props.onMouseMove, onMouseLeave = props.onMouseLeave, onMouseEnter = props.onMouseEnter, onFocus = props.onFocus;
    var handleClick = React.useCallback(function () {
        if (onClick && !disabled) {
            onClick(item);
        }
    }, [disabled, item, onClick]);
    var handleMouseEnter = React.useCallback(function (ev) {
        var didUpdateOnEnter = onMouseEnter && onMouseEnter(ev);
        if (!didUpdateOnEnter && onHover && !disabled) {
            onHover(item);
        }
    }, [disabled, item, onHover, onMouseEnter]);
    var handleMouseMove = React.useCallback(function (ev) {
        var didUpdateOnMove = onMouseMove && onMouseMove(ev);
        if (!didUpdateOnMove && onHover && !disabled) {
            onHover(item);
        }
    }, [disabled, item, onHover, onMouseMove]);
    var handleMouseLeave = React.useCallback(function (ev) {
        var didUpdateOnLeave = onMouseLeave && onMouseLeave(ev);
        if (!didUpdateOnLeave && onHover && !disabled) {
            onHover();
        }
    }, [disabled, onHover, onMouseLeave]);
    var handleFocus = React.useCallback(function () {
        if (onFocus && !disabled) {
            onFocus(item);
        }
    }, [disabled, item, onFocus]);
    return (React.createElement(CommandButton, { id: id, "data-index": index, "data-is-focusable": true, disabled: disabled, className: css(className, (_a = {},
            _a['' + cellIsSelectedStyle] = selected,
            _a['' + cellDisabledStyle] = disabled,
            _a)), onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onFocus: handleFocus, role: role, "aria-selected": selected, ariaLabel: label, title: label, getClassNames: getClassNames }, onRenderItem(item)));
};
//# sourceMappingURL=ButtonGridCell.js.map