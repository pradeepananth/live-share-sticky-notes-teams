
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import {
    Theme,
    teamsDarkTheme,
    teamsHighContrastTheme,
    teamsLightTheme,
} from "@fluentui/react-components";
import { app } from "@microsoft/teams-js";
import { useEffect, useState } from "react";

let initializeTeamsStarted = false;
export const useTeamsInitialize = (IN_TEAMS: boolean): [boolean, app.Context, Theme] => {

    const [initialized, setInitialized] = useState(false);
    const [teamsTheme, setTeamsTheme] = useState(teamsLightTheme);
    const [ctx, setCtx] = useState<app.Context | null>(null);

    useEffect(() => {
        // This hook should only be called once, so we use a variable outside render to track if it has been called.
        if (initializeTeamsStarted || !IN_TEAMS) return;
        initializeTeamsStarted = true;
        const initialize = async () => {
            try {
                console.log("App.js: client SDK initialized");
                await app.initialize();
                app.notifyAppLoaded();
                app.notifySuccess();
                const context = await app.getContext();
                const curTheme = context.app.theme;
                switch (curTheme) {
                    case "dark":
                        setTeamsTheme(teamsDarkTheme);
                        break;
                    case "contrast":
                        setTeamsTheme(teamsHighContrastTheme);
                        break;
                    case "default":
                    default:
                        setTeamsTheme(teamsLightTheme);
                        break;
                }
                app.registerOnThemeChangeHandler(
                    (theme: string | undefined) => {
                        if (theme == "dark") {
                            setTeamsTheme(teamsDarkTheme);
                        } else if (theme == "contrast") {
                            setTeamsTheme(teamsHighContrastTheme);
                        } else {
                            setTeamsTheme(teamsLightTheme);
                        }
                    }
                );
                setCtx(context);
                setInitialized(true);
            } catch (error) {
                console.error(error);
            }
        };
        console.log("App.js: initializing client SDK");
        initialize();
    }, []);

    return [initialized, ctx, teamsTheme];
}