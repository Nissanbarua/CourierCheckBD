import React, { useEffect, useState } from 'react';

interface FraudScoreMeterProps {
  score: number;
  riskLevel: 'low' | 'medium' | 'high' | 'blacklisted';
}

export const FraudScoreMeter: React.FC<FraudScoreMeterProps> = ({ score, riskLevel }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = () => {
    if (score <= 25) return '#22c55e'; // green-500
    if (score <= 50) return '#eab308'; // yellow-500
    if (score <= 80) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  const getLabel = () => {
    switch (riskLevel) {
      case 'low': return '✅ Low Risk';
      case 'medium': return '⚠️ Medium Risk';
      case 'high': return '🔴 High Risk';
      case 'blacklisted': return '⛔ Blacklisted';
      default: return 'Unknown';
    }
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="relative w-48 h-48">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="45"
            fill="transparent"
            stroke="#f3f4f6"
            strokeWidth="10"
          />
          {/* Progress Circle */}
          <circle
            cx="96"
            cy="96"
            r="45"
            fill="transparent"
            stroke={getColor()}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-gray-800">{Math.round(animatedScore)}</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Score</span>
        </div>
      </div>
      <div className={`mt-4 px-6 py-2 rounded-full font-bold text-lg ${
        riskLevel === 'low' ? 'bg-green-100 text-green-700' :
        riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
        riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
        'bg-red-100 text-red-700'
      }`}>
        {getLabel()}
      </div>
    </div>
  );
};
