
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { app } from "@microsoft/teams-js";
import { useEffect, useState } from "react";

let initializeTeamsStarted = false;
export const useTeamsInitialize = (IN_TEAMS: boolean) => {

    const [initialized, setInitialized] = useState(false);

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
                setInitialized(true);
            } catch (error) {
                console.error(error);
            }
        };
        console.log("App.js: initializing client SDK");
        initialize();
    }, []);

    return initialized;
}