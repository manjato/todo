import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { iTodo } from "../../interfaces/itodo";
import TodoAllList from "./components/TodoAllList";
import { connect } from "react-redux";
import { assingTodo, moveTodo, reorderTodo } from "../../store/todo/todo.action";
import { DragDropContext } from "react-beautiful-dnd";
import TodoActive from "./components/TodoActive";
import TodoComplete from "./components/Complete";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
const reorderList = (
  list: Array<iTodo>,
  source: number,
  destination: number
) => {
  const items = Array.from(list);
  const [reorderedItem] = items.splice(source, 1);
  items.splice(destination, 0, reorderedItem);
  return items;
};
const move = (
  source: Array<iTodo>,
  destination: Array<iTodo>,
  droppableSource: any,
  droppableDestination: any
) => {
  let result: any = {};
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const Todo = ({ todoData, todoList, moveTodoList, assignTodo }: any) => {
  const handleOnDragEnd = (result: any) => {
    console.log(result);
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorderList(
        todoData[source.droppableId],
        result.source.index,
        result.destination.index
      );
      todoList(source.droppableId, (todoData[source.droppableId] = items));
    } else {
      const items = move(
        todoData[source.droppableId],
        todoData[destination.droppableId],
        source,
        destination
      );
      moveTodoList(source.droppableId, destination.droppableId, items);
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardHeader title="Liste de tâches" style={{ textAlign: 'center' }}/>
            <CardContent>
              <TodoAllList
                todoData={todoData.AllTodo}
                assignTodo= {assignTodo}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
         
          <Card>
            <CardHeader title="Liste de tâches en cours" style={{ textAlign: 'center' }}/>
            <CardContent>
            <TodoActive
            todoActiveData={todoData.ActiveTodo}
          />
            </CardContent>
          </Card>
         
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader title="Liste de tâches complète" style={{ textAlign: 'center' }}/>
            <CardContent>
            <TodoComplete
            todoCompleteData={todoData.CompleteTodo}
          />
            </CardContent>
          </Card>
          
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

const mapStateToProps = (state: any) => {
  return {
    todoData: state.todo,
    request: state.request,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    todoList: (type: string, data: Array<iTodo>) =>
      dispatch(reorderTodo(type, data)),
    moveTodoList: (
      typeSource: string,
      typeDestination: string,
      data: Array<iTodo>
    ) => dispatch(moveTodo(typeSource, typeDestination, data)),
    assignTodo: (todo:iTodo, type:string) => dispatch(assingTodo(type,todo))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
