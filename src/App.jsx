import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Library imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Routes
import { expensesAction, expensesLoader, ExpensesPage } from "./pages/ExpensesPage";
import { Dashboard, dashboardAction, dashboardLoader } from "./pages/Dashboard";
import { Error } from "./pages/Error";
import { Main, mainLoader } from "./layouts/Main";

//Actions
import { logoutAction } from "./actions/logout";
import deleteBudget from "./actions/deleteBudget";

//Pages
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action:dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
         loader: expensesLoader,
         action: expensesAction,
         errorElement: <Error />,
      },
      {
        path:"budget/:id",
           element: <BudgetPage />,
         loader:budgetLoader,
         errorElement: <Error />,
          action: budgetAction,
          children: [
            {
              path:"delete",
              action: deleteBudget,
            }
          ]
      },
      {
        path: "logout",
        action: logoutAction,
      },
      
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
