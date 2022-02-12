import React, { ReactElement, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardHeader } from "@mui/material";
import { connect } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";
import { createTodo } from "../../../store/todo/todo.action";

const CreateTodo = ({ todoState, createTodo }: any) => {
  const [titre, setTitre] = useState<string>("");
  const [isLoaded, setisLoaded] = useState<boolean>(true);
  const addTodo = () => {
    setisLoaded(false);
    createTodo(titre);
    setTimeout(() => {
      setTitre("");
      setisLoaded(true);
    }, 2000);
  };
  return (
    <Card>
      <CardHeader title="Ajout tâches" style={{ textAlign: "center" }} />
      <CardContent>
        <div>
          <TextField
            id="outlined-basic"
            label="Titre tâches"
            variant="outlined"
            value={titre || ""}
            onChange={(event) => {
              setTitre(event.target.value);
            }}
          />
        </div>

        <Box pt={1}>
          {!isLoaded ? (
            <LoadingButton loading variant="contained">
              Submit
            </LoadingButton>
          ) : titre ? (
            <Button onClick={() => addTodo()} variant="contained">
              Valider
            </Button>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    todoState: state.todoState,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createTodo: (data: any) =>
      setTimeout(() => {
        dispatch(createTodo(data));
      }, 1500),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo);
