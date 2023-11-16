import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/Errorpage";
import PostContainer from "./components/PostContainer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <PostContainer /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      

    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
