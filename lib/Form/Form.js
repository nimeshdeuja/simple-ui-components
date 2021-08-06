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
import React from 'react';
import './simpleForm.css';
import './simpleForm-default.css';
import './simpleForm-outline.css';
import Autocomplete from '../Autocomplete/Autocomplete';
import File from '../File/File';
var showHidePassword = function (event) {
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
                eyeIcon.classList.remove('slash');
            }
            else {
                eyeIcon.classList.add('slash');
            }
        }
    }
};
export var SimplePreventAlphabet = function (e) {
    if (e.keyCode === 69)
        e.preventDefault();
};
export var SimpleOnBlur = function (event) {
    if (event.target.value.length > 0) {
        event.target.classList.add("focused");
    }
    else {
        event.target.classList.remove("focused");
    }
};
export var Message = function (_a) {
    var errors = _a.errors, name = _a.name;
    if (!name || !errors || !errors[name])
        return null;
    return _jsx("span", __assign({ className: "error" }, { children: errors[name].message }), void 0);
};
export var Form = function (_a) {
    var className = _a.className, layout = _a.layout, size = _a.size, onSubmit = _a.onSubmit, children = _a.children;
    var myClass = className ? className : '';
    return _jsx("form", __assign({ autoComplete: "off", onSubmit: onSubmit, className: layout + " " + size + " " + myClass }, { children: children }), void 0);
};
export var InputGroup = React.forwardRef(function (_a, ref) {
    var className = _a.className, type = _a.type, name = _a.name, icon = _a.icon, errors = _a.errors, placeholder = _a.placeholder, inputElement = _a.inputElement, children = _a.children;
    var myClass = className ? className : '';
    var MessageElement = _jsx(Message, { errors: errors, name: name }, void 0);
    var labelClass = 'placeholder';
    if (type === 'textarea') {
        labelClass = 'placeholder-textarea';
    }
    else if (type === 'select') {
        labelClass = 'placeholder-select';
    }
    var labelElement = placeholder && _jsx("label", __assign({ htmlFor: name, className: labelClass }, { children: placeholder }), void 0);
    var eClass = 'radio-col';
    if (type === 'radio-row') {
        eClass = 'radio-row';
    }
    else if (type === 'checkbox') {
        eClass = 'check';
    }
    var errorClass = (errors && name && errors[name] ? 'error' : '') + " " + eClass;
    switch (type) {
        case 'textarea':
            var textAteaElement = children;
            if (inputElement)
                textAteaElement = _jsx("textarea", __assign({}, inputElement, { ref: ref, onKeyUp: SimpleOnBlur }), void 0);
            return _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [textAteaElement, labelElement, MessageElement] }), void 0);
        case 'date':
            return _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [_jsxs("div", __assign({ className: "focused holder withIcon" }, { children: [children, _jsx("div", __assign({ className: "buttonBg" }, { children: _jsx("i", { className: "simple-calendar" }, void 0) }), void 0)] }), void 0), labelElement, MessageElement] }), void 0);
        case 'password':
            return _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [_jsxs("div", __assign({ className: "holder withIcon" }, { children: [_jsx("div", __assign({ className: "buttonBgNoEvent", id: inputElement.id + "showHide", onClick: showHidePassword }, { children: _jsx("div", __assign({ className: "showHide eye" }, { children: _jsx("div", {}, void 0) }), void 0) }), void 0), _jsx("input", __assign({ type: 'password' }, inputElement, { ref: ref, onBlur: SimpleOnBlur }), void 0), labelElement] }), void 0), MessageElement] }), void 0);
        case 'select':
            var selectElement = children;
            if (inputElement) {
                var selectOptions = inputElement.options && inputElement.options.map(function (item, index) { return _jsx("option", __assign({ value: item.value }, { children: item.label }), index); });
                selectElement = _jsx("select", __assign({ name: name, ref: ref }, inputElement, { children: selectOptions }), void 0);
            }
            return _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [_jsxs("div", __assign({ className: "holder" }, { children: [_jsx("span", { className: "arrow" }, void 0), selectElement] }), void 0), labelElement, MessageElement] }), void 0);
        case 'radio':
        case 'radio-row':
            var radioElement = children;
            if (inputElement) {
                radioElement = inputElement.options && inputElement.options.map(function (item, index) { return _jsxs("label", { children: [_jsx("input", __assign({ name: name, type: "radio" }, inputElement, { value: item.value }), void 0), item.label] }, index); });
            }
            return _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [placeholder && _jsx("span", __assign({ className: 'title' }, { children: placeholder }), void 0), _jsx("div", __assign({ className: errorClass }, { children: radioElement }), void 0)] }), void 0);
        case 'checkbox':
            var checkBoxElement = children;
            if (inputElement) {
                checkBoxElement = _jsxs("label", { children: [_jsx("input", __assign({ name: name, type: type }, inputElement), void 0), inputElement.label] }, void 0);
            }
            return _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [placeholder && _jsx("span", __assign({ className: 'title' }, { children: placeholder }), void 0), _jsx("div", __assign({ className: errorClass }, { children: checkBoxElement }), void 0)] }), void 0);
        case 'autocomplete':
            var autocompleteElement = children;
            if (inputElement) {
                autocompleteElement = _jsx(Autocomplete, __assign({}, inputElement, { ref: ref }), void 0);
            }
            return _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [_jsxs("div", __assign({ className: "focused holder autocomplete" }, { children: [autocompleteElement, _jsx("span", { className: "arrow" }, void 0)] }), void 0), labelElement, MessageElement] }), void 0);
        case 'file':
            var file = children;
            if (inputElement) {
                file = _jsx(File, __assign({}, inputElement, { ref: ref }), void 0);
            }
            return _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [placeholder && _jsx("span", __assign({ className: 'title' }, { children: placeholder }), void 0), _jsx("div", __assign({ className: "holder file" }, { children: file }), void 0), MessageElement] }), void 0);
        default:
            var element = children;
            if (inputElement) {
                element = _jsx("input", __assign({}, inputElement, { ref: ref, onBlur: SimpleOnBlur }), void 0);
                if (inputElement.type && inputElement.type === 'number')
                    element = _jsx("input", __assign({}, inputElement, { ref: ref, onBlur: SimpleOnBlur, onKeyDown: SimplePreventAlphabet }), void 0);
            }
            var toReturn = _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [element, labelElement, MessageElement] }), void 0);
            if (icon) {
                toReturn = _jsxs("div", __assign({ className: "inputField " + myClass }, { children: [_jsxs("div", __assign({ className: "holder withIcon" }, { children: [_jsx("div", __assign({ className: "buttonBg" }, { children: icon }), void 0), element, labelElement] }), void 0), MessageElement] }), void 0);
            }
            return toReturn;
    }
});
//# sourceMappingURL=Form.js.map