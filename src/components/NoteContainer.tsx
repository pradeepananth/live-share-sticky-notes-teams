// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Note } from "./Note";
import React from "react";
import { v4 as uuid } from "uuid";
import { useLivePresence, useLiveShareContext, useSharedMap } from "@microsoft/live-share-react";
import { FlexColumn, FlexRow } from "./flex";
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, Button, Divider, Input, Popover, PopoverSurface, PopoverTrigger, PresenceBadgeStatus, Text, partitionAvatarGroupItems } from "@fluentui/react-components";
import { LivePresenceUser, PresenceState } from "@microsoft/live-share";

export const EXAMPLE_SHARED_MAP_KEY = "CUSTOM-CARDS-MAP";

export interface ISharedCardValue {
  id: string;
  text: string;
  color: string;
  userName: string;
}

export const NoteContainer = () => {
  // state for storing notes
  // state for the notes array
  const { map, setEntry, deleteEntry } = useSharedMap<ISharedCardValue>(
    EXAMPLE_SHARED_MAP_KEY
);
const {
  localUser,
  allUsers,
  updatePresence,
  livePresence: v1,
} = useLivePresence(
  "CUSTOM-PRESENCE-KEY",
);
const onlineOrAwayUsers = allUsers.filter(
  (user) =>
      user.displayName &&
      (user.state === PresenceState.online ||
          user.state === PresenceState.away)
);
const { inlineItems, overflowItems } = partitionAvatarGroupItems({
  items: onlineOrAwayUsers.map((user) => {
      const displayName = user.displayName ?? "Unknown";
      if (user.isLocalUser) {
          return displayName + " (You)";
      }
      return displayName;
  }),
  maxInlineItems: 3,
});
  // state for the input value
  const [input, setInput] = useState("");
  const { joined, joinError } = useLiveShareContext();
  // function to handle input change
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };

  // function to handle form submit
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // create a new note object with the input value and a random color
    const id = uuid();
    const newNote = {
      id: id,
      text: input,
      color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`,
      userName: localUser.displayName ?? "Unknown",
    };
    // update the notes array with the new note
    if (!!input) {
      setEntry(id, newNote);
      // clear the input value
      setInput("");
    }
  };

  // function to handle note delete
  const handleDelete = (index: string) => {
    deleteEntry(index);
  };

  return (
     <>
      <FlexColumn vAlign="center" hAlign="center" gap="small">
      {joined && (<><Text align="center"
                style={{
                    fontSize: "24px",
                    maxWidth: "80%",
                    padding: "8px",
                    borderRadius: "4px",
                }}>Sticky Notes</Text>
         <AvatarGroup>
                {inlineItems.map((name, index) => {
                    const user = onlineOrAwayUsers[index];
                    return (
                        <Popover key={name} openOnHover mouseLeaveDelay={0}>
                            <PopoverTrigger disableButtonEnhancement>
                                <AvatarGroupItem
                                    name={name}
                                    badge={{
                                        status: presenceStateToFluentStatus(
                                            user
                                        ),
                                    }}
                                />
                            </PopoverTrigger>
                            <PopoverSurface>
                                <FlexColumn gap="smaller">
                                    <FlexRow>
                                        <Text weight="semibold">{name}</Text>
                                    </FlexRow>
                                </FlexColumn>
                            </PopoverSurface>
                        </Popover>
                    );
                })}

                {overflowItems && (
                    <AvatarGroupPopover>
                        {overflowItems.map((name) => (
                            <AvatarGroupItem
                                name={name}
                                key={name}
                                title={name}
                            />
                        ))}
                    </AvatarGroupPopover>
                )}
            </AvatarGroup>
         <form onSubmit={handleSubmit}>
          <FlexRow fill="both" vAlign="center" hAlign="center" gap="medium">
          <Input
                  value={input}
                  placeholder="Write a note..."
                  onChange={handleChange}
              />
            <Button
                  onClick={handleSubmit}
              >
                  Add
            </Button>
          </FlexRow>
        </form>
        <FlexRow gap="small" wrap>
          {[...map.values()].map((cardValue) => (
            // render a Note component for each note in the array
            <Note
              index={cardValue.id}
              text={cardValue.text}
              color={cardValue.color}
              name={cardValue.userName}
              onDelete={handleDelete}
            />
          ))}
        </FlexRow>
        </>
        )}
        {joinError && <Text align="center"
                style={{
                    fontSize: "14px",
                    maxWidth: "80%",
                    padding: "8px",
                    borderRadius: "4px",
                    fontWeight: "semibold",
                }}>Failed to join live share session: ${joinError.message}</Text>}
        {!joined && !joinError && <Text align="center"
                style={{
                    fontSize: "14px",
                    maxWidth: "80%",
                    padding: "8px",
                    borderRadius: "4px",
                    fontWeight: "semibold",
                }}>Joining live share session...</Text>}
      </FlexColumn>
      </>
  );
};

function presenceStateToFluentStatus(
  user: LivePresenceUser
): PresenceBadgeStatus {
  switch (user.state) {
      case PresenceState.online:
          return "available";
      case PresenceState.offline:
          return "offline";
      case PresenceState.away:
          return "away";
      default:
          return "offline";
  }
}