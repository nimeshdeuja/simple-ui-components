import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { InsertAfter } from "../Utility/Utility";
var File = function (_a) {
    var id = _a.id, _b = _a.labelText, labelText = _b === void 0 ? 'Upload' : _b, feedbackText = _a.feedbackText, Uploaded = _a.Uploaded, _c = _a.format, format = _c === void 0 ? 'file' : _c, _d = _a.clear, clear = _d === void 0 ? true : _d;
    var fileUploaderClickHandler = function () {
        var uploader = document.getElementById(id + "-uploader");
        uploader.click();
    };
    var clearFeedback = function () {
        var feedback = document.getElementById(id + "-feedback");
        if (feedback)
            feedback.remove();
    };
    var clearHandler = function () {
        var oldInput = document.getElementById(id + "-uploader");
        oldInput.value = '';
        clearFeedback();
        Uploaded(null);
    };
    var generateFeedback = function (file) {
        var uploader = document.getElementById(id + "-uploader");
        clearFeedback();
        if (file) {
            var newFeedback = document.createElement('div');
            newFeedback.id = id + "-feedback";
            newFeedback.classList.add('feedback');
            if (clear) {
                var clearIcon = document.createElement('span');
                clearIcon.classList.add('clear');
                clearIcon.innerHTML = 'X';
                clearIcon.addEventListener('click', clearHandler);
                newFeedback.appendChild(clearIcon);
            }
            var msg = document.createElement('span');
            if (feedbackText) {
                if (typeof (feedbackText) === "string") {
                    msg.innerHTML = feedbackText + ": <u><b>" + file.name + "</b></u>.";
                }
                else {
                    msg.innerHTML = "" + feedbackText(file.name);
                }
            }
            else {
                msg.innerHTML = "File: <u><b>" + file.name + "</b></u>.";
            }
            newFeedback.appendChild(msg);
            if (uploader)
                InsertAfter(newFeedback, uploader);
        }
    };
    var changeHandler = function (event) {
        if (event) {
            var reader = new FileReader();
            var target = event.target;
            var files = target.files;
            if (files) {
                var file_1 = files[0];
                reader.readAsDataURL(file_1);
                reader.addEventListener('load', function (event) {
                    if (event && event.target && event.loaded === event.total) {
                        generateFeedback(file_1);
                        if (format === 'base64') {
                            var base64 = JSON.stringify(event.target.result);
                            base64 = base64.replace("data:" + file_1.type + ";base64,", "");
                            Uploaded(base64);
                        }
                        else {
                            Uploaded(file_1);
                        }
                    }
                });
            }
        }
    };
    return _jsxs(_Fragment, { children: [_jsx("input", { id: id + "-button", type: 'button', className: 'uploadFile', value: labelText, onClick: fileUploaderClickHandler }, void 0), _jsx("input", { type: "file", id: id + "-uploader", hidden: true, onChange: changeHandler }, void 0)] }, void 0);
};
export default File;
//# sourceMappingURL=File.js.map