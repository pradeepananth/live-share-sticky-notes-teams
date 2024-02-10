import { pages } from "@microsoft/teams-js";
import { FC, useEffect } from "react";
import { Title2, Subtitle2 } from "@fluentui/react-components";
import { FlexColumn } from "./flex";

const TabConfig: FC = () => {
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
        <FlexColumn vAlign="center" hAlign="center" fill="view" gap="small">
            <Title2 as="h2" block align="center">
                Welcome to Live Share Sticky Notes!
            </Title2>
            <Subtitle2 as="p" block align="center">
                Press the save button to continue.
            </Subtitle2>
        </FlexColumn>
    );
};

export default TabConfig;
