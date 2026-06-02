import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AdminRoute from "./components/routing/AdminRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Tools from "./pages/Tools";
import ToolDetail from "./pages/ToolDetail";
import ToolSubmit from "./pages/ToolSubmit";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import StoryCreate from "./pages/StoryCreate";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import MyContributions from "./pages/MyContributions";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTools from "./pages/admin/AdminTools";
import AdminStories from "./pages/admin/AdminStories";
import AdminMessages from "./pages/admin/AdminMessages";

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="tools" element={<AdminTools />} />
          <Route path="stories" element={<AdminStories />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/contact" element={<Contact />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/contribute" element={<ToolSubmit />} />
          <Route path="/tools/new" element={<ToolSubmit />} />
          <Route path="/stories/new" element={<StoryCreate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-contributions" element={<MyContributions />} />
        </Route>
      </Route>
    </Routes>
  );
}
