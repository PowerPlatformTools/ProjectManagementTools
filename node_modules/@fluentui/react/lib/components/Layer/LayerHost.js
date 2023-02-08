import { __assign } from "tslib";
import * as React from 'react';
import { css } from '../../Utilities';
import { notifyHostChanged } from './Layer.notification';
export var LayerHost = function (props) {
    var id = props.id, className = props.className;
    React.useEffect(function () {
        notifyHostChanged(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first render
    }, []);
    useUnmount(function () {
        notifyHostChanged(id);
    });
    return React.createElement("div", __assign({}, props, { className: css('ms-LayerHost', className) }));
};
var useUnmount = function (unmountFunction) {
    var unmountRef = React.useRef(unmountFunction);
    unmountRef.current = unmountFunction;
    React.useEffect(function () { return function () {
        if (unmountRef.current) {
            unmountRef.current();
        }
    }; }, []);
};
//# sourceMappingURL=LayerHost.js.map