// routes
import Router from './common/routes';
// theme
import ThemeProvider from './common/theme';
// components
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { permissionSelector } from './auth/login/login.slice';
import MotionLazyContainer from './common/components/animate/MotionLazyContainer';
import NotistackProvider from './common/components/NotistackProvider';
import ScrollToTop from './common/components/ScrollToTop';
import ThemeSettings from './common/components/settings';
import { CACHE_TIME } from './common/constants/common.constants';
import { buildAbilityFor } from './common/lib/ability';
import { AbilityContext } from './common/lib/Can';

// ----------------------------------------------------------------------
// Rebuild cloud run with env
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: CACHE_TIME,
    },
  },
});

export default function App() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const permissionAbility = useSelector(permissionSelector);
  const ability = buildAbilityFor(permissionAbility);
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <QueryClientProvider client={queryClient}>
            <NotistackProvider>
              <AbilityContext.Provider value={ability}>
                <ScrollToTop />
                <Router />
              </AbilityContext.Provider>
            </NotistackProvider>
          </QueryClientProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
