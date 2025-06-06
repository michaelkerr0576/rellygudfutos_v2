import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import useThemes from '@/hooks/shared/useThemes';
import ErrorBoundary from '@/layouts/ErrorBoundary/ErrorBoundary';
import Header from '@/layouts/Header/Header';
import LoginDialog from '@/layouts/Header/partials/LoginDialog';
import ProtectedRoute from '@/layouts/ProtectedRoute/ProtectedRoute';
import DashboardPage from '@/pages/Dashboard/Dashboard.page';
import GalleryPage from '@/pages/Gallery/Gallery.page';
import PhotoDialog from '@/pages/Gallery/partials/PhotoDialog';
import ProfilePage from '@/pages/Profile/Profile.page';
import { AuthRole } from '@/types/store/auth.types';

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
              <Route element={<GalleryPage />} path="/">
                {/* // * Gallery dialog routes */}
                <Route element={<PhotoDialog />} path="/photo/:photoId" />
                <Route element={<LoginDialog />} path="/login" />
              </Route>

              {/* // * Protected routes at a user level */}
              <Route element={<ProtectedRoute accessLevel={AuthRole.USER} />}>
                <Route element={<ProfilePage />} path="/account/profile" />
                <Route element={<DashboardPage />} path="/account/dashboard" />
              </Route>

              {/* // * Catch all */}
              <Route element={<Navigate replace to="/" />} path="/*" />
            </Routes>
          </Router>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
