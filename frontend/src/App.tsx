import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import Dashboard from '@/pages/Dashboard/Dashboard.page';
import Gallery from '@/pages/Gallery/Gallery.page';
import Login from '@/pages/Login/Login.page';
import Photo from '@/pages/Photo/Photo.page';
import Portfolio from '@/pages/Portfolio/Portfolio.page';

const theme = createTheme();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Gallery />} />

          <Route path="/gallery">
            <Route index element={<Gallery />} />
            <Route path=":photoId" element={<Photo />} />
          </Route>

          <Route path="/admin">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/portfolio" element={<Portfolio />} />

          <Route path="/*" element={<Gallery />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
