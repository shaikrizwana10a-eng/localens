import React from 'react';

type SkeletonVariant = 'transport' | 'stay' | 'food' | 'destination' | 'generic';

interface SkeletonCardProps {
  variant?: SkeletonVariant;
  count?: number;
}

const SingleSkeleton: React.FC<{ variant: SkeletonVariant }> = ({ variant }) => {
  if (variant === 'transport') {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="skeleton-shimmer w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton-shimmer h-4 w-3/4 rounded" />
            <div className="skeleton-shimmer h-3 w-1/2 rounded" />
          </div>
        </div>
        <div className="skeleton-shimmer h-20 rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          <div className="skeleton-shimmer h-4 rounded" />
          <div className="skeleton-shimmer h-4 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
          <div className="skeleton-shimmer h-9 rounded-xl" />
          <div className="skeleton-shimmer h-9 rounded-xl" />
        </div>
      </div>
    );
  }

  if (variant === 'stay' || variant === 'food') {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden animate-pulse">
        <div className="skeleton-shimmer h-40 w-full" style={{ borderRadius: 0 }} />
        <div className="p-4 space-y-3">
          <div className="skeleton-shimmer h-5 w-3/4 rounded" />
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="flex items-center space-x-2">
            <div className="skeleton-shimmer h-6 w-16 rounded-lg" />
            <div className="skeleton-shimmer h-6 w-12 rounded-lg" />
          </div>
          <div className="skeleton-shimmer h-9 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (variant === 'destination') {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden animate-pulse">
        <div className="skeleton-shimmer h-48 w-full" style={{ borderRadius: 0 }} />
        <div className="p-5 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="skeleton-shimmer h-5 w-16 rounded-md" />
            <div className="skeleton-shimmer h-5 w-20 rounded-md" />
          </div>
          <div className="skeleton-shimmer h-6 w-2/3 rounded" />
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="skeleton-shimmer h-3 w-4/5 rounded" />
        </div>
      </div>
    );
  }

  // Generic skeleton
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="skeleton-shimmer w-10 h-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton-shimmer h-4 w-3/4 rounded" />
          <div className="skeleton-shimmer h-3 w-1/2 rounded" />
        </div>
      </div>
      <div className="skeleton-shimmer h-16 rounded-xl" />
      <div className="skeleton-shimmer h-4 w-full rounded" />
      <div className="skeleton-shimmer h-4 w-2/3 rounded" />
    </div>
  );
};

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  variant = 'generic',
  count = 1
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SingleSkeleton key={i} variant={variant} />
      ))}
    </>
  );
};
