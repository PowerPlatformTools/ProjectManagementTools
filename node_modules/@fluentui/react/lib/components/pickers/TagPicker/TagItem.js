import { __assign } from "tslib";
import * as React from 'react';
import { styled, classNamesFunction } from '../../../Utilities';
import { IconButton } from '../../../Button';
import { getStyles } from './TagItem.styles';
import { useId } from '@fluentui/react-hooks';
var getClassNames = classNamesFunction();
/**
 * {@docCategory TagPicker}
 */
export var TagItemBase = function (props) {
    var theme = props.theme, styles = props.styles, selected = props.selected, disabled = props.disabled, enableTagFocusInDisabledPicker = props.enableTagFocusInDisabledPicker, children = props.children, className = props.className, index = props.index, onRemoveItem = props.onRemoveItem, removeButtonAriaLabel = props.removeButtonAriaLabel, _a = props.title, title = _a === void 0 ? typeof props.children === 'string' ? props.children : props.item.name : _a;
    var classNames = getClassNames(styles, {
        theme: theme,
        className: className,
        selected: selected,
        disabled: disabled,
    });
    var itemId = useId();
    var disabledAttrs = enableTagFocusInDisabledPicker
        ? {
            'aria-disabled': disabled,
            tabindex: 0,
        }
        : {
            disabled: disabled,
        };
    return (React.createElement("div", { className: classNames.root, role: 'listitem', key: index },
        React.createElement("span", { className: classNames.text, title: title, id: itemId + "-text" }, children),
        React.createElement(IconButton, __assign({ id: itemId, onClick: onRemoveItem }, disabledAttrs, { iconProps: { iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }, className: classNames.close, ariaLabel: removeButtonAriaLabel, "aria-labelledby": itemId + " " + itemId + "-text", "data-selection-index": index }))));
};
export var TagItem = styled(TagItemBase, getStyles, undefined, {
    scope: 'TagItem',
});
//# sourceMappingURL=TagItem.js.map