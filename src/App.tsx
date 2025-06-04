import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <BrowserRouter basename="/ai-school-kid">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {/* <Route path="/upload" element={<UploadImagesPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/result" element={<ResultPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
