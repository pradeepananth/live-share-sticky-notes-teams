import "./App.css";
import { NoteContainer } from "./components/NoteContainer";
import { FrameContexts, LiveShareHost } from "@microsoft/teams-js";
import { inTeams } from "./teamsContext/inTeams";
import { useTeamsInitialize } from "./teamsContext/useTeamsInitialize";
import { useTeamsContext } from "./teamsContext/useTeamsContext";
import TabConfig from "./components/TabConfig";
import Sidepanel from "./components/Sidepanel";
import { LiveShareProvider } from "@microsoft/live-share-react";
import { TestLiveShareHost } from "@microsoft/live-share";
import { useState } from "react";

const App = () => {
  const IN_TEAMS = inTeams();
  const initialized = useTeamsInitialize(IN_TEAMS);
  const ctx = useTeamsContext(initialized);
  const [host] = useState(
    IN_TEAMS ? LiveShareHost.create() : TestLiveShareHost.create()
);
const liveShareProvider =  <LiveShareProvider joinOnLoad host={host}>
              <NoteContainer />
        </LiveShareProvider>;

  const getRenderer = () => {
    if (!IN_TEAMS)
    {
      return liveShareProvider;
    }

    if (IN_TEAMS && initialized && ctx?.page?.frameContext)
    {
      if (ctx.page.frameContext == FrameContexts.settings)
      {
        return <TabConfig />;
      } else if (ctx.page.frameContext == FrameContexts.sidePanel) {
        return <Sidepanel />;
      } else {
        return liveShareProvider;
      }
    } else {
      return <>Loading...</>
    }
  }

  return (
    <>
      {getRenderer()}
    </>
  );
};

export default App;

