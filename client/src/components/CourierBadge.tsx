import React from 'react';

interface CourierBadgeProps {
  status: 'mock' | 'live' | 'error';
}

export const CourierBadge: React.FC<CourierBadgeProps> = ({ status }) => {
  if (status === 'mock') {
    return (
      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-600 rounded-md border border-purple-200">
        Demo Data
      </span>
    );
  }
  if (status === 'error') {
    return (
      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 rounded-md border border-red-200">
        Unavailable
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-600 rounded-md border border-green-200">
      Live Data
    </span>
  );
};
