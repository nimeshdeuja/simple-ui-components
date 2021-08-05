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
import React from "react";
import "./tooltip.css";
export var position = function (placement) { return ({
    current: placement,
    opposite: function () {
        if (this.current === "left") {
            return "right";
        }
        else if (this.current === "right") {
            return "left";
        }
        else if (this.current === "top") {
            return "bottom";
        }
        else if (this.current === "bottom") {
            return "top";
        }
        else {
            return this.current;
        }
    },
    isHorizontal: function () {
        return this.current === "left" || this.current === "right";
    },
    isVertical: function () {
        return this.current === "top" || this.current === "bottom";
    },
}); };
var point = function () { return ({
    x: 0,
    y: 0,
    reset: function (p) {
        this.x = p.x;
        this.y = p.y;
    },
    restrictRect: function (rect) {
        if (this.x < rect.l)
            this.x = rect.l;
        else if (this.x > rect.r)
            this.x = rect.r;
        if (this.y < rect.t)
            this.y = rect.t;
        else if (this.y > rect.b)
            this.y = rect.y;
    },
}); };
var getArrowPoint = function (placement, content, arrow) {
    switch (placement) {
        case "left":
            arrow.style.top = (content.offsetHeight - arrow.offsetHeight) / 2 + "px";
            arrow.style.left = content.offsetWidth + "px";
            break;
        case "right":
            arrow.style.top = (content.offsetHeight - arrow.offsetHeight) / 2 + "px";
            arrow.style.right = content.offsetWidth + "px";
            break;
        case "bottom":
            arrow.style.bottom = content.offsetHeight + "px";
            arrow.style.left = (content.offsetWidth - arrow.offsetWidth) / 2 + "px";
            break;
        default:
            arrow.style.top = content.offsetHeight + "px";
            arrow.style.left = (content.offsetWidth - arrow.offsetWidth) / 2 + "px";
            break;
    }
    arrow.className = "";
    arrow.classList.add("simple-arrow-" + placement);
};
var getPoints = function (el, tt, placement, space) {
    var arrow = document.getElementById("simple-arrow");
    var recurCounter = 0;
    var pt = point();
    var bdys = {
        l: space,
        t: space,
        r: document.body.clientWidth - (tt.clientWidth + space),
        b: window.innerHeight - (tt.clientHeight + space),
    };
    var elRect = el.getBoundingClientRect();
    return (function recursive(placement) {
        recurCounter++;
        var pos = position(placement);
        switch (pos.current) {
            case "left":
                pt.x = elRect.left - (tt.offsetWidth + space);
                pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
                break;
            case "right":
                pt.x = elRect.right + space;
                pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
                break;
            case "top":
                pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
                pt.y = elRect.top - (tt.offsetHeight + space);
                break;
            default:
                pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
                pt.y = elRect.bottom + space;
        }
        if (recurCounter < 2) {
            if ((pos.isHorizontal() && (pt.x < bdys.l || pt.x > bdys.r)) ||
                (pos.isVertical() && (pt.y < bdys.t || pt.y > bdys.b))) {
                pt.reset(recursive(pos.opposite()));
                getArrowPoint(pos.opposite(), tt, arrow);
            }
            else {
                getArrowPoint(pos.current, tt, arrow);
            }
        }
        pt.restrictRect(bdys);
        return pt;
    })(placement);
};
export var Tooltip = function (_a) {
    var text = _a.text, _b = _a.placement, placement = _b === void 0 ? "top" : _b, _c = _a.space, space = _c === void 0 ? 10 : _c, children = _a.children, _d = _a.disabled, disabled = _d === void 0 ? false : _d;
    var handleMOver = function (e) {
        var content = document.getElementById("simple-tooltip");
        content.removeAttribute('class');
        content.innerHTML = text + " <span id='simple-arrow' class='simple-arrow-" + placement + "'></span>";
        content.classList.add("simple-tooltip");
        var _a = getPoints(e.currentTarget, content, placement, space), x = _a.x, y = _a.y;
        content.style.left = x + "px";
        content.style.top = y + "px";
        content.style.visibility = "visible";
    };
    var handleMOut = function () {
        var content = document.getElementById("simple-tooltip");
        content.style.visibility = "hidden";
    };
    if (disabled)
        return _jsx("span", { children: children }, void 0);
    return React.cloneElement(_jsx("span", { children: children }, void 0), {
        onMouseOver: handleMOver,
        onMouseOut: handleMOut,
    });
};
export var TooltipContainer = function () {
    return (_jsx("span", __assign({ id: "simple-tooltip" }, { children: _jsx("span", { id: "simple-arrow" }, void 0) }), void 0));
};
//# sourceMappingURL=Tooltip.js.map