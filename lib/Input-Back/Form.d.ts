import { ReactElement, ReactNode } from 'react';
declare type LayoutTypes = 'default' | 'outline';
interface Props {
    layout?: LayoutTypes;
    children: ReactNode;
    className?: string;
    submit: () => void;
}
export declare const Form: ({ layout, submit, className, children }: Props) => ReactElement;
export declare const CheckValidity: (value: any, rules: any) => boolean;
export {};
//# sourceMappingURL=Form.d.ts.map