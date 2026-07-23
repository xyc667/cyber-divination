import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import HomePage from "@/pages/HomePage";
import QimenPage from "@/pages/QimenPage";
import ZhouyiPage from "@/pages/ZhouyiPage";
import LiuyaoPage from "@/pages/LiuyaoPage";
import ShefuPage from "@/pages/ShefuPage";
import BaziPage from "@/pages/BaziPage";
import MeihuaPage from "@/pages/MeihuaPage";
import ProfilePage from "@/pages/ProfilePage";
import KnowledgePage from "@/pages/KnowledgePage";
import RAGChatPage from "@/pages/RAGChatPage";
import KnowledgeGraphPage from "@/pages/KnowledgeGraphPage";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qimen" element={<QimenPage />} />
        <Route path="/zhouyi" element={<ZhouyiPage />} />
        <Route path="/bazi" element={<BaziPage />} />
        <Route path="/meihua" element={<MeihuaPage />} />
        <Route path="/liuyao" element={<LiuyaoPage />} />
        <Route path="/shefu" element={<ShefuPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />
        <Route path="/chat" element={<RAGChatPage />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraphPage />} />
      </Routes>
    </Router>
  );
}
