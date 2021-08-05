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
import { Dialog, DialogBody, DialogFooter } from './Dialog';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
afterEach(cleanup);
describe('Dialog box test', function () {
    describe('Dialog HTML test', function () {
        it('Dialog HTML', function () {
            var testFunction = jest.fn();
            render(_jsx(Dialog, __assign({ close: testFunction, title: 'My Dialog', theme: 'danger', size: 'lg', open: true, className: 'myClass' }, { children: "Test" }), void 0));
            var wrapper = screen.getByTestId('test-wrapper');
            var content = screen.getByTestId('test-content');
            var title = screen.getByTestId('test-title');
            expect(wrapper).toBeTruthy();
            expect(wrapper.className).toContain('myClass');
            expect(wrapper.className).toContain('modal');
            expect(wrapper).toHaveProperty('title', 'My Dialog');
            fireEvent.click(wrapper);
            expect(testFunction).toBeCalled();
            expect(content).toBeTruthy();
            expect(content.className).toContain('modalContent');
            expect(content.className).toContain('danger');
            expect(content.className).toContain('lg');
            expect(content.className).not.toContain('md');
            expect(title).toBeTruthy();
            expect(title.innerHTML).toBe('My Dialog <span>×</span>');
        });
    });
    describe('Dialog body HTML test', function () {
        it('Body HTML', function () {
            render(_jsx(DialogBody, __assign({ className: 'myClass' }, { children: "body content" }), void 0));
            var body = screen.getByTestId('test-body');
            expect(body).toBeTruthy();
            expect(body.className).toContain('main');
            expect(body.className).toContain('myClass');
            expect(body.innerHTML).toBe('body content');
        });
    });
    describe('Dialog footer HTML test', function () {
        it('Footer HTML', function () {
            render(_jsx(DialogFooter, __assign({ multiple: 'single', className: 'myClass' }, { children: "footer content" }), void 0));
            var footer = screen.getByTestId('test-footer');
            expect(footer).toBeTruthy();
            expect(footer.className).toContain('footer');
            expect(footer.className).toContain('single');
            expect(footer.className).toContain('myClass');
            expect(footer.innerHTML).toBe('footer content');
        });
    });
});
//# sourceMappingURL=Dialog.test.js.map