import React from 'react';

const StoriesBCSlide = () => {
  return (
    <div className="w-[1080px] h-[1920px] bg-white relative overflow-hidden flex flex-col items-center justify-center">
      {/* Subtle background accents - WhatsApp green */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#25D366]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#25D366]/8 rounded-full blur-3xl"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-12">

        {/* Headline - Top */}
        <div className="absolute top-[120px] left-0 right-0 text-center px-16">
          <h1 className="text-[72px] font-black leading-[0.95] tracking-tight text-gray-900">
            Business card<br/>to contact<br/>
            <span className="text-[#25D366]">in 3 seconds</span>
          </h1>
        </div>

        {/* Phone Mockup - HERO - Center Stage */}
        <div className="mt-[200px] relative">
          {/* Phone Frame - Large and Prominent */}
          <div className="w-[700px] h-[1260px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[70px] shadow-2xl relative overflow-hidden border-[12px] border-gray-950">

            {/* Screen Content */}
            <div className="absolute inset-[12px] bg-white rounded-[58px] overflow-hidden">

              {/* Status Bar */}
              <div className="h-[60px] bg-white flex items-center justify-between px-10 pt-3">
                <div className="text-[24px] font-semibold text-gray-900">9:41</div>
                <div className="flex gap-2">
                  <div className="w-[30px] h-[20px] bg-gray-900 rounded-sm"></div>
                  <div className="w-[20px] h-[20px] bg-gray-900 rounded-sm"></div>
                  <div className="w-[40px] h-[20px] bg-gray-900 rounded-sm"></div>
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="h-[100px] bg-[#075E54] flex items-center px-8 gap-4">
                <div className="w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center">
                  <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[28px] font-semibold text-white">Querygen</div>
                  <div className="text-[18px] text-white/80">online</div>
                </div>
              </div>

              {/* Chat Content - Split View */}
              <div className="bg-[#E5DDD5] h-[1040px] relative overflow-hidden">

                {/* Before: Business Card Photo - Top Half */}
                <div className="absolute top-8 left-8 right-8 h-[460px]">
                  <div className="bg-white rounded-3xl shadow-lg p-6 h-full">
                    {/* Simulated business card in chat */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl h-full flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                      {/* Camera icon overlay */}
                      <div className="absolute top-6 right-6">
                        <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      {/* Business card representation */}
                      <div className="text-center">
                        <div className="w-[280px] h-[160px] bg-white rounded-xl shadow-xl mx-auto border border-gray-200 flex flex-col items-center justify-center p-6">
                          <div className="w-12 h-12 rounded-full bg-[#25D366] mb-3"></div>
                          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-28"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow / Transformation Indicator - Center */}
                <div className="absolute top-[490px] left-1/2 -translate-x-1/2 z-20">
                  <div className="w-[100px] h-[100px] bg-[#25D366] rounded-full shadow-xl flex items-center justify-center">
                    <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                {/* After: Saved Contact - Bottom Half */}
                <div className="absolute bottom-8 left-8 right-8 h-[460px]">
                  <div className="bg-white rounded-3xl shadow-lg p-8 h-full">
                    {/* Contact Card Preview */}
                    <div className="bg-gradient-to-br from-[#25D366]/10 to-white rounded-2xl h-full flex flex-col items-center justify-center border-2 border-[#25D366]/20 px-6">
                      {/* Contact avatar */}
                      <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] mb-6 flex items-center justify-center">
                        <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {/* Contact details */}
                      <div className="text-center space-y-3 w-full">
                        <div className="h-7 bg-gray-800 rounded-lg w-48 mx-auto"></div>
                        <div className="h-5 bg-gray-300 rounded w-36 mx-auto"></div>
                        <div className="h-5 bg-gray-300 rounded w-44 mx-auto"></div>
                        <div className="h-5 bg-gray-300 rounded w-32 mx-auto"></div>
                      </div>
                      {/* Checkmark badge */}
                      <div className="absolute top-8 right-8">
                        <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[35px] bg-gray-950 rounded-b-[25px]"></div>
          </div>
        </div>

      </div>

      {/* Bottom tagline - minimal */}
      <div className="absolute bottom-[80px] left-0 right-0 text-center">
        <p className="text-[36px] font-semibold text-gray-400 tracking-wide">Snap. Save. Done.</p>
      </div>
    </div>
  );
};

export default StoriesBCSlide;
