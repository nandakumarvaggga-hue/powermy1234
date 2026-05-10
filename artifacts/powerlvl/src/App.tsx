import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Scanner from './pages/Scanner';
import Feed from './pages/Feed';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

type Page = 'landing' | 'scanner' | 'feed' | 'leaderboard' | 'profile';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function App() {
  const [activePage, setActivePage] = useState<Page>('landing');

  const navigate = (page: string) => {
    setActivePage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNav = activePage !== 'landing';

  return (
    <div className="min-h-screen bg-black text-white">
      {showNav && <Nav activePage={activePage} onNavigate={navigate} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {activePage === 'landing' && <Landing onNavigate={navigate} />}
          {activePage === 'scanner' && <Scanner />}
          {activePage === 'feed' && <Feed />}
          {activePage === 'leaderboard' && <Leaderboard />}
          {activePage === 'profile' && <Profile onNavigate={navigate} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
