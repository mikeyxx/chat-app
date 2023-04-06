import { Navigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/index";
import Login from "./pages/Login/Index";
import HomePage from "./pages/HomePage/Index";
import ProfilePage from "./pages/ProfilePage/Index";
import { useAppSelector } from "./app/store";

function App() {
  const { token } = useAppSelector((state) => state.users);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/feeds"
            element={token ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/:userId/post"
            element={token ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
