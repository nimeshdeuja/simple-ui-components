import { ReactNode } from "react";
import "./tooltip.css";
declare type Placement = 'top' | 'left' | 'right' | 'bottom';
export declare const position: (placement: Placement) => {
    current: Placement;
    opposite(): "top" | "left" | "right" | "bottom";
    isHorizontal(): boolean;
    isVertical(): boolean;
};
interface Props {
    text: string;
    placement?: Placement;
    space?: Number;
    children: ReactNode;
    disabled?: boolean;
}
export declare const Tooltip: ({ text, placement, space, children, disabled, }: Props) => JSX.Element;
export declare const TooltipContainer: () => JSX.Element;
export {};
//# sourceMappingURL=Tooltip.d.ts.map