import { CrossWord } from "../components/CrossWord";
import { English } from "../components/English";
import { Mathematics } from "../components/Mathematics";
import { Shapes } from "../components/Shapes";
import { SelectPage } from "../components/pages/SelectPage";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <SelectPage />,
  },
  {
    path: "/Mathematics",
    element: <Mathematics />,
  },
  {
    path: "/English",
    element: <English />,
  },
  {
    path: "/Shapes",
    element: <Shapes />,
  },
  {
    path: "/CrossWord",
    element: <CrossWord />,
  },
]);
