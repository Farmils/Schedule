import "./App.css";
import { ContextProvider } from "../../core/context/Context.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "../../core/routes/routes.tsx";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
