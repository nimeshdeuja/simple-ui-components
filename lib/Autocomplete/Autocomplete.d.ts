/// <reference types="react" />
import './Autocomplete.css';
declare type listTypes = {
    label: string;
    id: string | number;
    icon?: string;
    color?: string;
};
declare type chageTypes = (e: listTypes[]) => void;
interface AutocompletProsp {
    list: listTypes[];
    id: string;
    change: chageTypes;
    selected?: listTypes[];
    placeholder?: string;
    inputPlaceholder?: string;
    emptyText?: string;
    multiple?: boolean;
    clear?: boolean;
    selectedCallback?: boolean;
}
declare const Autocomplete: ({ list, id, change, selected, placeholder, inputPlaceholder, emptyText, multiple, clear, selectedCallback }: AutocompletProsp) => JSX.Element;
export default Autocomplete;
//# sourceMappingURL=Autocomplete.d.ts.map