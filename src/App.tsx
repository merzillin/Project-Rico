import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./layout/layout";
import Menus from "./layout/route";
import HomePage from "./module/Home";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Home */}
            <Route index element={<HomePage />} />

            {/* Dynamic Routes from Menus */}
            {Menus.map((item) => {
              const Component = item.component;
              return (
                <Route
                  key={item.route}
                  path={item.route.replace("/", "")}
                  element={<Component />}
                />
              );
            })}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;