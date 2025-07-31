import { Route, Routes } from "react-router";

import "./App.css";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import AboutPage from "./pages/About";
import AdDetailsPage from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";
import NewCategoryForm from "./pages/NewCategoryForm";
import SearchPage from "./pages/SearchPage";
import EditAdForm from "./pages/EditAdForm";
import { LaboPage } from "./pages/Labo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="/labo" element={<LaboPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ads/:id" element={<AdDetailsPage />} />
        <Route path="/ads/:id/edit" element={<EditAdForm />} />
        <Route path="/ads/new" element={<NewAdForm />} />
        <Route path="/category/new" element={<NewCategoryForm />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
