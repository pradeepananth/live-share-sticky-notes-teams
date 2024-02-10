import { FC } from "react";
import { Title2, Subtitle2 } from "@fluentui/react-components";
import { FlexColumn } from "./flex";

const Sidepanel: FC = () => {
    return (
        <FlexColumn vAlign="center" hAlign="center" fill="view" gap="small">
            <Title2 as="h2" block align="center">
                Welcome to Live Share Sticky Notes!
            </Title2>
            <Subtitle2 as="p" block align="center">
                Press the Share button to start presenting to stage.
            </Subtitle2>
        </FlexColumn>
    );
};

export default Sidepanel;
