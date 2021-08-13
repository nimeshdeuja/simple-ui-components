/// <reference types="react" />
import './Autocomplete.css';
declare type listTypes = any;
declare type changeTypes = (e: listTypes[]) => void;
interface AutocompleteProps {
    list: listTypes[];
    id: string;
    change: changeTypes;
    value?: listTypes[];
    placeholder?: string;
    inputPlaceholder?: string;
    emptyText?: string;
    multiple?: boolean;
    clear?: boolean;
    selectedCallback?: boolean;
    secondaryOption?: string;
}
declare const Autocomplete: ({ list, id, change, value, placeholder, inputPlaceholder, emptyText, multiple, clear, selectedCallback, secondaryOption }: AutocompleteProps) => JSX.Element;
export default Autocomplete;
//# sourceMappingURL=Autocomplete.d.ts.map