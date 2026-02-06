import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DataProvider } from "./contexts/DataContext";
import { UsersProvider } from "./contexts/UsersContext";
import { GoalsProvider } from "./contexts/GoalsContext";
import { QuestionnaireProvider } from "./contexts/QuestionnaireContext";
import { ActivitiesProvider } from "./contexts/ActivitiesContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Activities from "./pages/Activities";
import Home from "./pages/Home";
import Badges from "./pages/Badges";
import Rewards from "./pages/Rewards";
import Missions from "./pages/Missions";
import Team from "./pages/Team";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Questionnaire from "./pages/Questionnaire";
import Onboarding from "./pages/Onboarding";

function Router() {
  const { isAuthenticated, user } = useAuth();
  
  // Se o usuário está autenticado mas é primeiro acesso, redireciona para onboarding
  if (isAuthenticated && user?.isFirstAccess) {
    return <Onboarding />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/badges"} component={Badges} />
      <Route path={"/rewards"} component={Rewards} />
      <Route path={"/missions"} component={Missions} />
      <Route path={"/team"} component={Team} />
      <Route path={"/users"} component={Users} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/questionnaire"} component={Questionnaire} />
      <Route path={"/activities"} component={Activities} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <AuthProvider>
          <UsersProvider>
            <GoalsProvider>
              <ActivitiesProvider>
                <DataProvider>
                  <QuestionnaireProvider>
                    <TooltipProvider>
                      <Toaster />
                      <Router />
                    </TooltipProvider>
                  </QuestionnaireProvider>
                </DataProvider>
              </ActivitiesProvider>
            </GoalsProvider>
          </UsersProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
