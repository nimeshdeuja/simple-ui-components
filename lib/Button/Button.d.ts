/// <reference types="react" />
declare type Types = 'button' | 'submit' | 'reset';
declare type Thems = 'default' | 'primary' | 'secondary' | 'disabled' | 'danger';
interface Props {
    className?: string;
    theme?: Thems;
    type: Types;
    clicked: (item: any) => void;
    icon?: React.ReactNode;
    text: string;
    fullWidth?: string;
    style?: any;
}
declare const Button: ({ className, theme, type, clicked, icon, text, fullWidth, style }: Props) => JSX.Element;
export default Button;
//# sourceMappingURL=Button.d.ts.map