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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Dialog.module.css";
export var Dialog = function (_a) {
    var close = _a.close, title = _a.title, _b = _a.size, size = _b === void 0 ? 'md' : _b, _c = _a.theme, theme = _c === void 0 ? 'default' : _c, open = _a.open, _d = _a.className, className = _d === void 0 ? '' : _d, children = _a.children;
    var closeAllClickHandler = function (event) {
        if (event.target && event.target.title === title) {
            close();
        }
    };
    var dialogElement = null;
    if (open)
        dialogElement = (_jsx("div", __assign({ className: styles.modal + " " + className, onClick: closeAllClickHandler, title: title, "data-testid": 'test-wrapper' }, { children: _jsxs("div", __assign({ className: styles.modalContent + " " + styles[size] + " " + styles[theme], "data-testid": 'test-content' }, { children: [_jsxs("h2", __assign({ "data-testid": 'test-title' }, { children: [title, " ", _jsx("span", __assign({ onClick: function () { return close(); } }, { children: "\u00D7" }), void 0)] }), void 0), children] }), void 0) }), void 0));
    return dialogElement;
};
export var DialogBody = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, children = _a.children;
    return (_jsx("div", __assign({ className: styles.main + " " + className, "data-testid": 'test-body' }, { children: children }), void 0));
};
export var DialogFooter = function (_a) {
    var multiple = _a.multiple, _b = _a.className, className = _b === void 0 ? '' : _b, children = _a.children;
    return (_jsx("div", __assign({ className: styles.footer + " " + styles[multiple] + " " + className, "data-testid": 'test-footer' }, { children: children }), void 0));
};
//# sourceMappingURL=Dialog.js.map