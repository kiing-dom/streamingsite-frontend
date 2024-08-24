import React from "react";

export type VideoPlayerProps = {
    videoUrl?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    return (
        <video width="100%" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser doesn't support the video tag.
        </video>
    );
};

export default VideoPlayer;