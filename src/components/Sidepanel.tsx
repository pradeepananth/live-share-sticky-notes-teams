import { FC } from "react";

const Sidepanel: FC = () => {
    const textStyle = {
        // Use flexbox to center the text horizontally and vertically
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Set the font size and color
        fontSize: '36px',
    };
    return (
        <div style={textStyle}>
            Welcome to Live Share Sticky notes!
            Press the Share button to start presenting to stage.
        </div>
    );
};

export default Sidepanel;
