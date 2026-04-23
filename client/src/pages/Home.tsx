import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { ShieldCheck, Zap, History } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (phone: string) => {
    navigate(`/result?phone=${encodeURIComponent(phone)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            CourierCheck <span className="text-blue-600">BD</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto font-medium">
            Verify customer delivery history across all major Bangladeshi couriers before shipping.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {[
            { icon: <ShieldCheck className="text-blue-500" size={32} />, title: "Fraud Detection", desc: "Instantly identify high-risk customers based on return history." },
            { icon: <History className="text-purple-500" size={32} />, title: "Cross-Platform", desc: "Aggregated data from Pathao, RedX, Steadfast, and more." },
            { icon: <Zap className="text-orange-500" size={32} />, title: "Real-time Results", desc: "Get comprehensive delivery stats in under a second." }
          ].map((feature, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-gray-100 bg-white/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            DISCLAIMER: Data is based on courier records shared by merchants. Use for reference only. 
            This is not a legal service. Accuracy depends on the data provided by external courier APIs.
          </p>
          <p className="mt-4 text-[10px] text-gray-300 uppercase tracking-widest font-bold">
            © 2026 CourierCheck BD - Empowering Bangladeshi E-commerce
          </p>
        </div>
      </footer>
    </div>
  );
};
