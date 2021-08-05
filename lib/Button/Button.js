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
import { jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Button.module.css";
var Button = function (_a) {
    var className = _a.className, _b = _a.theme, theme = _b === void 0 ? 'primary' : _b, type = _a.type, clicked = _a.clicked, icon = _a.icon, text = _a.text, fullWidth = _a.fullWidth, style = _a.style;
    var classes = styles.button + " " + styles[theme];
    if (className)
        classes = styles.button + " " + styles[theme] + " " + className + " " + (fullWidth ? styles.fullWidth : '');
    return _jsxs("button", __assign({ className: classes, type: type, onClick: clicked, disabled: theme === 'disabled', "data-testid": 'test', style: style }, { children: [icon, text] }), void 0);
};
export default Button;
//# sourceMappingURL=Button.js.map