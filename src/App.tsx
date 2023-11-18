import "./App.css";
import { NoteContainer } from "./components/NoteContainer";
import { FrameContexts } from "@microsoft/teams-js";
import { inTeams } from "./teamsContext/inTeams";
import { useTeamsInitialize } from "./teamsContext/useTeamsInitialize";
import { useTeamsContext } from "./teamsContext/useTeamsContext";
import TabConfig from "./components/TabConfig";
import Sidepanel from "./components/Sidepanel";

const App = () => {

  const IN_TEAMS = inTeams();
  const initialized = useTeamsInitialize(IN_TEAMS);
  const ctx = useTeamsContext(initialized);

  const getRender = () => {
    if (!IN_TEAMS)
    {
      return <NoteContainer />
    }

    if (IN_TEAMS && initialized && ctx)
    {
      if (ctx.page.frameContext == FrameContexts.settings)
      {
        return <TabConfig />;

      } else if (ctx.page.frameContext == FrameContexts.sidePanel) {
        return <Sidepanel />;
      }

      return <NoteContainer />;
    } else {
      return <>Loading...</>
    }
  }

  return (
    <>
      {getRender()}
    </>
  );
};

export default App;

