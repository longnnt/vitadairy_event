// routes
import Router from './common/routes';
// theme
import ThemeProvider from './common/theme';
// components
import ThemeSettings from './common/components/settings';
import ScrollToTop from './common/components/ScrollToTop';
import NotistackProvider from './common/components/NotistackProvider';
import MotionLazyContainer from './common/components/animate/MotionLazyContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-quill/dist/quill.snow.css';

// ----------------------------------------------------------------------
// Rebuild cloud run with env
export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <QueryClientProvider client={queryClient}>
            <NotistackProvider>
              <ScrollToTop />
              <Router />
            </NotistackProvider>
          </QueryClientProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
