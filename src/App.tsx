import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Todo from "./page/todos/TodoList";
import CreateTodo from "./page/todos/components/CreateTodo";

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={2} >
            <CreateTodo />
          </Grid>
          <Grid item xs={8} >
            <Todo />
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
}

export default App;
