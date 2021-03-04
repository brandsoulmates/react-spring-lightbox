import React, { useRef } from 'react';
import { useDoubleClick } from '../../utils';

type VideoProps = {
    component: React.Component;
    handleVideoDragClick: () => void;
    pagerIsDragging: boolean;
};

/**
 * Animates pinch-zoom + panning on image using spring physics
 */
const Video = ({
    component,
    handleVideoDragClick,
    pagerIsDragging,
}: VideoProps) => {
    const videoRef = useRef<HTMLInputElement>(null);

    useDoubleClick({
        capture: true,
        latency: 0,
        ['onSingleClick']: () => {
            if (pagerIsDragging) {
                // pauses the video on drag
                handleVideoDragClick();

                return;
            }
        },

        ref: videoRef,
    });

    return <div ref={videoRef}>{component}</div>;
};

Video.displayName = 'Video';

export default Video;
