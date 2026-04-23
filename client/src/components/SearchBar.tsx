import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { z } from 'zod';

const phoneSchema = z.string().regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, "Please enter a valid Bangladeshi mobile number");

interface SearchBarProps {
  onSearch: (phone: string) => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Basic auto-formatting: ensure it doesn't get too long or has weird chars
    value = value.replace(/[^\d+]/g, '');
    setPhone(value);
    
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      phoneSchema.parse(phone);
      onSearch(phone);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <span className="mr-2 text-xl">🇧🇩</span>
          <Search size={20} />
        </div>
        <input
          type="text"
          value={phone}
          onChange={handleInputChange}
          placeholder="Enter customer phone (e.g. 01712345678)"
          className={`w-full pl-16 pr-32 py-4 bg-white border-2 rounded-2xl shadow-lg outline-none transition-all duration-200 text-lg ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center gap-2"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
        </button>
      </form>
      {error && (
        <p className="mt-2 ml-4 text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};
