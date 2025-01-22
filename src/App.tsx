import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Embed from './pages/Embed';
import Widget from './pages/Widget';

const App: React.FC = () => {
  // Assuming Embed component handles configuration parsing and passing
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} /> {/* Use Embed to handle config */}
        <Route path="/embed" element={<Embed />} />
        <Route path="/widget" element={<Widget />} />
      </Routes>
    </Router>
  );
};

export default App;