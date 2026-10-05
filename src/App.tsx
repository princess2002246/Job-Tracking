import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddJob from "./pages/AddJob";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import EditJob from "./pages/EditJob";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
  path="/jobs/add"
  element={
    <ProtectedRoute>
      <AddJob />
    </ProtectedRoute>
  }
/>
<Route
  path="/jobs/:id/edit"
  element={
    <ProtectedRoute>
      <EditJob />
    </ProtectedRoute>
  }
/>
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;