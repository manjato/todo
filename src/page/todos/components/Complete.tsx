import React, { FC, ReactElement, useState } from "react";
import { connect } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { iTodo } from "../../../interfaces/itodo";
import ListItemButton from "@mui/material/ListItemButton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Divider from '@mui/material/Divider';
const TodoComplete: FC<{
    todoCompleteData: Array<iTodo>;
}> = ({ todoCompleteData}): ReactElement => {
  const [selectedIndex, setselectedIndex] = useState<number>();
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setselectedIndex(index);
  };
  return (
    <Droppable droppableId="CompleteTodo">
      {(provided) => (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          className="characters"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todoCompleteData.length>0 &&todoCompleteData.map((todo: iTodo, index: number) => {
            return (
              <Draggable
              key={`${todo.id} Complete`}
                draggableId={todo.id.toString() + "Complete"}
                index={index}
              >
                {(provided) => (
                  <>
                  <ListItem>
                    <ListItemButton
                      selected={selectedIndex === index}
                      onClick={(event) => handleListItemClick(event, index)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItemAvatar>
                      <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary={todo.title} secondary={todo.assign} />
                    </ListItemButton>
                  </ListItem>
                   <Divider />
                  </>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default TodoComplete;
