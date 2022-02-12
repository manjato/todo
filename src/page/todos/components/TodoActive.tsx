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
import Divider from "@mui/material/Divider";

const TodoActive: FC<{
  todoActiveData: Array<iTodo>;
}> = ({ todoActiveData}): ReactElement => {
  const [selectedIndex, setselectedIndex] = useState<number>();
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setselectedIndex(index);
  };
  return (
    <Droppable droppableId="ActiveTodo">
      {(provided) => (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          className="characters"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todoActiveData.length > 0 &&
            todoActiveData.map((todo: iTodo, index: number) => {
              return (
                <Draggable
                  key={`${todo.id} active`}
                  draggableId={todo.id.toString() + "active"}
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

export default TodoActive;
