function A2Poster() {
  return (
    <div className="w-[420mm] h-[594mm] bg-[#075E54] flex flex-col items-center p-24 print:p-16 relative overflow-hidden" style={{paddingTop: '140px'}}>
      {/* Subtle decorative elements for depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#128C7E] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#25D366] rounded-full blur-3xl opacity-15"></div>

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center text-center max-w-7xl relative z-10">

        {/* Number and context unified */}
        <div className="mb-8">
          <div className="text-[240px] font-black text-white leading-none tracking-tighter drop-shadow-2xl mb-4">
            2,000
          </div>
          <div className="text-8xl text-white leading-tight font-light tracking-wide">
            WhatsApp messages
          </div>
        </div>

        {/* Continuation of context */}
        <div className="text-8xl text-white leading-tight font-light tracking-wide mb-14">
          ran your business yesterday.
        </div>

        {/* The knife-twist */}
        <div className="text-8xl text-white font-black leading-tight tracking-tight">
          You didn't see a single one.
        </div>
      </div>

      {/* Bottom branding with more presence */}
      <div className="absolute bottom-20 text-5xl text-white font-light tracking-widest opacity-90">
        querygen.ai
      </div>
    </div>
  );
}

export default A2Poster;
