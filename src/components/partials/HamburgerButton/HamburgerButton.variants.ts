import { cva } from "class-variance-authority";

export const lineVariants = cva(
    [
        "absolute left-1/2 top-1/2 block m-0 rounded-[1px] bg-brand-blue",
        "transition-[top,bottom] duration-100 ease-in-out",
        "[height:var(--hamburger-button-line-height)]",
        "[width:var(--hamburger-button-line-width-current)]",
        "[margin-top:var(--hamburger-button-line-margin-top)]",
        "[transform:translateY(-50%)_translateX(-50%)_rotate(var(--hamburger-button-line-rotation))]",
    ],
    {
        variants: {
            shape: {
                "line-1": [
                    "[--hamburger-button-line-height:var(--hamburger-button-line-size)]",
                    "[--hamburger-button-line-width-current:var(--hamburger-button-line-width)]",
                    "[--hamburger-button-line-margin-top:calc(var(--hamburger-button-line-offset)*-1)]",
                    "[--hamburger-button-line-rotation:0deg]",
                ],
                "line-2": [
                    "[--hamburger-button-line-height:var(--hamburger-button-line-size)]",
                    "[--hamburger-button-line-width-current:var(--hamburger-button-line-width)]",
                    "[--hamburger-button-line-margin-top:0px]",
                    "[--hamburger-button-line-rotation:0deg]",
                ],
                "line-3": [
                    "[--hamburger-button-line-height:var(--hamburger-button-line-size)]",
                    "[--hamburger-button-line-width-current:var(--hamburger-button-line-width)]",
                    "[--hamburger-button-line-margin-top:var(--hamburger-button-line-offset)]",
                    "[--hamburger-button-line-rotation:0deg]",
                ],
                "line-1-active": [
                    "[--hamburger-button-line-height:var(--hamburger-button-line-size)]",
                    "[--hamburger-button-line-width-current:var(--hamburger-button-line-width)]",
                    "[--hamburger-button-line-margin-top:0px]",
                    "[--hamburger-button-line-rotation:-45deg]",
                ],
                "line-2-active": [
                    "[--hamburger-button-line-height:0px]",
                    "[--hamburger-button-line-width-current:0px]",
                    "[--hamburger-button-line-margin-top:0px]",
                    "[--hamburger-button-line-rotation:0deg]",
                ],
                "line-3-active": [
                    "[--hamburger-button-line-height:var(--hamburger-button-line-size)]",
                    "[--hamburger-button-line-width-current:var(--hamburger-button-line-width)]",
                    "[--hamburger-button-line-margin-top:0px]",
                    "[--hamburger-button-line-rotation:45deg]",
                ],
            },
            animation: {
                "line-1-animation": "animate-hamburger-button-shape-1",
                "line-2-animation": "animate-hamburger-button-shape-2",
                "line-3-animation": "animate-hamburger-button-shape-3",
                "line-1-animation-active": "animate-hamburger-button-shape-1-active",
                "line-2-animation-active": "animate-hamburger-button-shape-2-active",
                "line-3-animation-active": "animate-hamburger-button-shape-3-active",
            },
        },
    }
);
