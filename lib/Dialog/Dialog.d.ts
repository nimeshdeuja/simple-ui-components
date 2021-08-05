import { ReactNode } from 'react';
declare type Sizes = 'sm' | 'md' | 'lg';
declare type Themes = 'default' | 'primary' | 'secandary' | 'danger';
interface Props {
    close: () => void;
    title: string;
    size?: Sizes;
    theme?: Themes;
    open: boolean;
    className?: string;
    children: ReactNode;
}
export declare const Dialog: ({ close, title, size, theme, open, className, children }: Props) => JSX.Element | null;
interface PropsBody {
    className?: string;
    children: ReactNode;
}
export declare const DialogBody: ({ className, children }: PropsBody) => JSX.Element;
declare type IsMultiple = 'multiple' | 'single';
interface PropsFooter {
    multiple: IsMultiple;
    className?: string;
    children: ReactNode;
}
export declare const DialogFooter: ({ multiple, className, children }: PropsFooter) => JSX.Element;
export {};
//# sourceMappingURL=Dialog.d.ts.map