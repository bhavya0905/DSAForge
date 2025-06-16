import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 📄 Pages
import HomePage from "./pages/HomePage";
import TopicsExplanation from "./pages/TopicsExplanation";
import PracticePage from "./pages/PracticePage";
import VisualizePage from "./pages/VisualizePage";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import CompleteProfile from "./pages/CompleteProfile";
import ProgressPage from "./pages/ProgressPage"; // ✅ Added Progress Page

// 🔒 Private Route Component
import PrivateRoute from "./components/PrivateRoute";

// 📊 Visualizations
import IntroDSA from "./pages/Visualizations/IntroDSA";
import ArrayVisualizer from "./pages/Visualizations/ArrayVisualizer";
import TimeSpaceVisualizer from "./pages/Visualizations/TimeSpaceVisualizer";
import SearchingVisualizer from "./pages/Visualizations/SearchingVisualizer";
import SortingVisualizer from "./pages/Visualizations/SortingVisualizer";
import BasicSortingVisualizer from "./pages/Visualizations/BasicSortingVisualizer";
import AdvanceSortingVisualizer from "./pages/Visualizations/AdvanceSortingVisualizer";
import CharArraysStringsVisualizer from "./pages/Visualizations/CharArraysStringsVisualizer";
import BasicMathsPointersVisualizer from "./pages/Visualizations/BasicMathsPointersVisualizer";
import RecursionVisualizer from "./pages/Visualizations/RecursionVisualizer";
import BacktrackingAndDNCVisualizer from "./pages/Visualizations/BacktrackingAndDNCVisualizer";
import LinkedListVisualizer from "./pages/Visualizations/LinkedListVisualizer";
import StackVisualizer from "./pages/Visualizations/StackVisualizer";
import QueueVisualizer from "./pages/Visualizations/QueueVisualizer";
import GenericAndBinaryTreeVisualizer from "./pages/Visualizations/GenericAndBinaryTreeVisualizer";
import BSTVisualizer from "./pages/Visualizations/BSTVisualizer";
import HeapVisualizer from "./pages/Visualizations/HeapVisualizer";
import MapsTriesVisualizer from "./pages/Visualizations/MapsTriesVisualizer";
import DynamicProgrammingVisualizer from "./pages/Visualizations/DynamicProgrammingVisualizer";
import GraphVisualizer from "./pages/Visualizations/GraphVisualizer";

// 🧭 Navbar & Footer
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 🔼 Scroll To Top Component
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflowX: "hidden",
          width: "100vw",
        }}
      >
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            {/* 🔹 Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/topics" element={<TopicsExplanation />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/visualize" element={<VisualizePage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 👤 Profile Routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/progress" element={<ProgressPage />} /> {/* ✅ Track Progress */}

            {/* 🔍 Visualization Routes */}
            <Route path="/visualize/intro" element={<IntroDSA />} />
            <Route path="/visualize/array" element={<ArrayVisualizer />} />
            <Route path="/visualize/time-complexity" element={<TimeSpaceVisualizer />} />
            <Route path="/visualize/searching" element={<SearchingVisualizer />} />
            <Route path="/visualize/sorting" element={<SortingVisualizer />} />
            <Route path="/visualize/basic-sorting" element={<BasicSortingVisualizer />} />
            <Route path="/visualize/advance" element={<AdvanceSortingVisualizer />} />
            <Route path="/visualize/char-arrays-strings" element={<CharArraysStringsVisualizer />} />
            <Route path="/visualize/basic-maths-pointers" element={<BasicMathsPointersVisualizer />} />
            <Route path="/visualize/recursion" element={<RecursionVisualizer />} />
            <Route path="/visualize/backtracking-dnc" element={<BacktrackingAndDNCVisualizer />} />
            <Route path="/visualize/linked-list" element={<LinkedListVisualizer />} />
            <Route path="/visualize/stack" element={<StackVisualizer />} />
            <Route path="/visualize/queue" element={<QueueVisualizer />} />
            <Route path="/visualize/tree" element={<GenericAndBinaryTreeVisualizer />} />
            <Route path="/visualize/bst" element={<BSTVisualizer />} />
            <Route path="/visualize/heap" element={<HeapVisualizer />} />
            <Route path="/visualize/maps-tries" element={<MapsTriesVisualizer />} />
            <Route path="/visualize/dynamic-programming" element={<DynamicProgrammingVisualizer />} />
            <Route path="/visualize/graph" element={<GraphVisualizer />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
