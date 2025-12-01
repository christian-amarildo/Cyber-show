import React from 'react';
export function ImagePlaceholder() {
  return <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-blue-950/40 to-blue-900/20 border border-blue-800/30 rounded-xl flex items-center justify-center">
      {/* Simple, clean placeholder - just a frame for future image */}
      <div className="text-blue-700/20 text-center">
        <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-blue-700/20 rounded-lg" />
      </div>
    </div>;
}