import React from 'react';
declare type Types = 'button' | 'submit' | 'reset';
declare type Themes = 'default' | 'primary' | 'secondary' | 'disabled' | 'danger';
interface Props {
    text: string;
    clicked: (item: any) => void;
    className?: string;
    theme?: Themes;
    type: Types;
    icon?: any;
    fullWidth?: string;
    style?: any;
    children?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export default Button;
//# sourceMappingURL=Button.d.ts.map