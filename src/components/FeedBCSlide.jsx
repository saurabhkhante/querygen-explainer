import React from 'react';

const FeedBCSlide = () => {
  return (
    <div className="w-[1080px] h-[1350px] bg-white relative overflow-hidden flex items-center justify-center">
      {/* Subtle background accents - WhatsApp green */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#25D366]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#25D366]/8 rounded-full blur-3xl"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-12">

        {/* Left Side: Headline */}
        <div className="flex-1 pr-8">
          <h1 className="text-[68px] font-black leading-[0.95] tracking-tight text-gray-900">
            Business<br/>card to<br/>contact<br/>
            <span className="text-[#25D366]">in 3 seconds</span>
          </h1>
          <p className="text-[32px] font-semibold text-gray-400 tracking-wide mt-8">Snap. Save. Done.</p>
        </div>

        {/* Right Side: Phone Mockup - HERO */}
        <div className="flex-shrink-0">
          {/* Phone Frame - Optimized for Feed */}
          <div className="w-[520px] h-[1040px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[55px] shadow-2xl relative overflow-hidden border-[10px] border-gray-950">

            {/* Screen Content */}
            <div className="absolute inset-[10px] bg-white rounded-[45px] overflow-hidden">

              {/* Status Bar */}
              <div className="h-[48px] bg-white flex items-center justify-between px-8 pt-2">
                <div className="text-[20px] font-semibold text-gray-900">9:41</div>
                <div className="flex gap-1.5">
                  <div className="w-[24px] h-[16px] bg-gray-900 rounded-sm"></div>
                  <div className="w-[16px] h-[16px] bg-gray-900 rounded-sm"></div>
                  <div className="w-[32px] h-[16px] bg-gray-900 rounded-sm"></div>
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="h-[80px] bg-[#075E54] flex items-center px-6 gap-3">
                <div className="w-[48px] h-[48px] rounded-full bg-[#25D366] flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[22px] font-semibold text-white">Querygen</div>
                  <div className="text-[14px] text-white/80">online</div>
                </div>
              </div>

              {/* Chat Content - Split View */}
              <div className="bg-[#E5DDD5] h-[862px] relative overflow-hidden">

                {/* Before: Business Card Photo - Top Half */}
                <div className="absolute top-6 left-6 right-6 h-[380px]">
                  <div className="bg-white rounded-2xl shadow-lg p-5 h-full">
                    {/* Simulated business card in chat */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl h-full flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                      {/* Camera icon overlay */}
                      <div className="absolute top-4 right-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      {/* Business card representation */}
                      <div className="text-center">
                        <div className="w-[220px] h-[130px] bg-white rounded-xl shadow-xl mx-auto border border-gray-200 flex flex-col items-center justify-center p-4">
                          <div className="w-10 h-10 rounded-full bg-[#25D366] mb-2"></div>
                          <div className="h-3 bg-gray-300 rounded w-24 mb-1.5"></div>
                          <div className="h-2.5 bg-gray-200 rounded w-20 mb-1.5"></div>
                          <div className="h-2.5 bg-gray-200 rounded w-22"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow / Transformation Indicator - Center */}
                <div className="absolute top-[400px] left-1/2 -translate-x-1/2 z-20">
                  <div className="w-[80px] h-[80px] bg-[#25D366] rounded-full shadow-xl flex items-center justify-center">
                    <svg className="w-11 h-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                {/* After: Saved Contact - Bottom Half */}
                <div className="absolute bottom-6 left-6 right-6 h-[380px]">
                  <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
                    {/* Contact Card Preview */}
                    <div className="bg-gradient-to-br from-[#25D366]/10 to-white rounded-xl h-full flex flex-col items-center justify-center border-2 border-[#25D366]/20 px-5">
                      {/* Contact avatar */}
                      <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] mb-5 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {/* Contact details */}
                      <div className="text-center space-y-2.5 w-full">
                        <div className="h-6 bg-gray-800 rounded-lg w-40 mx-auto"></div>
                        <div className="h-4 bg-gray-300 rounded w-28 mx-auto"></div>
                        <div className="h-4 bg-gray-300 rounded w-36 mx-auto"></div>
                        <div className="h-4 bg-gray-300 rounded w-26 mx-auto"></div>
                      </div>
                      {/* Checkmark badge */}
                      <div className="absolute top-6 right-6">
                        <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[28px] bg-gray-950 rounded-b-[20px]"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeedBCSlide;
