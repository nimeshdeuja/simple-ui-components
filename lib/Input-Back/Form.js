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
import { jsx as _jsx } from "react/jsx-runtime";
;
export var Form = function (_a) {
    var _b = _a.layout, layout = _b === void 0 ? 'default' : _b, submit = _a.submit, _c = _a.className, className = _c === void 0 ? "" : _c, children = _a.children;
    var submitClickHandler = function (event) {
        event.preventDefault();
        submit();
    };
    return _jsx("form", __assign({ onSubmit: submitClickHandler, className: "simple-form " + layout + " " + className, autoComplete: "Off", "data-testid": 'form' }, { children: children }), void 0);
};
// Form validation
export var CheckValidity = function (value, rules) {
    var isValid = true;
    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value !== "" && isValid;
        if (rules.checkbox) {
            isValid = value && isValid;
        }
        else if (!rules.isNumeric) {
            isValid = value !== "" && isValid;
        }
    }
    if (rules.min) {
        isValid = value.length >= rules.min && isValid;
    }
    if (rules.max) {
        isValid = value.length <= rules.max && isValid;
    }
    if (rules.minVal) {
        if (rules.isNumeric) {
            value = value.replaceAll(",", ".");
        }
        isValid = value >= rules.minVal && isValid;
    }
    if (rules.maxVal) {
        if (rules.isNumeric) {
            value = value.replaceAll(",", ".");
        }
        isValid = value <= rules.maxVal && isValid;
    }
    if (rules.isEmail) {
        var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
};
//# sourceMappingURL=Form.js.map