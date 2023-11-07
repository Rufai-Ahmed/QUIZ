import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import MainApp from "./components/pages/MainApp";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router/Router";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
