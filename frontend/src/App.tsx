import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import useThemes from '@/hooks/useThemes';
import ErrorBoundary from '@/layouts/ErrorBoundary/ErrorBoundary';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import Dashboard from '@/pages/Dashboard/Dashboard.page';
import Gallery from '@/pages/Gallery/Gallery.page';
import Login from '@/pages/Login/Login.page';
import Photo from '@/pages/Photo/Photo.page';

export default function App(): JSX.Element {
  const { theme } = useThemes();

  return (
    <ErrorBoundary identifier="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/">
              <Route index element={<Gallery />} />
              <Route path="/gallery/:photoId" element={<Photo />} />
            </Route>

            <Route path="/account">
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
