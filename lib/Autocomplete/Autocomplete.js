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
import './Autocomplete.css';
import { ShortArray, InsertAfter } from '../Utility/Utility';
var simpleObj = {};
var Autocomplete = function (_a) {
    var list = _a.list, id = _a.id, change = _a.change, selected = _a.selected, _b = _a.placeholder, placeholder = _b === void 0 ? 'Select' : _b, _c = _a.inputPlaceholder, inputPlaceholder = _c === void 0 ? 'Search' : _c, _d = _a.emptyText, emptyText = _d === void 0 ? 'List is empty' : _d, _e = _a.multiple, multiple = _e === void 0 ? true : _e, _f = _a.clear, clear = _f === void 0 ? false : _f, _g = _a.selectedCallback, selectedCallback = _g === void 0 ? false : _g;
    var changeHandler = function () { return change(simpleObj[id].selected); };
    if (selected && !simpleObj[id]) {
        simpleObj[id] = {};
        simpleObj[id].selected = selected;
        if (selectedCallback)
            changeHandler();
    }
    var clearAllHide = function (type) {
        var clearAllElement = document.getElementById(id + 'clearAll');
        if (clear && simpleObj[id] && simpleObj[id].selected) {
            if (type === 'hide') {
                if (simpleObj[id].selected.length === 0)
                    clearAllElement.classList.add('hide');
            }
            else {
                if (simpleObj[id].selected.length > 0)
                    clearAllElement.classList.remove('hide');
            }
        }
    };
    var deleteClickEvent = function (clicked) {
        var selected = [];
        if (simpleObj[id])
            selected = simpleObj[id].selected;
        // filter selected list
        if (!simpleObj[id].selected)
            simpleObj[id].selected = [];
        var listForSelected = [];
        if (selected.length > 0) {
            for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
                var select = selected_1[_i];
                if (select.id !== clicked.id) {
                    listForSelected.push(select);
                }
            }
        }
        if (simpleObj[id] && simpleObj[id].selected)
            simpleObj[id].selected = listForSelected;
        selectedOption();
        // filter option list
        simpleObj[id] && simpleObj[id].list && simpleObj[id].list.push(clicked);
        optionList();
        clearAllHide('hide');
        changeHandler();
    };
    var generateClearAllIcon = function () {
        var element = document.getElementById(id + 'clearAll');
        if (!element) {
            var searchBox = document.getElementById(id + 'search');
            if (clear) {
                var clearAllElement = document.createElement('span');
                clearAllElement.classList.add('clearAll');
                if (simpleObj[id] && simpleObj[id].selected && simpleObj[id].selected.length === 0) {
                    clearAllElement.classList.add('hide');
                }
                clearAllElement.setAttribute('id', id + 'clearAll');
                clearAllElement.innerHTML = 'X';
                clearAllElement.addEventListener('click', clearAllHandler);
                if (searchBox)
                    InsertAfter(clearAllElement, searchBox);
            }
        }
    };
    var selectClickEvent = function (clicked) {
        var fullList = [];
        var list = [];
        if (simpleObj[id]) {
            fullList = simpleObj[id].fullList;
            list = simpleObj[id].list;
        }
        // filter selected list
        if (!simpleObj[id].selected)
            simpleObj[id].selected = [];
        if (multiple) {
            simpleObj[id].selected.push(clicked);
        }
        else {
            simpleObj[id].selected = [clicked];
        }
        selectedOption();
        // filter options list
        if (!simpleObj[id].list)
            simpleObj[id].list = [];
        var listForOption = [];
        if (multiple) {
            if (list.length > 0) {
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var option = list_1[_i];
                    if (option.id !== clicked.id) {
                        listForOption.push(option);
                    }
                }
            }
        }
        else {
            if (fullList.length > 0) {
                for (var _a = 0, fullList_1 = fullList; _a < fullList_1.length; _a++) {
                    var option = fullList_1[_a];
                    if (option.id !== clicked.id) {
                        listForOption.push(option);
                    }
                }
            }
        }
        simpleObj[id].list = listForOption;
        optionList();
        generateClearAllIcon();
        clearAllHide('add');
        changeHandler();
    };
    var selectedOption = function () {
        var selectedElement = document.getElementById(id + 'selected');
        selectedElement.innerHTML = '';
        var selected = [];
        if (simpleObj && simpleObj[id])
            selected = simpleObj[id].selected;
        var ulElement = document.createElement("ul");
        if (selected.length > 0) {
            var _loop_1 = function (item) {
                var liElement = document.createElement("li");
                liElement.classList.add('selected');
                liElement.setAttribute('data-testid', 'test-selected-li');
                if (!multiple)
                    liElement.classList.add('single');
                if (item.icon) {
                    var iconWrapper = document.createElement("div");
                    if (item.color)
                        iconWrapper.style.backgroundColor = item.color;
                    var iconElement = document.createElement("img");
                    iconElement.setAttribute('src', item.icon);
                    iconElement.setAttribute('alt', item.label);
                    iconWrapper.append(iconElement);
                    liElement.append(iconWrapper);
                }
                liElement.append(item.label);
                if (multiple)
                    liElement.addEventListener("click", function () { return deleteClickEvent(item); });
                ulElement.append(liElement);
            };
            for (var _i = 0, selected_2 = selected; _i < selected_2.length; _i++) {
                var item = selected_2[_i];
                _loop_1(item);
            }
        }
        else {
            var liElement = document.createElement("li");
            liElement.classList.add('notSelected');
            liElement.setAttribute('data-testid', 'test-selected-li');
            liElement.innerText = "" + placeholder;
            ulElement.append(liElement);
        }
        selectedElement.append(ulElement);
    };
    var generateEmpty = function () {
        var emptyElement = document.createElement("li");
        emptyElement.setAttribute('data-testid', 'test-search-list-li');
        emptyElement.classList.add('isEmpty');
        emptyElement.innerText = emptyText;
        return emptyElement;
    };
    var optionList = function () {
        var listElement = document.getElementById(id + 'list');
        listElement.innerHTML = '';
        var list = [];
        if (simpleObj[id].list)
            list = simpleObj[id].list;
        if (list.length > 0)
            list = ShortArray(list, "ASC", "label");
        var ulElement = document.createElement("ul");
        if (list && list.length > 0) {
            if (simpleObj[id].input) {
                list = list.filter(function (_a) {
                    var label = _a.label;
                    var search = simpleObj[id].input;
                    search = search.toUpperCase();
                    var text = label.toUpperCase();
                    return text.includes(search);
                });
            }
            if (list.length > 0) {
                var _loop_2 = function (item) {
                    var liElement = document.createElement("li");
                    liElement.setAttribute('data-testid', 'test-search-list-li');
                    if (item.icon) {
                        var iconWrapper = document.createElement("div");
                        if (item.color)
                            iconWrapper.style.backgroundColor = item.color;
                        var iconElement = document.createElement("img");
                        iconElement.setAttribute('src', item.icon);
                        iconElement.setAttribute('alt', item.label);
                        iconWrapper.append(iconElement);
                        liElement.append(iconWrapper);
                    }
                    liElement.append(item.label);
                    liElement.addEventListener("click", function () { return selectClickEvent(item); });
                    ulElement.append(liElement);
                };
                for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                    var item = list_2[_i];
                    _loop_2(item);
                }
            }
            else {
                ulElement.append(generateEmpty());
            }
        }
        else {
            ulElement.append(generateEmpty());
        }
        listElement.append(ulElement);
    };
    var closeOption = function () {
        var searchBox = document.getElementById(id + 'search');
        var inputElement = document.getElementById(id);
        var blanketElement = document.getElementById(id + 'blanket');
        searchBox.style.display = 'none';
        blanketElement.remove();
        inputElement.value = '';
        simpleObj[id].input = '';
    };
    var generateBlanket = function () {
        var divElement = document.createElement("div");
        var blanketE = document.getElementById(id + "blanket");
        var searchBox = document.getElementById(id + "search");
        if (!blanketE) {
            divElement.classList.add('blanket');
            divElement.setAttribute("id", id + "blanket");
            divElement.addEventListener("click", function () { return closeOption(); });
            if (searchBox)
                InsertAfter(divElement, searchBox);
        }
    };
    var filterOptionsList = function () {
        var selectedItem = [];
        if (simpleObj[id].selected)
            selectedItem = simpleObj[id].selected;
        if (selectedItem && selectedItem.length > 0 && selectedItem.length < list.length) {
            return list.filter(function (elem) { return !selectedItem.find(function (_a) {
                var id = _a.id;
                return elem.id === id;
            }); });
        }
        else if (selectedItem && selectedItem.length === list.length) {
            return [];
        }
        return list;
    };
    var clickHandler = function () {
        if (!simpleObj[id])
            simpleObj[id] = {};
        simpleObj[id].fullList = list;
        // UnHide Search Box
        var searchBox = document.getElementById(id + 'search');
        searchBox.style.display = 'block';
        // generate Blanket
        generateBlanket();
        var inputElement = document.getElementById(id);
        inputElement.focus();
        simpleObj[id].list = filterOptionsList();
        optionList();
    };
    var filterSearch = function (event) {
        simpleObj[id].input = event.target.value;
        optionList();
    };
    var clearAllHandler = function () {
        simpleObj[id].selected = [];
        selectedOption();
        simpleObj[id].list = list;
        optionList();
        changeHandler();
        clearAllHide('hide');
    };
    var selectedElement = _jsx("li", __assign({ className: 'notSelected', "data-testid": 'test-selected-li' }, { children: placeholder }), void 0);
    if (selected && simpleObj[id] && simpleObj[id].selected && simpleObj[id].selected.length > 0) {
        selectedElement = simpleObj[id].selected.map(function (item, i) {
            var iconE = _jsx("div", { children: _jsx("img", { src: item.icon }, void 0) }, void 0);
            if (item.color)
                iconE = _jsx("div", __assign({ style: { backgroundColor: item.color } }, { children: _jsx("img", { src: item.icon }, void 0) }), void 0);
            return _jsxs("li", __assign({ "data-testid": 'test-selected-li', className: "selected " + (multiple ? '' : 'single'), onClick: function () { return multiple && deleteClickEvent(item); } }, { children: [item.icon && iconE, item.label] }), i);
        });
    }
    if (simpleObj[id] && simpleObj[id].selected && simpleObj[id].selected.length > 0)
        generateClearAllIcon();
    return (_jsxs(_Fragment, { children: [_jsx("div", __assign({ id: id + 'selected', "data-testid": 'test-selected', className: 'selected', onClick: clickHandler }, { children: _jsx("ul", __assign({ "data-testid": 'test-selected-ui' }, { children: selectedElement }), void 0) }), void 0), _jsxs("div", __assign({ className: 'search', id: id + 'search', "data-testid": 'test-search', style: { display: 'none' } }, { children: [_jsx("input", { type: 'text', placeholder: inputPlaceholder, id: id, "data-testid": 'test-search-input', onChange: filterSearch }, void 0), _jsx("div", { id: id + 'list', "data-testid": 'test-search-list' }, void 0)] }), void 0), clear && simpleObj[id] && simpleObj[id].selected && simpleObj[id].selected.length > 0 && _jsx("span", __assign({ id: id + 'clearAll', "data-testid": 'test-clearAll', className: 'clearAll', onClick: clearAllHandler }, { children: "X" }), void 0)] }, void 0));
};
export default Autocomplete;
//# sourceMappingURL=Autocomplete.js.map