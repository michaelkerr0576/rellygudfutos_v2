import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import useThemes from '@/hooks/shared/useThemes';
import ErrorBoundary from '@/layouts/ErrorBoundary/ErrorBoundary';
import Header from '@/layouts/Header/Header';
import DashboardPage from '@/pages/Dashboard/Dashboard.page';
import GalleryPage from '@/pages/Gallery/Gallery.page';
import LoginPage from '@/pages/Login/Login.page';
import ProfilePage from '@/pages/Profile/Profile.page';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  const { theme } = useThemes();

  return (
    <ErrorBoundary identifier="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Routes>
              <Route path="/">
                <Route index element={<GalleryPage />} />
                <Route path="/photo/:photoId" element={<GalleryPage />} />
              </Route>

              <Route path="/account">
                <Route index element={<LoginPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="dashboard" element={<DashboardPage />} />
              </Route>

              <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
          </Router>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
