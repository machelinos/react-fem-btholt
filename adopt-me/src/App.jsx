import { createRoot } from "react-dom/client";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt me!</h1>
      <Pet name="Luna" animal="Dog" breed="Havanesse" />
      <Pet name="Gatis" animal="Cat" breed="Street" />
      <Pet name="Ratón" animal="Mouse" breed="House" />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
