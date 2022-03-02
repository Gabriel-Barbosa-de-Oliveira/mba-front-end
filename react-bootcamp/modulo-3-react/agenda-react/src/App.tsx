import { getEventsEndpoint } from "./interfaces/backend";
import { Button } from "@material-ui/core";

function App() {
  getEventsEndpoint().then((events) => {
    for (const event of events) {
      console.log(event);
    }
  });

  return (
    <Button color="primary" variant="contained">
      {" "}
      Hello World
    </Button>
  );
}

export default App;
