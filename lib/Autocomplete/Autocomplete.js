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
var Autocomplete = function (_a) {
    var list = _a.list, id = _a.id, change = _a.change, _b = _a.value, value = _b === void 0 ? [] : _b, _c = _a.placeholder, placeholder = _c === void 0 ? 'Select' : _c, _d = _a.inputPlaceholder, inputPlaceholder = _d === void 0 ? 'Search' : _d, _e = _a.emptyText, emptyText = _e === void 0 ? 'List is empty' : _e, _f = _a.multiple, multiple = _f === void 0 ? true : _f, _g = _a.clear, clear = _g === void 0 ? false : _g, _h = _a.selectedCallback, selectedCallback = _h === void 0 ? false : _h, secondaryOption = _a.secondaryOption;
    var current = {
        selected: value,
        list: list,
        fullList: list,
        search: '',
        counter: 0
    };
    var changeHandler = function () { return change(current.selected); };
    if (value && selectedCallback)
        changeHandler();
    var clearAllHide = function (type) {
        var clearAllElement = document.getElementById(id + 'clearAll');
        if (clear) {
            if (type === 'hide') {
                if (current.selected.length === 0)
                    clearAllElement.classList.add('hide');
            }
            else {
                if (current.selected.length > 0)
                    clearAllElement.classList.remove('hide');
            }
        }
    };
    var deleteClickEvent = function (clicked) {
        var listForSelected = [];
        if (current.selected.length > 0) {
            for (var _i = 0, _a = current.selected; _i < _a.length; _i++) {
                var select = _a[_i];
                if (select.id !== clicked.id) {
                    listForSelected.push(select);
                }
            }
        }
        current.selected = listForSelected;
        generateSelectedOption();
        // filter option list
        current.list.push(clicked);
        generateOptionList();
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
                if (current.selected.length === 0)
                    clearAllElement.classList.add('hide');
                clearAllElement.setAttribute('id', id + 'clearAll');
                clearAllElement.innerHTML = 'X';
                clearAllElement.addEventListener('click', clearAllHandler);
                if (searchBox)
                    InsertAfter(clearAllElement, searchBox);
            }
        }
    };
    var selectClickEvent = function (clicked) {
        if (multiple) {
            current.selected.push(clicked);
        }
        else {
            current.selected = [clicked];
            closeOptionOnBlanketClick();
        }
        generateSelectedOption();
        var listForOption = [];
        var currentList = current.fullList;
        if (multiple)
            currentList = current.list;
        if (currentList.length > 0) {
            for (var _i = 0, currentList_1 = currentList; _i < currentList_1.length; _i++) {
                var option = currentList_1[_i];
                if (option.id !== clicked.id) {
                    listForOption.push(option);
                }
            }
        }
        current.list = listForOption;
        generateOptionList();
        generateClearAllIcon();
        clearAllHide('add');
        changeHandler();
    };
    var generateSelectedOption = function () {
        var selectedElement = document.getElementById(id + 'selected');
        selectedElement.innerHTML = '';
        var ulElement = document.createElement("ul");
        if (current.selected.length > 0) {
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
                else {
                    liElement.classList.add('noIcon');
                }
                var spanElement = document.createElement("span");
                spanElement.append(item.label);
                if (secondaryOption) {
                    var spanElementSecondary = document.createElement("span");
                    spanElementSecondary.className = 'secondary';
                    spanElementSecondary.append(item[secondaryOption]);
                    spanElement.append(spanElementSecondary);
                }
                liElement.append(spanElement);
                if (multiple)
                    liElement.addEventListener("click", function () { return deleteClickEvent(item); });
                ulElement.append(liElement);
            };
            for (var _i = 0, _a = current.selected; _i < _a.length; _i++) {
                var item = _a[_i];
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
    var generateEmptyList = function () {
        var emptyElement = document.createElement("li");
        emptyElement.setAttribute('data-testid', 'test-search-list-li');
        emptyElement.classList.add('isEmpty');
        emptyElement.innerText = emptyText;
        return emptyElement;
    };
    var generateOptionList = function () {
        var listElement = document.getElementById(id + 'list');
        listElement.innerHTML = '';
        var list = current.list;
        list = ShortArray(list, "ASC", "label");
        var ulElement = document.createElement("ul");
        if (current.search) {
            list = list.filter(function (item) {
                var search = current.search;
                search = search.toUpperCase();
                var text = item.label.toUpperCase();
                var items = text.includes(search);
                if (!items && secondaryOption) {
                    var textSecondary = item[secondaryOption].toUpperCase();
                    items = textSecondary.includes(search);
                }
                return items;
            });
        }
        if (list.length > 0) {
            var _loop_2 = function (item) {
                var liElement = document.createElement("li");
                liElement.classList.add(id + "list-li");
                // liElement.classList.add(`active`)
                liElement.setAttribute('data-testid', 'test-search-list-li');
                liElement.setAttribute('id', "" + item.id);
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
                var spanElement = document.createElement("span");
                spanElement.append(item.label);
                if (secondaryOption) {
                    var spanElementSecondary = document.createElement("span");
                    spanElementSecondary.className = 'secondary';
                    spanElementSecondary.append(item[secondaryOption]);
                    spanElement.append(spanElementSecondary);
                }
                liElement.append(spanElement);
                liElement.addEventListener("click", function () { return selectClickEvent(item); });
                ulElement.append(liElement);
            };
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                _loop_2(item);
            }
        }
        else {
            ulElement.append(generateEmptyList());
        }
        listElement.append(ulElement);
    };
    var closeOptionOnBlanketClick = function () {
        var searchBox = document.getElementById(id + 'search');
        var inputElement = document.getElementById(id);
        var blanketElement = document.getElementById(id + 'blanket');
        searchBox.style.display = 'none';
        blanketElement.remove();
        inputElement.value = '';
        current.search = '';
    };
    var generateBlanket = function () {
        var divElement = document.createElement("div");
        var blanketE = document.getElementById(id + "blanket");
        var searchBox = document.getElementById(id + "search");
        if (!blanketE) {
            divElement.classList.add('blanket');
            divElement.setAttribute("id", id + "blanket");
            divElement.addEventListener("click", function () { return closeOptionOnBlanketClick(); });
            if (searchBox)
                InsertAfter(divElement, searchBox);
        }
    };
    var filterOptionsList = function () {
        if (current.selected.length < list.length) {
            return list.filter(function (elem) { return !current.selected.find(function (_a) {
                var id = _a.id;
                return elem.id === id;
            }); });
        }
        else if (current.selected.length === list.length) {
            return [];
        }
        return current.list;
    };
    var clickOpenListHandler = function () {
        // UnHide Search Box
        var searchBox = document.getElementById(id + 'search');
        searchBox.style.display = 'block';
        // generate Blanket
        generateBlanket();
        var inputElement = document.getElementById(id);
        inputElement.focus();
        /* inputElement.addEventListener('keydown', (e)=> {
            let items = document.querySelectorAll(`.${id}list-li`);
            if(e.key === 'ArrowDown'){
                if(current.counter === 0){
                    items[0].classList.add('active');
                    current.counter = 1;
                } else {
                    for (let i = 0; i < items.length-1; i++) {
                        if (items[i].classList.contains('active') === true) {
                            items[i].classList.remove('active');
                            items[i+1].classList.add('active');
                          break;
                        }
                      }
                }
                
            }
            if (e.key === 'ArrowUp') {
                if(current.counter === 0){
                    items[items.length - 1].classList.add('active');
                    current.counter = 1;
                } else {
                    for (let i = items.length - 1; i > 0; i--) {
                        if (items[i].classList.contains('active') === true) {
                            items[i].classList.remove('active');
                            items[i-1].classList.add('active');
                          break;
                        }
                      }
                }
              }

              if(e.key === 'Enter'){
                  for (let i = 0; i < items.length; i++){
                    if (items[i].classList.contains('active') === true) {
                        let selectedId = items[i].getAttribute('id');
                        let item = current.list.filter(item=>item.id === selectedId)
                        selectClickEvent(item[0]);
                        items[0].classList.add('active');
                      break;
                    }
                  }
              }
        });​​​​​​​ */
        if (current.selected.length > 0)
            current.list = filterOptionsList();
        generateOptionList();
    };
    var filterSearch = function (event) {
        current.search = event.target.value;
        generateOptionList();
    };
    var clearAllHandler = function () {
        current.selected = [];
        generateSelectedOption();
        current.list = list;
        generateOptionList();
        changeHandler();
        clearAllHide('hide');
    };
    if (current.selected.length > 0)
        generateClearAllIcon();
    return (_jsxs(_Fragment, { children: [_jsx("div", __assign({ id: id + 'selected', "data-testid": 'test-selected', className: 'selected', onClick: clickOpenListHandler }, { children: _jsx("ul", __assign({ "data-testid": 'test-selected-ui' }, { children: current.selected.length > 0 ? current.selected.map(function (item, i) {
                        var iconE = _jsx("div", { children: _jsx("img", { src: item.icon }, void 0) }, void 0);
                        if (item.color)
                            iconE = _jsx("div", __assign({ style: { backgroundColor: item.color } }, { children: _jsx("img", { src: item.icon }, void 0) }), void 0);
                        return _jsxs("li", __assign({ "data-testid": 'test-selected-li', className: "selected " + (multiple ? '' : 'single') + " " + (!item.icon ? 'noIcon' : ''), onClick: function () { return multiple && deleteClickEvent(item); } }, { children: [item.icon && iconE, _jsxs("span", { children: [item.label, secondaryOption && _jsx("span", __assign({ className: 'secondary' }, { children: item[secondaryOption] }), void 0)] }, void 0)] }), i);
                    }) : _jsx("li", __assign({ className: 'notSelected', "data-testid": 'test-selected-li' }, { children: placeholder }), void 0) }), void 0) }), void 0), _jsxs("div", __assign({ className: 'search', id: id + 'search', "data-testid": 'test-search', style: { display: 'none' } }, { children: [_jsx("input", { type: 'text', placeholder: inputPlaceholder, id: id, "data-testid": 'test-search-input', onChange: filterSearch }, void 0), _jsx("div", { id: id + 'list', "data-testid": 'test-search-list' }, void 0)] }), void 0), clear && current.selected.length > 0 && _jsx("span", __assign({ id: id + 'clearAll', "data-testid": 'test-clearAll', className: 'clearAll', onClick: clearAllHandler }, { children: "X" }), void 0)] }, void 0));
};
export default Autocomplete;
//# sourceMappingURL=Autocomplete.js.map