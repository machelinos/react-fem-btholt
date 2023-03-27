import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

let container = null;
if (!container) {
  container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App />);
}
