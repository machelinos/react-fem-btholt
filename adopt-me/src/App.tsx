import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { useState, lazy, Suspense } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import { Pet } from "./APIResponsesTypes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const adoptedPet = useState(null as Pet | null);

  return (
    <div
      className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div className="loading-pane">
                  <h2 className="loader">🌀</h2>
                </div>
              }
            >
              <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500">
                <Link className="text-6xl text-white hover:text-gray-20" to="/">
                  Adopt me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

let container = null;
if (!container) {
  container = document.getElementById("root");

  if (!container) {
    throw new Error("no container to render to");
  }
  const root = createRoot(container);
  root.render(<App />);
}
