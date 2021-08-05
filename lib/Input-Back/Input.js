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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./form.css";
import "./form-default.css";
import "./form-outline.css";
var Input = function (_a) {
    var elementConfig = _a.elementConfig, elementType = _a.elementType, changed = _a.changed, value = _a.value, _b = _a.className, className = _b === void 0 ? "" : _b, invalid = _a.invalid, shouldValidate = _a.shouldValidate, touched = _a.touched, inputStyle = _a.inputStyle, _c = _a.autoComplete, autoComplete = _c === void 0 ? "Off-text" : _c;
    var inputStyleClass = (inputStyle === null || inputStyle === void 0 ? void 0 : inputStyle.width) ? inputStyle.width : "";
    var isFirstElement = (inputStyle === null || inputStyle === void 0 ? void 0 : inputStyle.isLast) ? "last" : "";
    var error = invalid && shouldValidate && touched ? "error" : "";
    var uploadImageHandler = function (event) {
        if (event.target.files && event.target.files.length > 0) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(event.target.files[0]);
            reader_1.addEventListener("load", function () {
                changed(reader_1.result);
            });
        }
    };
    var showHidePasswordHandler = function (event) {
        var elementId = event.currentTarget.id;
        var element = document.getElementById(elementId);
        var targetId = elementId.slice(0, -8);
        var targetElement = document.getElementById(targetId);
        if (targetElement && element) {
            var eyeIcon = element.getElementsByClassName('showHide')[0];
            var types = targetElement.getAttribute('type');
            targetElement.setAttribute('type', types === 'password' ? 'text' : 'password');
            if (eyeIcon) {
                if (types === "text") {
                    eyeIcon.classList.remove("slash");
                }
                else {
                    eyeIcon.classList.add("slash");
                }
            }
        }
    };
    var defaultInput = null;
    if (elementConfig && elementConfig.type === "password" && elementConfig.id) {
        defaultInput = (_jsxs("div", __assign({ className: "custom-field " + inputStyleClass + " " + isFirstElement + " " + className + " " + error, "data-testid": 'test-wrapper' }, { children: [_jsx("input", { type: "password", "data-testid": 'test-input', value: value, id: elementConfig.id, className: value.length > 0 ? "focused" : "", autoComplete: autoComplete, onChange: function (e) { return changed(e.target.value, e); }, onBlur: function (event) {
                        if (event.target.value.length > 0) {
                            event.target.classList.add("focused");
                        }
                        else {
                            event.target.classList.remove("focused");
                        }
                    } }, void 0), _jsx("span", __assign({ className: "placeholder", "data-testid": 'test-label' }, { children: elementConfig.placeholder }), void 0), elementConfig.showPassword && (_jsx("div", __assign({ className: "showHidePassword", id: elementConfig.id + "showHide", "data-testid": 'test-show-password', onClick: showHidePasswordHandler }, { children: _jsx("div", __assign({ className: 'showHide eye' }, { children: _jsx("div", {}, void 0) }), void 0) }), void 0))] }), void 0));
    }
    else if (elementConfig && elementConfig.type === "number") {
        defaultInput = (_jsxs("div", __assign({ className: "custom-field " + inputStyleClass + " " + isFirstElement + " " + className + " " + error, "data-testid": 'test-wrapper' }, { children: [_jsx("input", { type: "number", "data-testid": 'test-input', value: value, className: value.length > 0 ? "focused" : "", autoComplete: autoComplete, onKeyDown: function (e) {
                        if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === 'Dead') {
                            e.preventDefault();
                        }
                    }, onChange: function (e) { return changed(e.target.value, e); }, onBlur: function (event) {
                        if (event.target.value.length > 0) {
                            event.target.classList.add("focused");
                        }
                        else {
                            event.target.classList.remove("focused");
                        }
                    } }, void 0), _jsx("span", __assign({ className: "placeholder", "data-testid": 'test-label' }, { children: elementConfig.placeholder }), void 0)] }), void 0));
    }
    else {
        defaultInput = (_jsxs("div", __assign({ className: "custom-field " + inputStyleClass + " " + isFirstElement + " " + className + " " + error, "data-testid": 'test-wrapper' }, { children: [_jsx("input", { type: "text", value: value, "data-testid": 'test-input', className: value.length > 0 ? "focused" : "", autoComplete: autoComplete, onChange: function (e) { return changed(e.target.value, e); }, onBlur: function (event) {
                        if (event.target.value.length > 0) {
                            event.target.classList.add("focused");
                        }
                        else {
                            event.target.classList.remove("focused");
                        }
                    } }, void 0), _jsx("span", __assign({ className: "placeholder", "data-testid": 'test-label' }, { children: elementConfig.placeholder }), void 0)] }), void 0));
    }
    var inputElement = null;
    switch (elementType) {
        case "input":
            inputElement = defaultInput;
            break;
        case "textarea":
            inputElement = (_jsxs("div", __assign({ className: "custom-textarea " + inputStyleClass + " " + isFirstElement + " " + className + " " + error, "data-testid": 'test-wrapper' }, { children: [_jsx("textarea", { defaultValue: value, "data-testid": 'test-input', className: value.length > 0 ? "focused" : "", rows: elementConfig && elementConfig.rows ? elementConfig.rows : 4, onChange: function (e) { return changed(e.target.value, e); }, onBlur: function (event) {
                            if (event.target.value.length > 0) {
                                event.target.classList.add("focused");
                            }
                            else {
                                event.target.classList.remove("focused");
                            }
                        } }, void 0), _jsx("span", __assign({ className: "placeholder", "data-testid": 'test-label' }, { children: elementConfig.placeholder }), void 0)] }), void 0));
            break;
        case "select":
            inputElement = (_jsxs("div", __assign({ className: "custom-select " + inputStyleClass + " " + isFirstElement + " " + className + " " + error, "data-testid": 'test-wrapper' }, { children: [_jsxs("div", __assign({ className: "holder" }, { children: [_jsx("select", __assign({ onChange: function (e) { return changed(e.target.value, e); }, defaultValue: value, "data-testid": 'test-input' }, { children: elementConfig.options && elementConfig.options.map(function (item, index) { return (_jsx("option", __assign({ value: item.id, "data-testid": 'test-option' }, { children: item.name }), index)); }) }), void 0), _jsx("span", { className: "arrow", "data-testid": 'test-arrow' }, void 0)] }), void 0), _jsx("span", __assign({ className: "placeholder focused", "data-testid": 'test-label' }, { children: elementConfig.placeholder }), void 0)] }), void 0));
            break;
        case "checkbox":
            var ele = (_jsx("input", { name: "isGoing", type: "checkbox", "data-testid": 'test-input', checked: value, onChange: function (e) { return changed(e.target.checked, e); } }, void 0));
            var checkboxElement = (_jsxs(_Fragment, { children: [elementConfig.placeholder, ele] }, void 0));
            if (elementConfig && elementConfig.labelText === "right")
                checkboxElement = (_jsxs(_Fragment, { children: [ele, elementConfig.placeholder] }, void 0));
            inputElement = (_jsxs("div", __assign({ className: "custom-checkbox " + inputStyleClass + " " + isFirstElement + " " + className + " " + error, "data-testid": 'test-wrapper' }, { children: [elementConfig.label !== "" && (_jsx("span", __assign({ className: "title", "data-testid": 'test-top-title' }, { children: elementConfig.label }), void 0)), _jsx("label", __assign({ className: elementConfig.labelText, "data-testid": 'test-label' }, { children: checkboxElement }), void 0)] }), void 0));
            break;
        case "radio":
            inputElement = (_jsxs("div", __assign({ className: "custom-radio " + inputStyleClass + " " + isFirstElement + " " + className + " " + error, "data-testid": 'test-wrapper' }, { children: [_jsx("span", __assign({ className: "placeholder", "data-testid": 'test-top-title' }, { children: elementConfig.placeholder }), void 0), elementConfig && elementConfig.options &&
                        elementConfig.options.map(function (item, index) {
                            var ele = (_jsx("input", { type: "radio", "data-testid": 'test-input', name: item.name, value: item.value, checked: value === item.value, onChange: function (e) { return changed(e.target.value, e); } }, void 0));
                            var radioElement = (_jsxs(_Fragment, { children: [item.label, ele] }, void 0));
                            if (elementConfig && elementConfig.labelText === "right")
                                radioElement = (_jsxs(_Fragment, { children: [ele, item.label] }, void 0));
                            return (_jsx("label", __assign({ className: elementConfig.labelText, "data-testid": 'test-label' }, { children: radioElement }), index));
                        })] }), void 0));
            break;
        case "file":
            inputElement = (_jsx("div", __assign({ className: "custom-file " + inputStyleClass + " " + isFirstElement + " " + className + " " + error, "data-testid": 'test-wrapper' }, { children: _jsx("input", { type: "file", "data-testid": 'test-input', id: elementConfig.id, onChange: uploadImageHandler, className: 'fileUploader' }, void 0) }), void 0));
            break;
        default:
            inputElement = defaultInput;
    }
    return inputElement;
};
export default Input;
//# sourceMappingURL=Input.js.map