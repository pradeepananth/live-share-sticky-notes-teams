// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */

import { Avatar, Button, Card, Popover, PopoverSurface, PopoverTrigger, Text } from '@fluentui/react-components';
import { FlexColumn, FlexRow } from './flex';
import { Delete24Filled } from '@fluentui/react-icons';

export const Note = ({ index, text, color, name, onDelete }) => {
  // function to handle delete button click
  const handleClick = () => {
    // call the onDelete prop with the index of the note
    onDelete(index);
  };

  return (
    // render a div with the note class and the given color
    <Card style={{
      width: "250px",
      maxWidth: "100%",
      height: "fit-content",
      backgroundColor: color,
      margin: "15px",
    }}>
    <header>
      <FlexRow hAlign='end'>
      <Button
          size="small"
          shape="circular"
          icon={<Delete24Filled />}
          onClick={handleClick}
        ></Button>
      </FlexRow>
    </header>
    <Text weight='semibold'>
          {text}
      </Text>
    <footer>
    <FlexRow hAlign='end'>
     <Popover key={name} openOnHover mouseLeaveDelay={0}>
       <PopoverTrigger disableButtonEnhancement>
         <Avatar name={name} />
        </PopoverTrigger>
        <PopoverSurface>
            <FlexColumn gap="smaller">
                <FlexRow>
                    <Text>{name}</Text>
                </FlexRow>
            </FlexColumn>
        </PopoverSurface>
      </Popover>
    </FlexRow>
    </footer>
  </Card>
  );
};

export default Note;
