import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePhoneSearch } from '../hooks/usePhoneSearch';
import { FraudScoreMeter } from '../components/FraudScoreMeter';
import { ResultCard } from '../components/ResultCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ArrowLeft, Phone, Calendar, RefreshCw } from 'lucide-react';

export const Result: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const phone = searchParams.get('phone') || '';

  const { data, isLoading, isError, refetch } = usePhoneSearch(phone, !!phone);

  const formattedDate = data ? new Date(data.searchedAt).toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'medium',
    timeStyle: 'short'
  }) : '';

  if (!phone) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            <Phone size={14} className="text-blue-600" />
            <span className="font-bold text-blue-700">{data?.normalizedPhone || phone}</span>
          </div>
          <button 
            onClick={() => refetch()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            title="Refresh Data"
          >
            <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8">
        {isLoading ? (
          <div className="space-y-8">
            <div className="w-48 h-64 bg-gray-200 rounded-3xl mx-auto animate-pulse" />
            <LoadingSkeleton />
          </div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <Phone size={32} />
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Search Failed</h2>
            <p className="text-red-600 mb-6">We couldn't retrieve data for this number. Please try again.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              Go Back Home
            </button>
          </div>
        ) : data ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Section: Score & Meta */}
            <div className="flex flex-col items-center">
              <FraudScoreMeter score={data.fraudScore} riskLevel={data.riskLevel} />
              <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Calendar size={14} />
                <span>Checked at: {formattedDate} (Dhaka Time)</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                Courier Insights
                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-md uppercase tracking-tighter">
                  {data.results.length} Sources
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.results.map((res, idx) => (
                  <ResultCard key={idx} result={res} />
                ))}
              </div>
            </div>

            {/* Search Again */}
            <div className="flex justify-center pt-8">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
              >
                <RefreshCw size={20} />
                Search Another Number
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};
