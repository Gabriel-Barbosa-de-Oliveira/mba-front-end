import { getEventsEndpoint } from "./interfaces/backend";

function App() {
  getEventsEndpoint().then((events) => {
    for (const event of events) {
      console.log(event);
    }
  });

  return <div>Olá</div>;
}

export default App;
