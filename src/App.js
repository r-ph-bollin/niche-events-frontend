import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import DailyEventView from "./pages/DailyEventView";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
            <Route
              path="/tomorrow"
              element={<DailyEventView key={123} offset={1} />}
            />
            <Route path="/" element={<DailyEventView key={543} offset={0} />} />
            <Route
              path="/dayAfterTomorrow"
              element={<DailyEventView key={234} offset={2} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/editor" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/editor"
              element={user ? <Editor /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
