import { getEventsEndpoint } from "./interfaces/backend";
import { Button } from "@material-ui/core";
import CalendarScreen from "./CalendarScreen";

function App() {
  getEventsEndpoint().then((events) => {
    for (const event of events) {
      console.log(event);
    }
  });

  return <CalendarScreen />;
}

export default App;
