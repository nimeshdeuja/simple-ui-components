var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import styles from "./Button.module.css";
var Button = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.theme, theme = _b === void 0 ? 'default' : _b, type = _a.type, clicked = _a.clicked, icon = _a.icon, text = _a.text, fullWidth = _a.fullWidth, style = _a.style, children = _a.children;
    var classes = styles.button + " " + styles[theme];
    if (className)
        classes = styles.button + " " + styles[theme] + " " + className + " " + (fullWidth ? styles.fullWidth : '');
    return _jsx("button", __assign({ className: classes, type: type, onClick: clicked, disabled: theme === 'disabled', "data-testid": 'test', style: style, ref: ref }, { children: children ? children : _jsxs(_Fragment, { children: [icon, text] }, void 0) }), void 0);
});
export default Button;
//# sourceMappingURL=Button.js.map