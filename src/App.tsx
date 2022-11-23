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
import { Ability } from '@casl/ability';
import { AbilityContext } from './common/lib/Can';
import { buildAbilityFor} from './common/lib/ability';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { permissionSelector, setPermission } from './auth/login/login.slice';

// ----------------------------------------------------------------------
// Rebuild cloud run with env
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 2 * 1000 * 60
    },
  },
});

export default function App() {
  const permissionAbility = useSelector(permissionSelector)
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
