import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/Errorpage";
import PostContainer from "./components/PostContainer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "./features/middleware/postMiddleware";
import { fetchUser } from "./features/middleware/userMiddleware";

const router = createHashRouter([
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchUser());
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
