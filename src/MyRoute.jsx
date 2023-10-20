import App from "./App";
import FormComponent from "./components/FormComponent";
import SingleComponents from "./components/SingleComponents";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";
import AdminRoute from './AdminRoute'
import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// const myApp = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/create",
//     element: <FormComponent />,
//   },
//   {
//     path: "/blog/:slug",
//     element: <SingleComponents />,
//   },
//   {
//     path: "/blog/edit/:slug",
//     element: <EditComponent />,
//   },
//   {
//     path: "/login",
//     element: <LoginComponent />,
//   },
// ]);

// const MyRoute=()=>{
//       return(
//             <div className='container p-5'>
//                   <RouterProvider router={myApp} />
//             </div>
//       )
// }

const MyRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/blog/:slug" element={<SingleComponents />}/>
        <Route path="/login" element={<LoginComponent />}/>
        <Route element={<AdminRoute/>}>
            <Route path="/create" element={<FormComponent />}/>
            <Route path="/blog/edit/:slug" element={<EditComponent />}/>
        </Route>
      </Routes>
    </Router>
  );
};
export default MyRoute;
