<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import { useState } from 'react';
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
import type { UserRole } from './types/travel';
import { DEMO_DESTINATIONS } from './data/destinations';
import { DEMO_TRANSPORT_ROUTES } from './data/transportRoutes';
import { DEMO_ACCOMMODATIONS } from './data/accommodations';
import { DEMO_FOOD_ITEMS } from './data/foodItems';
import { DEMO_VIDEO_REVIEWS } from './data/videoReviews';
import { DEMO_MISSIONS, DEMO_VERIFICATION_TASKS } from './data/missions';
import { DEMO_BUSINESS_ANALYTICS } from './data/businessData';

import { LocalKnowledgeProvider } from './context/LocalKnowledgeContext';
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext';
=======
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { DestinationView } from './components/destination/DestinationView';
import { TripPlannerView } from './components/planner/TripPlannerView';
import { TransportExplorerView } from './components/transport/TransportExplorerView';
import { StayExplorerView } from './components/stay/StayExplorerView';
import { FoodExplorerView } from './components/food/FoodExplorerView';
import { VideoReviewsView } from './components/video/VideoReviewsView';
import { MissionsView } from './components/contribution/MissionsView';
import { VerificationView } from './components/verification/VerificationView';
import { VerificationWorkflowView } from './components/verification/VerificationWorkflowView';
import { ContributorDashboardView } from './components/contributor/ContributorDashboardView';
import { BusinessDashboardView } from './components/business/BusinessDashboardView';
import { ForeignTouristView } from './components/foreign/ForeignTouristView';
import { UserProfileView } from './components/profile/UserProfileView';
import { LocalKnowledgeExplorer } from './components/knowledge/LocalKnowledgeExplorer';
import { ShareKnowledgeForm } from './components/knowledge/ShareKnowledgeForm';

export function AppContent() {
<<<<<<< HEAD
  const [currentView, setCurrentView] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\/+/, '');
    return path || 'home';
  });
=======
  const [currentView, setCurrentView] = useState<string>('home');
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  const [userRole, setUserRole] = useState<UserRole>('tourist');
  const [selectedDestId, setSelectedDestId] = useState<string>('tirupati');
  const [walletBalance, setWalletBalance] = useState<number>(1450);

<<<<<<< HEAD
  // Sync browser URL with view navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+/, '');
      setCurrentView(path || 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToView = (view: string) => {
    setCurrentView(view);
    const targetPath = view === 'home' ? '/' : `/${view}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'business') {
      navigateToView('business');
    } else if (newRole === 'contributor') {
      navigateToView('contributor');
    } else if (newRole === 'foreign_tourist') {
      navigateToView('home');
=======
  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'business') {
      setCurrentView('business');
    } else if (newRole === 'contributor') {
      setCurrentView('contributor');
    } else if (newRole === 'foreign_tourist') {
      setCurrentView('home');
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
    }
  };

  const handleCompleteMission = (_missionId: string, reward: number) => {
    setWalletBalance((prev) => prev + reward);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917] flex flex-col font-sans">
      
      {/* Navigation Header with Role Switcher */}
      <Header
        currentView={currentView}
<<<<<<< HEAD
        onNavigate={navigateToView}
=======
        onNavigate={setCurrentView}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
        userRole={userRole}
        onRoleChange={handleRoleChange}
        walletBalance={walletBalance}
      />

      {/* Main Page View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentView === 'home' && (
          <HomeView
            destinations={DEMO_DESTINATIONS}
            routes={DEMO_TRANSPORT_ROUTES}
            stays={DEMO_ACCOMMODATIONS}
            foodItems={DEMO_FOOD_ITEMS}
            videoReviews={DEMO_VIDEO_REVIEWS}
            onSelectDestination={setSelectedDestId}
<<<<<<< HEAD
            onNavigate={navigateToView}
=======
            onNavigate={setCurrentView}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
            userRole={userRole}
          />
        )}

        {currentView === 'explore-knowledge' && (
          <LocalKnowledgeExplorer
<<<<<<< HEAD
            onNavigateToShare={() => navigateToView('share-knowledge')}
=======
            onNavigateToShare={() => setCurrentView('share-knowledge')}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
          />
        )}

        {currentView === 'share-knowledge' && (
          <ShareKnowledgeForm
<<<<<<< HEAD
            onNavigateToExplore={() => navigateToView('explore-knowledge')}
=======
            onNavigateToExplore={() => setCurrentView('explore-knowledge')}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
          />
        )}

        {currentView === 'verification' && (
          <VerificationWorkflowView />
        )}

        {currentView === 'destination' && (
          <DestinationView
            destinations={DEMO_DESTINATIONS}
            selectedDestId={selectedDestId}
            onSelectDestination={setSelectedDestId}
<<<<<<< HEAD
            onNavigate={navigateToView}
=======
            onNavigate={setCurrentView}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
          />
        )}

        {currentView === 'planner' && (
          <TripPlannerView
            destinations={DEMO_DESTINATIONS}
<<<<<<< HEAD
            onNavigate={navigateToView}
=======
            onNavigate={setCurrentView}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
          />
        )}

        {currentView === 'transport' && (
          <TransportExplorerView
            routes={DEMO_TRANSPORT_ROUTES}
<<<<<<< HEAD
            onNavigate={navigateToView}
=======
            onNavigate={setCurrentView}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
          />
        )}

        {currentView === 'stays' && (
          <div className="space-y-12">
            <StayExplorerView
              stays={DEMO_ACCOMMODATIONS}
<<<<<<< HEAD
              onNavigate={navigateToView}
            />
            <FoodExplorerView
              foodItems={DEMO_FOOD_ITEMS}
              onNavigate={navigateToView}
=======
              onNavigate={setCurrentView}
            />
            <FoodExplorerView
              foodItems={DEMO_FOOD_ITEMS}
              onNavigate={setCurrentView}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
            />
          </div>
        )}

        {currentView === 'video' && (
          <VideoReviewsView videoReviews={DEMO_VIDEO_REVIEWS} />
        )}

        {currentView === 'missions' && (
          <div className="space-y-12">
            <MissionsView
              missions={DEMO_MISSIONS}
              onCompleteMission={handleCompleteMission}
              walletBalance={walletBalance}
            />
            <VerificationView tasks={DEMO_VERIFICATION_TASKS} />
          </div>
        )}

        {currentView === 'contributor' && (
          <ContributorDashboardView walletBalance={walletBalance} />
        )}

        {currentView === 'business' && (
          <BusinessDashboardView businessData={DEMO_BUSINESS_ANALYTICS} />
        )}

        {currentView === 'foreign' && (
          <ForeignTouristView />
        )}

        {currentView === 'profile' && (
          <UserProfileView
            destinations={DEMO_DESTINATIONS}
            stays={DEMO_ACCOMMODATIONS}
<<<<<<< HEAD
            onNavigate={navigateToView}
=======
            onNavigate={setCurrentView}
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}

export function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <LocalKnowledgeProvider>
        <AppContent />
      </LocalKnowledgeProvider>
    </AuthProvider>
=======
    <LocalKnowledgeProvider>
      <AppContent />
    </LocalKnowledgeProvider>
>>>>>>> 76d01077d216a088f5329117e7a7a53bc5c10c04
  );
}

export default App;
