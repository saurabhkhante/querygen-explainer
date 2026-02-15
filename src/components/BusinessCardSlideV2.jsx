import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const BusinessCardSlideV2 = () => {
  const whatsappUrl = 'https://wa.me/919309198683';

  return (
    <div className="min-h-screen bg-[#075E54] relative overflow-hidden flex items-center justify-center">
      {/* Subtle decorative elements for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#128C7E] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25D366] rounded-full blur-3xl opacity-15"></div>

      {/* Phone mockup visualization - positioned on the right side */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 opacity-30">
        {/* Phone frame */}
        <div className="w-[320px] h-[580px] bg-white/15 rounded-[40px] border-4 border-white/30 p-4 backdrop-blur-sm">
          {/* WhatsApp header */}
          <div className="bg-[#25D366]/30 h-12 rounded-t-2xl mb-4 flex items-center px-3">
            <div className="w-8 h-8 rounded-full bg-white/20"></div>
          </div>

          {/* Message bubble with business card */}
          <div className="bg-white/10 rounded-2xl p-3 mb-4">
            <div className="w-full h-32 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center my-2">
            <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Contact card result */}
          <div className="bg-white/10 rounded-2xl p-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-white/20 rounded w-3/4"></div>
                <div className="h-2 bg-white/10 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-2 bg-white/10 rounded w-full"></div>
              <div className="h-2 bg-white/10 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-left px-12 max-w-3xl">
        <div className="text-[64px] text-white leading-tight font-light tracking-wide mb-8">
          You just took a photo of a business card on WhatsApp.
        </div>
        <div className="text-[80px] text-white font-black leading-tight tracking-tight">
          Querygen turned it into a contact.
        </div>
      </div>

      {/* QR Code with WhatsApp number */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4">
        <div className="bg-white p-3 rounded-xl shadow-lg">
          <QRCodeSVG
            value={whatsappUrl}
            size={100}
            level="H"
            includeMargin={false}
          />
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/60 mb-1">Message us</p>
          <p className="text-xl text-white font-light tracking-widest opacity-90">querygen.ai</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardSlideV2;
