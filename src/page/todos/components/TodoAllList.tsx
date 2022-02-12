import React, { FC, ReactElement, useState } from "react";
import { connect } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { iTodo } from "../../../interfaces/itodo";
import ListItemButton from "@mui/material/ListItemButton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Divider from "@mui/material/Divider";
import { USER_LIST } from "../../../constantes/userList";
import { iUser } from "../../../interfaces/iUser";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const TodoAllList: FC<{
  todoData: Array<iTodo>;
  assignTodo:any
}> = ({ todoData, assignTodo }): ReactElement => {
  const [selectedIndex, setselectedIndex] = useState<number>();
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setselectedIndex(index);
  };
  const handleChange = (
    value: any,
    todo: any,
  ) => {
   todo.assign = value.name;
   console.log(todo)
   assignTodo('AllTodo', todo)
  };
  return (
    <Droppable droppableId="AllTodo">
      {(provided) => (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          className="characters"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todoData.map((todo: iTodo, index: number) => {
            return (
              <Draggable
                key={`${todo.id} list`}
                draggableId={todo.id.toString() + "list"}
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
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography component="div" variant="h5">{todo.title}</Typography>
                            </React.Fragment>
                          }
                          secondary={
                            <React.Fragment>
                              <Box pt={2}>
                                <Autocomplete
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                  id="combo-box-demo"
                                  options={USER_LIST}
                                  defaultValue={{
                                    id: index,
                                    name: todo.assign ? todo.assign : "",
                                  }}
                                  onChange={(e, value) => handleChange(value, todo)
                                  }
                                  autoComplete={true}
                                  getOptionLabel={(option: iUser) =>
                                    option.name
                                  }
                                  renderInput={(params: any) => (
                                    <TextField
                                      {...params}
                                      label="Assigner"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Box>
                            </React.Fragment>
                          }
                        />
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
export default TodoAllList;
