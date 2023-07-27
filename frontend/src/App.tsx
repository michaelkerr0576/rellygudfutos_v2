import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import useThemes from '@/hooks/shared/useThemes';
import ErrorBoundary from '@/layouts/ErrorBoundary/ErrorBoundary';
import Header from '@/layouts/Header/Header';
import ProtectedRoute from '@/layouts/ProtectedRoute/ProtectedRoute';
import DashboardPage from '@/pages/Dashboard/Dashboard.page';
import GalleryPage from '@/pages/Gallery/Gallery.page';
import ProfilePage from '@/pages/Profile/Profile.page';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  const { theme } = useThemes();

  return (
    <ErrorBoundary identifier="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <SnackbarProvider autoHideDuration={3000} />

          <Router>
            <Header />
            <Routes>
              {/* // * Public routes */}
              <Route path="/">
                <Route index element={<GalleryPage />} />
                <Route path="/photo/:photoId" element={<GalleryPage />} />
                <Route path="/account/login" element={<GalleryPage />} />
              </Route>

              {/* // * Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/account/profile" element={<ProfilePage />} />
                <Route path="/account/dashboard" element={<DashboardPage />} />
              </Route>

              {/* // * Catch all */}
              <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
          </Router>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
