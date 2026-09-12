import React from 'react';
import type { 
  Destination, 
  TransportRoute, 
  Accommodation, 
  FoodItem, 
  VideoReview, 
  UserRole 
} from '../../types/travel';

import { HomeHero } from './HomeHero';
import { QuickCategoryBar } from './QuickCategoryBar';
import { VerifiedKnowledgeHighlight } from './VerifiedKnowledgeHighlight';
import { ExploreDestinations } from './ExploreDestinations';
import { TravelCategoriesSection } from './TravelCategoriesSection';
import { CommunityProcessSection } from './CommunityProcessSection';
import { AIPlannerPromo } from './AIPlannerPromo';
import { LocalRecommendations } from './LocalRecommendations';
import { ForeignTouristCard } from './ForeignTouristCard';
import { FinalCTASection } from './FinalCTASection';

interface HomeViewProps {
  destinations: Destination[];
  routes: TransportRoute[];
  stays: Accommodation[];
  foodItems: FoodItem[];
  videoReviews: VideoReview[];
  onSelectDestination: (destId: string) => void;
  onNavigate: (view: string) => void;
  userRole: UserRole;
}

export const HomeView: React.FC<HomeViewProps> = ({
  destinations,
  routes,
  stays,
  foodItems,
  onSelectDestination,
  onNavigate,
  userRole
}) => {
  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. Foreign Tourist Dedicated Guidance (Role-Activated) */}
      {userRole === 'foreign_tourist' && (
        <ForeignTouristCard />
      )}

      {/* 2. Main Travel Hero with Large Smart Search Panel */}
      <HomeHero
        destinations={destinations}
        onSelectDestination={onSelectDestination}
        onNavigate={onNavigate}
      />

      {/* 3. Quick Discovery Category Bar (Horizontal below Hero) */}
      <QuickCategoryBar onNavigate={onNavigate} />

      {/* 4. Verified Knowledge Highlight ("Know Before You Go") */}
      <VerifiedKnowledgeHighlight onNavigate={onNavigate} />

      {/* 5. Explore Local Destinations ("Explore Like a Local") */}
      <ExploreDestinations
        destinations={destinations}
        onSelectDestination={onSelectDestination}
        onNavigate={onNavigate}
      />

      {/* 6. Travel Categories ("Everything You Need for the Journey") */}
      <TravelCategoriesSection
        routes={routes}
        stays={stays}
        foodItems={foodItems}
        destinations={destinations}
        onNavigate={onNavigate}
      />

      {/* 7. Community Closed-Loop Verification ("Powered by Local Knowledge") */}
      <CommunityProcessSection
        onShareClick={() => onNavigate('share-knowledge')}
        onExploreClick={() => onNavigate('explore-knowledge')}
      />

      {/* 8. AI Trip Planner Promotion ("Plan Your Journey with LocalLens AI") */}
      <AIPlannerPromo onNavigate={onNavigate} />

      {/* 9. Local Recommendations ("LocalLens Recommendations" - Inspired by Offers UX) */}
      <LocalRecommendations
        stays={stays}
        foodItems={foodItems}
        routes={routes}
        destinations={destinations}
        onNavigate={onNavigate}
      />

      {/* 10. Final Call to Action */}
      <FinalCTASection onNavigate={onNavigate} />

    </div>
  );
};
