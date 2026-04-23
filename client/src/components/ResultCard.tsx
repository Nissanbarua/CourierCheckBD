import React from 'react';
import { CourierResult } from '../types/courier.types';
import { CourierBadge } from './CourierBadge';
import { AlertCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface ResultCardProps {
  result: CourierResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const {
    courierName,
    logoUrl,
    totalOrders,
    delivered,
    cancelled,
    returned,
    dataAvailable,
    apiStatus
  } = result;

  const successRate = totalOrders > 0 ? Math.round((delivered / totalOrders) * 100) : 0;

  const getRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-50 border-green-100';
    if (rate >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    return 'text-red-600 bg-red-50 border-red-100';
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3">
        <CourierBadge status={apiStatus} />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden">
          <img src={logoUrl} alt={courierName} className="max-w-full max-h-full object-contain p-1" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{courierName}</h3>
          {!dataAvailable && (
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <AlertCircle size={12} /> No records found
            </span>
          )}
        </div>
      </div>

      {dataAvailable ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Orders</p>
              <p className="text-xl font-black text-gray-700">{totalOrders}</p>
            </div>
            <div className={`p-3 rounded-xl border flex flex-col justify-center ${getRateColor(successRate)}`}>
              <p className="text-[10px] uppercase font-bold opacity-70 tracking-wider">Success Rate</p>
              <p className="text-xl font-black">{successRate}%</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 rounded-lg bg-green-50/50">
              <CheckCircle2 size={16} className="text-green-500 mb-1" />
              <span className="text-lg font-bold text-green-700">{delivered}</span>
              <span className="text-[10px] font-medium text-green-600 uppercase">Deliv.</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-red-50/50">
              <XCircle size={16} className="text-red-500 mb-1" />
              <span className="text-lg font-bold text-red-700">{cancelled}</span>
              <span className="text-[10px] font-medium text-red-600 uppercase">Canc.</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-orange-50/50">
              <RotateCcw size={16} className="text-orange-500 mb-1" />
              <span className="text-lg font-bold text-orange-700">{returned}</span>
              <span className="text-[10px] font-medium text-orange-600 uppercase">Ret.</span>
            </div>
          </div>
        </>
      ) : (
        <div className="py-8 text-center flex flex-col items-center justify-center opacity-40">
          <AlertCircle size={32} className="mb-2" />
          <p className="text-sm font-medium">No activity recorded</p>
        </div>
      )}
    </div>
  );
};
