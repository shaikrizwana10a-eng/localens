import { useState } from 'react';
import type { UserRole } from './types/travel';
import { DEMO_DESTINATIONS } from './data/destinations';
import { DEMO_TRANSPORT_ROUTES } from './data/transportRoutes';
import { DEMO_ACCOMMODATIONS } from './data/accommodations';
import { DEMO_FOOD_ITEMS } from './data/foodItems';
import { DEMO_VIDEO_REVIEWS } from './data/videoReviews';
import { DEMO_MISSIONS, DEMO_VERIFICATION_TASKS } from './data/missions';
import { DEMO_BUSINESS_ANALYTICS } from './data/businessData';

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
import { ContributorDashboardView } from './components/contributor/ContributorDashboardView';
import { BusinessDashboardView } from './components/business/BusinessDashboardView';
import { ForeignTouristView } from './components/foreign/ForeignTouristView';
import { UserProfileView } from './components/profile/UserProfileView';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('tourist');
  const [selectedDestId, setSelectedDestId] = useState<string>('tirupati');
  const [walletBalance, setWalletBalance] = useState<number>(1450);

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'business') {
      setCurrentView('business');
    } else if (newRole === 'contributor') {
      setCurrentView('contributor');
    } else if (newRole === 'foreign_tourist') {
      setCurrentView('home');
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
        onNavigate={setCurrentView}
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
            onNavigate={setCurrentView}
            userRole={userRole}
          />
        )}

        {currentView === 'destination' && (
          <DestinationView
            destinations={DEMO_DESTINATIONS}
            selectedDestId={selectedDestId}
            onSelectDestination={setSelectedDestId}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'planner' && (
          <TripPlannerView
            destinations={DEMO_DESTINATIONS}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'transport' && (
          <TransportExplorerView
            routes={DEMO_TRANSPORT_ROUTES}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'stays' && (
          <div className="space-y-12">
            <StayExplorerView
              stays={DEMO_ACCOMMODATIONS}
              onNavigate={setCurrentView}
            />
            <FoodExplorerView
              foodItems={DEMO_FOOD_ITEMS}
              onNavigate={setCurrentView}
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

        {currentView === 'verification' && (
          <VerificationView tasks={DEMO_VERIFICATION_TASKS} />
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
            onNavigate={setCurrentView}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}

export default App;
