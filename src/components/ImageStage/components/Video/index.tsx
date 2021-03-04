import React, { useRef } from 'react';
import { useDoubleClick } from '../../utils';

type VideoProps = {
    component: React.Component;
    pagerIsDragging: boolean;
};

/**
 * Animates pinch-zoom + panning on image using spring physics
 */
const Video = ({ component, pagerIsDragging }: VideoProps) => {
    // const isDragging = useRef<boolean>(false);
    const videoRef = useRef<HTMLInputElement>(null);
    /**
     * Animates scale and translate offsets of Image as they change in gestures
     *
     * @see https://www.react-spring.io/docs/hooks/use-spring
     */

    /**
     * Update Image scale and translate offsets during pinch/pan gestures
     *
     * @see https://github.com/react-spring/react-use-gesture#usegesture-hook-supporting-multiple-gestures-at-once
     */
    // useGesture({
    //     onDrag: ({}) => {
    //         if (pagerIsDragging) {
    //             isDragging.current = true;
    //             return;
    //         }
    //     },
    //     onDragEnd: ({ memo }) => {
    //         if (memo !== undefined) {
    //             // Add small timeout to prevent onClick handler from firing after drag
    //             setTimeout(() => (isDragging.current = false), 100);
    //         }
    //     },
    // });

    useDoubleClick({
        capture: true,
        latency: 0,
        ['onSingleClick']: (e: MouseEvent) => {
            if (pagerIsDragging) {
                console.log("IT'S CLICKING");
                e.stopPropagation();
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }
        },

        ref: videoRef,
    });

    return (
        <div
            // onClickCapture={(e) => {
            //     console.log('video click capture preventing default');
            //     e.stopPropagation();
            //     e.preventDefault();
            //     if (isDragging.current) {
            //         console.log('video click capture is dragging');
            //         e.stopPropagation();
            //         e.preventDefault();
            //     }
            // }}
            // onMouseDownCapture={(e) => {
            //     isDragging.current = true;
            //     console.log('video mouse down capture');
            //     e.preventDefault();
            //     e.stopPropagation();
            // }}
            // onMouseUpCapture={(e) => {
            //     console.log('video mouse up capture');
            //     isDragging.current = pagerIsDragging;
            //     e.preventDefault();
            //     e.stopPropagation();
            // }}
            ref={videoRef}
        >
            {component}
        </div>
    );
};

Video.displayName = 'Video';

export default Video;
