import { pages } from "@microsoft/teams-js";
import { FC, useEffect } from "react";

const TabConfig: FC = () => {
    const textStyle = {
        // Use flexbox to center the text horizontally and vertically
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Set the font size and color
        fontSize: '36px',
    };
    useEffect(() => {
        pages.config.registerOnSaveHandler(function (saveEvent) {
            pages.config.setConfig({
                suggestedDisplayName: "Sticky Notes",
                contentUrl: `${window.location.origin}?inTeams=true`,
            });
            saveEvent.notifySuccess();
        });

        pages.config.setValidityState(true);
    }, []);

    return (
        <div style={textStyle}>
            Welcome to Live Share Sticky notes!
            Press the save button to continue.
        </div>
    );
};

export default TabConfig;
