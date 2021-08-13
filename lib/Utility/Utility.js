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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// obj = object, newObject = Update object and return new object
export var UpdateObject = function (obj, newObject) { return (__assign(__assign({}, obj), newObject)); };
// arr = array, newItem = add newItem to array and return new array
export var UpdateArray = function (arr, newItem) { return __spreadArray(__spreadArray([], arr), [
    newItem,
]); };
export var ShortArray = function (arr, type, sortBy) {
    if (arr.length === 0)
        return [];
    var orderArrays = function (curr, prev) {
        var current = curr;
        var pre = prev;
        if (typeof (curr) === "string" && typeof (prev) === "string") {
            current = curr.toUpperCase();
            pre = prev.toUpperCase();
        }
        if (current > pre) {
            return 1;
        }
        else if (current < pre) {
            return -1;
        }
        else {
            return 0;
        }
    };
    return arr.sort(function (a, b) {
        var curr, prev;
        if (typeof (a) === 'object' && typeof (b) === 'object' && sortBy) {
            if (!type || type && type === 'ASC') {
                curr = a[sortBy];
                prev = b[sortBy];
            }
            else {
                curr = b[sortBy];
                prev = a[sortBy];
            }
        }
        else if (typeof (a) === 'number' && typeof (b) === 'number' || typeof (a) === 'string' && typeof (b) === 'string') {
            if (!type || type && type === 'ASC') {
                curr = a;
                prev = b;
            }
            else {
                curr = b;
                prev = a;
            }
        }
        if (typeof (a) === 'object' && typeof (b) === 'object' && !sortBy) {
            return 0;
        }
        return orderArrays(curr, prev);
    });
};
// arr = array, indexBy = 'string' key name that you want to get indexOf, indexOf = 'string' value that you want to get index
export var GetIndexBy = function (arr, indexOf, indexBy) {
    var toReturn = -1;
    arr.forEach(function (item, index) {
        var toCompare = indexBy ? item[indexBy] : item;
        if (toCompare === indexOf) {
            toReturn = index;
        }
    });
    return toReturn;
};
// name = 'string' Full name
export var ShortNameGenerate = function (name) {
    var shortNameToReturn = "";
    if (name) {
        var splitName = name.split(" ").filter(function (item) { return item !== ""; });
        var splitNameLength = splitName.length;
        if (splitNameLength <= 1) {
            shortNameToReturn = name.substring(0, 2);
        }
        else {
            var firstName = splitName[0];
            var lastName = splitName[splitNameLength - 1];
            shortNameToReturn = firstName.substring(0, 1) + lastName.substring(0, 1);
        }
    }
    return shortNameToReturn.toUpperCase();
};
// Generate UUID 
export var GetUniqueId = function () {
    var UID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return UID;
};
export var InsertAfter = function (newElement, referenceElement) {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
};
//# sourceMappingURL=Utility.js.map