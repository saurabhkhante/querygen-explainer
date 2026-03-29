import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const A5Flyer = () => {
  const qrUrl = 'https://querygen.ai/ai-summit?utm_source=print&utm_medium=a5_flyer&utm_campaign=india_ai_summit_2026';

  return (
    <div className="a5-page bg-gradient-to-br from-[#fafaf8] via-[#f5f5f3] to-[#fafaf8] relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4500] opacity-8 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#0d3d2d] opacity-5 rounded-full blur-3xl -ml-28 -mb-28" />

      <div className="relative p-8 h-full flex flex-col text-center">
        {/* Main copy - positioned higher */}
        <div className="mt-16 mb-12 max-w-md mx-auto">
          <h1 className="text-[30px] leading-[1.15] font-bold tracking-tight text-[#1a1a1a] mb-6">
            There are 6 WhatsApp groups running your business right now.
          </h1>

          <p className="text-[28px] leading-[1.2] font-bold tracking-tight text-[#666] mb-4">
            You're in 2 of them.
          </p>

          <p className="text-[32px] leading-[1.1] font-black tracking-tight text-[#1a1a1a]">
            Scan to see all 6
          </p>
        </div>

        {/* QR Code - pushed down with flex-grow spacer */}
        <div className="flex-grow"></div>
        <div className="flex flex-col items-center mb-16">
          <div className="bg-white p-4 rounded-2xl shadow-2xl print:shadow-none border-2 border-gray-200">
            <QRCodeSVG
              value={qrUrl}
              size={140}
              level="H"
            />
          </div>
          <p className="text-[16px] font-bold text-[#1a1a1a] text-center mt-4">querygen.ai</p>
        </div>

        {/* Subtle tagline at bottom */}
        <div className="absolute bottom-6 left-0 right-0">
          <p className="text-[10px] text-[#999] text-center tracking-wide">
            See every conversation, without joining a single group
          </p>
        </div>
      </div>
    </div>
  );
};

export default A5Flyer;
