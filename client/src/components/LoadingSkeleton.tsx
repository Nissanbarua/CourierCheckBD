import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/4" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-16 bg-gray-100 rounded-xl" />
            <div className="h-16 bg-gray-100 rounded-xl" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 bg-gray-50 rounded-lg" />
            <div className="h-12 bg-gray-50 rounded-lg" />
            <div className="h-12 bg-gray-50 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
