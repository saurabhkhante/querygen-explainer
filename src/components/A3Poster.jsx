function A3Poster() {
  return (
    <div className="w-[297mm] h-[420mm] min-h-[420mm] bg-[#075E54] flex flex-col items-center p-16 print:p-0 relative overflow-hidden" style={{paddingTop: '130px'}}>
      {/* Subtle decorative elements for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#128C7E] rounded-full blur-3xl opacity-20 print:hidden"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25D366] rounded-full blur-3xl opacity-15 print:hidden"></div>

      {/* Main content container - centered vertically and horizontally */}
      <div className="flex flex-col items-center justify-center text-center max-w-5xl relative z-10 print:px-16">

        {/* Number and context unified */}
        <div className="mb-6">
          <div className="text-[160px] font-black text-white leading-none tracking-tighter drop-shadow-2xl mb-3">
            2,000
          </div>
          <div className="text-6xl text-white leading-tight font-light tracking-wide">
            WhatsApp messages
          </div>
        </div>

        {/* Continuation of context */}
        <div className="text-6xl text-white leading-tight font-light tracking-wide mb-10">
          ran your business yesterday.
        </div>

        {/* The knife-twist */}
        <div className="text-6xl text-white font-black leading-tight tracking-tight">
          You didn't see a single one.
        </div>
      </div>

      {/* Bottom branding with more presence */}
      <div className="absolute bottom-16 text-3xl text-white font-light tracking-widest opacity-90">
        querygen.ai
      </div>
    </div>
  );
}

export default A3Poster;
