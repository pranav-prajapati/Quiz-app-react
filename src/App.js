import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "./pages/Questions";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Home from "./pages/Home";

function App() {
  const email = useSelector((state) => state.Quiz.email);
  const testEnd = useSelector((state) => state.Quiz.testEnd);
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={(email||testEnd) ? <Questions className="mt-50" /> : <Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
