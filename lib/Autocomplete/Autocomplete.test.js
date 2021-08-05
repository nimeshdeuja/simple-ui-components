import { jsx as _jsx } from "react/jsx-runtime";
import Autocomplete from './Autocomplete';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
var Element = function (_a) {
    var list = _a.list, id = _a.id, change = _a.change, selected = _a.selected, placeholder = _a.placeholder, inputPlaceholder = _a.inputPlaceholder, emptyText = _a.emptyText, multiple = _a.multiple, clear = _a.clear, selectedCallback = _a.selectedCallback;
    return _jsx(Autocomplete, { list: list, id: id, change: change, selected: selected, placeholder: placeholder, inputPlaceholder: inputPlaceholder, emptyText: emptyText, multiple: multiple, clear: clear, selectedCallback: selectedCallback }, void 0);
};
afterEach(cleanup);
describe('Autocomplete with icon', function () {
    var lists = [
        { value: 'Nimesh', label: 'Nimesh', id: 'Nimesh', icon: 'https://unprint.pt/static/media/logo.4af0ed03.png' },
        { value: 'Deuja', label: 'Deuja', id: 'Deuja', icon: 'https://unprint.pt/static/media/logo.4af0ed03.png' }
    ];
    var testFunction = jest.fn();
    it('With selected', function () {
        var utils = render(_jsx(Element, { id: 'myName', list: lists, change: testFunction, selected: [
                { value: 'Nimesh', label: 'Nimesh', id: 'Nimesh', icon: 'https://unprint.pt/static/media/logo.4af0ed03.png' }
            ], placeholder: 'This is placeholder', inputPlaceholder: 'This is input placeholder', emptyText: 'This is empty list text', multiple: true, clear: true, selectedCallback: true }, void 0));
        var selectedElement = utils.getByTestId('test-selected');
        expect(selectedElement).toBeTruthy();
        expect(selectedElement).toHaveClass('selected');
        expect(selectedElement).toHaveAttribute('id', 'myNameselected');
        var listElement = utils.getAllByTestId('test-selected-li');
        expect(listElement).toBeTruthy();
        expect(listElement.length).toBe(1);
        expect(utils.getByText('Nimesh')).toBeTruthy();
        var item = utils.getByText('Nimesh');
        expect(item).toBeTruthy();
        expect(item).toContainHTML('<img src="https://unprint.pt/static/media/logo.4af0ed03.png">Nimesh');
        expect(item).toHaveClass('selected');
        expect(item).not.toHaveClass('notSelected');
        fireEvent.click(item);
        expect(testFunction).toBeCalled();
        var searchElement = utils.getByTestId('test-search');
        expect(searchElement).toBeTruthy();
        expect(searchElement).toHaveAttribute('id', 'myNamesearch');
        expect(searchElement).toHaveClass('search');
        var searchInput = utils.getByTestId('test-search-input');
        expect(searchInput).toBeTruthy();
        expect(searchInput).toHaveAttribute('id', 'myName');
        expect(searchInput).toHaveAttribute('placeholder', 'This is input placeholder');
        var OptionList = utils.getAllByTestId('test-search-list-li');
        expect(OptionList).toBeTruthy();
        expect(OptionList.length).toBe(2);
        expect(OptionList[0]).toContainHTML('Deuja');
        expect(OptionList[1]).toContainHTML('Nimesh');
        var searchList = utils.getByTestId('test-search-list');
        expect(searchList).toBeTruthy();
        expect(searchList).toHaveAttribute('id', 'myNamelist');
        userEvent.type(searchInput, '1234567890');
        expect(searchInput).toHaveValue('1234567890');
        var clearAll = utils.getByTestId('test-clearAll');
        expect(clearAll).toHaveClass('clearAll');
        expect(clearAll).toHaveClass('hide');
    });
    it('Without selected', function () {
        var utils = render(_jsx(Element, { id: 'myName', list: lists, change: testFunction, inputPlaceholder: 'This is input placeholder', multiple: true }, void 0));
        var listElement = utils.getAllByTestId('test-selected-li');
        expect(listElement[0]).toHaveClass('notSelected');
        expect(listElement[0]).toHaveTextContent('Select');
    });
});
//# sourceMappingURL=Autocomplete.test.js.map