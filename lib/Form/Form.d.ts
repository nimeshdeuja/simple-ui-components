import React from 'react';
import './simpleForm.css';
import './simpleForm-default.css';
import './simpleForm-outline.css';
export declare const SimplePreventAlphabet: (e: React.KeyboardEvent<HTMLInputElement>) => void;
export declare const SimpleOnBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
interface MessageProps {
    errors: any;
    name?: string;
}
export declare const Message: ({ errors, name }: MessageProps) => JSX.Element | null;
declare type layout = 'default' | 'outline';
declare type size = 'lg' | 'md' | 'sm';
interface FormProps {
    layout: layout;
    size: size;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    className?: string;
}
export declare const Form: ({ className, layout, size, onSubmit, children }: FormProps) => JSX.Element;
interface InputGroupProps {
    className?: string;
    type: 'autocomplete' | 'checkbox' | 'date' | 'password' | 'radio' | 'radio-row' | 'select' | 'textarea' | 'file' | 'input';
    name?: string;
    icon?: any;
    placeholder?: string;
    errors?: any;
    inputElement?: any;
    children?: React.ReactNode;
}
export declare const InputGroup: React.ForwardRefExoticComponent<InputGroupProps & React.RefAttributes<unknown>>;
export {};
//# sourceMappingURL=Form.d.ts.map