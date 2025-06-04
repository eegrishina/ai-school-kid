import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/upload" element={<UploadImagesPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
