import { __assign } from "tslib";
import * as React from 'react';
import { CustomizerContext, getNativeElementProps, omit } from '@fluentui/utilities';
import { ThemeContext } from './ThemeContext';
export var renderThemeProvider = function (state) {
    var theme = state.theme, customizerContext = state.customizerContext;
    var Root = state.as || 'div';
    var rootProps = typeof state.as === 'string' ? getNativeElementProps(state.as, state) : omit(state, ['as']);
    return (React.createElement(ThemeContext.Provider, { value: theme },
        React.createElement(CustomizerContext.Provider, { value: customizerContext },
            React.createElement(Root, __assign({}, rootProps)))));
};
//# sourceMappingURL=renderThemeProvider.js.map