import { QRCodeSVG } from 'qrcode.react';
import { ArrowRight, MessageCircle, FileSpreadsheet, BarChart3, Truck, Fuel, Package, TrendingUp } from 'lucide-react';

const BackSide = () => {
  const qrUrl = 'https://querygen.ai/ai-summit?utm_source=print&utm_medium=explainer&utm_campaign=india_ai_summit_2026';

  return (
    <div className="a4-page bg-gradient-to-br from-[#fafaf8] via-[#f5f5f3] to-[#fafaf8] relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#25D366] opacity-5 rounded-full blur-3xl -ml-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#34A853] opacity-5 rounded-full blur-3xl -mr-40 -mb-40" />

      <div className="relative p-12 h-full flex flex-col">
        {/* Header with QR */}
        <div className="mb-8 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#0d3d2d] bg-[#d4ff00]/20 px-3 py-1 rounded-full">Case Study</span>
            </div>
            <h1 className="text-[42px] leading-[1.1] font-bold tracking-tight text-[#1a1a1a] mb-3">
              Charu Construction
            </h1>
            <p className="text-[15px] text-[#666] leading-relaxed">
              From manual logs to automated fleet intelligence — in one week.
            </p>
          </div>

          {/* QR Code - Top Right */}
          <div className="ml-6 flex-shrink-0">
            <div className="bg-white p-3 rounded-xl shadow-lg print:shadow-none border border-gray-200">
              <QRCodeSVG
                value={qrUrl}
                size={60}
                level="H"
              />
            </div>
            <p className="text-[9px] text-[#666] text-center mt-1">Message us</p>
            <p className="text-[10px] font-bold text-[#1a1a1a] text-center mt-1.5">querygen.ai</p>
          </div>
        </div>

        {/* Three-stage transformation - horizontal flow */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-6">
            {/* Stage 1: WhatsApp */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg print:shadow-none border border-gray-100 h-full">
                <div className="bg-gradient-to-r from-[#25D366] to-[#20BA5A] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-white/20 rounded-lg">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-white">WhatsApp</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {[
                    { text: '50.DYKE TO HALD', sub: '2899 DC : 04', wt: 'WT: 45.01' },
                    { text: '51.DYKE TO HALD', sub: 'DC 5182: 06', wt: 'WT: 42.27' },
                    { text: '52.DYKE TO HALD', sub: 'BG 7450, 03', wt: 'WT: 29.99' },
                  ].map((msg, idx) => (
                    <div key={idx} className="bg-[#dcf8c6] rounded-xl p-2.5 text-[11px] shadow-sm print:shadow-none">
                      <div className="font-semibold text-[#1a1a1a]">{msg.text}</div>
                      <div className="text-[#555]">{msg.sub}</div>
                      <div className="font-medium text-[#0d3d2d]">{msg.wt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center pt-20">
              <div className="p-2 bg-white rounded-full shadow-md print:shadow-none">
                <ArrowRight className="w-5 h-5 text-[#0d3d2d]" strokeWidth={2.5} />
              </div>
            </div>

            {/* Stage 2: Google Sheets */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg print:shadow-none border border-gray-100 h-full">
                <div className="bg-gradient-to-r from-[#34A853] to-[#2D8E47] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-white/20 rounded-lg">
                      <FileSpreadsheet className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-white">Sheets</span>
                  </div>
                </div>
                <div className="p-0">
                  <table className="w-full text-[10px]">
                    <thead className="bg-gradient-to-r from-[#f8f9fa] to-white">
                      <tr>
                        <th className="px-3 py-2 text-left font-bold text-[#1a1a1a] border-r border-gray-200">Date</th>
                        <th className="px-3 py-2 text-left font-bold text-[#1a1a1a] border-r border-gray-200">Vehicle</th>
                        <th className="px-3 py-2 text-left font-bold text-[#1a1a1a]">Load</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: 'Feb 10', vehicle: '5808 BZ', load: '100t' },
                        { date: 'Feb 10', vehicle: '2737 DB', load: '270t' },
                        { date: 'Feb 10', vehicle: '5182 DC', load: '200t' },
                        { date: 'Feb 11', vehicle: '7450 BG', load: '200t' },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="px-3 py-2 text-[#666] border-r border-gray-100">{row.date}</td>
                          <td className="px-3 py-2 font-semibold text-[#1a1a1a] border-r border-gray-100">{row.vehicle}</td>
                          <td className="px-3 py-2 text-[#0d3d2d] font-semibold">{row.load}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center pt-20">
              <div className="p-2 bg-white rounded-full shadow-md print:shadow-none">
                <ArrowRight className="w-5 h-5 text-[#0d3d2d]" strokeWidth={2.5} />
              </div>
            </div>

            {/* Stage 3: Dashboard - Mobile UI */}
            <div className="flex-1">
              {/* Mobile Phone Frame */}
              <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-[32px] p-2.5 shadow-2xl print:shadow-none h-full">
                {/* Phone Notch */}
                <div className="flex justify-center mb-1.5">
                  <div className="bg-gray-900 w-20 h-3.5 rounded-full" />
                </div>

                {/* Screen */}
                <div className="bg-white rounded-[24px] overflow-hidden h-[calc(100%-20px)]">
                  {/* App Header */}
                  <div className="bg-gradient-to-r from-[#f8f9fa] to-white px-3 py-2.5 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 bg-[#0d3d2d]/10 rounded-lg">
                        <BarChart3 className="w-3.5 h-3.5 text-[#0d3d2d]" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#1a1a1a]">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[8px] text-[#666]">Live</span>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-3">
                    <div className="text-[8px] uppercase tracking-wider text-[#666] mb-2 font-semibold">Daily Summary</div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-[#fafaf8] p-2 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <Truck className="w-2.5 h-2.5 text-[#0d3d2d]" />
                          <span className="text-[7px] uppercase tracking-wide text-[#666] font-semibold">Trips</span>
                        </div>
                        <div className="text-[20px] font-bold leading-none text-[#1a1a1a]">53</div>
                        <div className="text-[7px] text-[#666]">17 vehicles</div>
                      </div>

                      <div className="bg-[#fafaf8] p-2 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <Package className="w-2.5 h-2.5 text-[#0d3d2d]" />
                          <span className="text-[7px] uppercase tracking-wide text-[#666] font-semibold">Load</span>
                        </div>
                        <div className="text-[20px] font-bold leading-none text-[#1a1a1a]">1971t</div>
                      </div>
                    </div>

                    <div className="bg-[#fafaf8] p-2 rounded-lg">
                      <div className="flex items-center gap-1 mb-1">
                        <Fuel className="w-2.5 h-2.5 text-[#0d3d2d]" />
                        <span className="text-[7px] uppercase tracking-wide text-[#666] font-semibold">Fuel</span>
                      </div>
                      <div className="text-[16px] font-bold leading-none text-[#1a1a1a] mb-0.5">1408L</div>
                      <div className="text-[9px] font-semibold text-[#0d3d2d]">₹1,27,725</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After/Result - editorial blocks */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-4 bg-white/40 backdrop-blur-sm p-4 rounded-2xl shadow-sm print:shadow-none">
            <div className="w-1 bg-gradient-to-b from-[#ff4500] to-[#ff6347] flex-shrink-0 rounded-full" />
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#1a1a1a] mb-2 bg-[#ff4500]/10 px-2 py-1 rounded-full inline-block">Before</div>
              <p className="text-[13px] leading-relaxed text-[#333]">
                17 vehicles. 50+ trips daily. Every trip logged by hand. Zero visibility into fuel costs, load weights, or vehicle efficiency.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white/40 backdrop-blur-sm p-4 rounded-2xl shadow-sm print:shadow-none">
            <div className="w-1 bg-gradient-to-b from-[#3498db] to-[#2980b9] flex-shrink-0 rounded-full" />
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#1a1a1a] mb-2 bg-[#3498db]/10 px-2 py-1 rounded-full inline-block">After</div>
              <p className="text-[13px] leading-relaxed text-[#333]">
                Querygen reads every dispatch and fuel message. Automatically extracts trip data, fuel entries, vehicle numbers. Pushes it all to Google Sheets — which powers a live operations app.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white/40 backdrop-blur-sm p-4 rounded-2xl shadow-sm print:shadow-none">
            <div className="w-1 bg-gradient-to-b from-[#d4ff00] to-[#b8e000] flex-shrink-0 rounded-full" />
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#1a1a1a] mb-2 bg-[#d4ff00]/20 px-2 py-1 rounded-full inline-block">Result</div>
              <p className="text-[13px] leading-relaxed text-[#333]">
                <span className="font-bold text-[#0d3d2d]">53 trips · 17 vehicles · ₹1,28,000 in fuel</span> — Tracked automatically. Every single day. From WhatsApp messages.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="bg-gradient-to-r from-[#0d3d2d] to-[#1a4a3a] text-white px-6 py-4 mb-5 rounded-2xl shadow-lg print:shadow-none border border-[#0d3d2d]/20">
          <p className="text-[14px] font-semibold leading-tight text-center">
            Zero workflow change. Your team keeps using WhatsApp. Querygen does the rest.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto text-center">
          <div className="text-[32px] font-bold text-[#1a1a1a] leading-none">querygen.ai</div>
        </div>
      </div>
    </div>
  );
};

export default BackSide;
