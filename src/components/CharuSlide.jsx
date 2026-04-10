import React from 'react';

const CharuSlide = () => {
  return (
    <div className="min-h-screen bg-[#075E54] relative overflow-hidden flex items-center justify-center">
      {/* Subtle decorative elements for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#128C7E] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25D366] rounded-full blur-3xl opacity-15"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-12 max-w-6xl">
        <div className="text-[64px] text-white leading-tight font-light tracking-wide mb-8">
          <span className="font-black text-[72px]">₹1.27 lakh</span> in daily fuel costs.<br />
          Zero way to verify a single receipt.
        </div>
        <div className="text-[80px] text-white font-black leading-tight tracking-tight">
          Until now.
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-12 text-2xl text-white font-light tracking-widest opacity-90">
        querygen.ai
      </div>
    </div>
  );
};

export default CharuSlide;
