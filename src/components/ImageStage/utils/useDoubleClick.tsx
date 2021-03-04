import React, { useEffect } from 'react';

type IUseDoubleClickProps = {
    capture?: boolean;
    /** The amount of time (in milliseconds) to wait before differentiating a single from a double click */
    latency?: number;
    /** A callback function for double click events */
    onDoubleClick?: (event: MouseEvent) => void;

    /** A callback function for single click events */
    onSingleClick?: (event: MouseEvent) => void;

    /** Dom node to watch for double clicks */
    ref: React.RefObject<HTMLElement>;
};

/**
 * React Hook that returns the current window size
 * and report updates from the 'resize' window event
 */
const useDoubleClick = ({
    ref,
    capture,
    latency = 300,
    onSingleClick = () => null,
    onDoubleClick = () => null,
}: IUseDoubleClickProps) => {
    useEffect(() => {
        const clickRef = ref.current;
        let clickCount = 0;
        let timer: ReturnType<typeof setTimeout>;

        const handleClick = (e: MouseEvent) => {
            clickCount += 1;

            timer = setTimeout(() => {
                if (clickCount === 1) onSingleClick(e);
                else if (clickCount === 2) onDoubleClick(e);

                clickCount = 0;
            }, latency);
        };

        // Add event listener for click events
        clickRef?.addEventListener('click', handleClick, capture);

        // Remove event listener
        return () => {
            clickRef?.removeEventListener('click', handleClick, capture);

            if (timer) {
                clearTimeout(timer);
            }
        };
    });
};

export default useDoubleClick;
