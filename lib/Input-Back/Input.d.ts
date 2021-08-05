/// <reference types="react" />
import "./form.css";
import "./form-default.css";
import "./form-outline.css";
declare type LabelText = 'right' | 'left';
declare type InputType = 'password' | 'number' | 'text';
export declare type ElementType = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
declare type InputStyleWidth = 'half';
interface Props {
    elementConfig: {
        type?: InputType;
        placeholder?: string;
        options?: any[];
        label?: string;
        labelText?: LabelText;
        rows?: number;
        id?: string;
        showPassword?: boolean;
    };
    elementType: ElementType;
    changed: (valye: any, e?: any) => void;
    value: any;
    className: string;
    invalid?: boolean;
    shouldValidate?: boolean;
    touched: boolean;
    inputStyle?: {
        width: InputStyleWidth;
        isLast: boolean;
    };
    autoComplete?: string;
}
declare const Input: ({ elementConfig, elementType, changed, value, className, invalid, shouldValidate, touched, inputStyle, autoComplete }: Props) => JSX.Element;
export default Input;
//# sourceMappingURL=Input.d.ts.map