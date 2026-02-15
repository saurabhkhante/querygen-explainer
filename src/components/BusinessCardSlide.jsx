import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const BusinessCardSlide = () => {
  const whatsappUrl = 'https://wa.me/919309198683';

  return (
    <div className="min-h-screen bg-[#075E54] relative overflow-hidden flex items-center justify-center">
      {/* Subtle decorative elements for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#128C7E] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25D366] rounded-full blur-3xl opacity-15"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-12 max-w-6xl">
        <div className="text-[64px] text-white leading-tight font-light tracking-wide mb-8">
          You just took a photo of a business card on WhatsApp.
        </div>
        <div className="text-[80px] text-white font-black leading-tight tracking-tight">
          Querygen turned it into a contact.
        </div>
      </div>

      {/* QR Code with WhatsApp number - centered at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="bg-white p-3 rounded-xl shadow-lg">
          <QRCodeSVG
            value={whatsappUrl}
            size={100}
            level="H"
            includeMargin={false}
          />
        </div>
        <p className="text-xl text-white font-light tracking-widest opacity-90">querygen.ai</p>
      </div>
    </div>
  );
};

export default BusinessCardSlide;
