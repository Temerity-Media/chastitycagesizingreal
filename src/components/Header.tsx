import React from 'react';
import { Lock } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chastity Cage Sizing Tool</h1>
              <p className="text-sm text-gray-600">Find your perfect fit</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}