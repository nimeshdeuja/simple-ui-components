import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
describe('Button overall testing', function () {
    it('Button with icon and theme', function () {
        render(_jsx(Button, { className: 'myClass', theme: 'danger', clicked: function () { }, type: 'submit', text: 'click' }, void 0));
        var btn = screen.getByTestId('test');
        expect(btn).toBeTruthy();
        expect(btn.className).toContain('danger');
        expect(btn.className).toContain('myClass');
        expect(btn.className).toContain('button');
        expect(btn.innerHTML).toBe('click');
        expect(btn).toHaveProperty('type', 'submit');
        expect(btn).not.toContain('</svg>');
    });
    it('Button without icon and theme', function () {
        render(_jsx(Button, { className: 'myClass', clicked: function () { }, type: 'submit', text: 'click' }, void 0));
        var btn = screen.getByText('click');
        expect(btn).not.toContain('<svg>');
        expect(btn.className).toContain('primary');
    });
    it('Button click functionality', function () {
        var buttonClicked = jest.fn();
        render(_jsx(Button, { clicked: buttonClicked, type: 'submit', text: 'click' }, void 0));
        var btn = screen.getByText('click');
        userEvent.click(btn);
        expect(buttonClicked).toHaveBeenCalled();
    });
    it('Button disabled', function () {
        render(_jsx(Button, { clicked: function () { }, type: 'submit', text: 'click', theme: 'disabled' }, void 0));
        var btn = screen.getByText('click');
        expect(btn).toHaveProperty('disabled', true);
    });
});
//# sourceMappingURL=Button.test.js.map