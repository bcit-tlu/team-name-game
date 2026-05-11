import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout, { APP_MAX_WIDTH } from './components/Layout';
import HomePage from './pages/HomePage';
import TeamMemberName from './pages/TeamMemberName';
import TeamMemberTeams from './pages/TeamMemberTeams';
import TeamRegister from './pages/TeamRegister';
import TeamComplete from './pages/TeamComplete';
import AdjudicatorName from './pages/AdjudicatorName';
import AdjudicatorTeams from './pages/AdjudicatorTeams';
import AdjudicatorReview from './pages/AdjudicatorReview';
import TimerName from './pages/TimerName';
import TimerDisplay from './pages/TimerDisplay';
import WeaverName from './pages/WeaverName';
import WeaverCamera from './pages/WeaverCamera';
import TeamsPage from './pages/TeamsPage';
import TeamDetail from './pages/TeamDetail';
import ProfilePage from './pages/ProfilePage';
import FeedbackPage from './pages/FeedbackPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Box
      sx={{
        maxWidth: APP_MAX_WIDTH,
        mx: 'auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/team-member" element={<TeamMemberName />} />
          <Route path="/team-member/teams" element={<TeamMemberTeams />} />
          <Route path="/team-member/register" element={<TeamRegister />} />
          <Route path="/team-member/complete" element={<TeamComplete />} />
          <Route path="/adjudicator" element={<AdjudicatorName />} />
          <Route path="/adjudicator/teams" element={<AdjudicatorTeams />} />
          <Route path="/adjudicator/review/:teamId" element={<AdjudicatorReview />} />
          <Route path="/timer" element={<TimerName />} />
          <Route path="/timer/display" element={<TimerDisplay />} />
          <Route path="/weaver" element={<WeaverName />} />
          <Route path="/weaver/camera" element={<WeaverCamera />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
