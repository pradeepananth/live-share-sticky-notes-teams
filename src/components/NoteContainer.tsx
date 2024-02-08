// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Note } from "./Note";
import "./noteContainer.css";
import React from "react";
import { v4 as uuid } from "uuid";
import { useLivePresence, useLiveShareContext, useSharedMap } from "@microsoft/live-share-react";

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
      userName: localUser.displayName.split(" ")[0],
    };
    // update the notes array with the new note
    setEntry(id, newNote);
    // clear the input value
    setInput("");
  };

  // function to handle note delete
  const handleDelete = (index: string) => {
    deleteEntry(index);
  };

  return (
     <>
     {joined && (
      <div className="note-container">
        <h1>Sticky Notes</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="text-box"
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Write a note..."
            required
          />
          <button className="note-button" type="submit">
            Add
          </button>
        </form>
        <div className="notes-container">
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
        </div>
      </div>)}
      {joinError && <div>Failed to join live share session: ${joinError.message}</div>}
      {!joined && !joinError && <div>Joining live share session...</div>}
      </>
  );
};
