import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import Admin from '@/pages/Admin/Admin.page';
import Home from '@/pages/Home/Home.page';
import Portfolio from '@/pages/Portfolio/Portfolio.page';

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
