import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouterWay from "./utils/AppRoutes"
function App() {
  const router = createBrowserRouter(RouterWay);
  return <>
      <RouterProvider router={router} />
    </>
}

export default App