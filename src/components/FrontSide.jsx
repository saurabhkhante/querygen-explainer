import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MessageSquare, Users, TrendingUp, Eye, Shield, Zap } from 'lucide-react';

const FrontSide = () => {
  const qrUrl = 'https://querygen.ai/ai-summit?utm_source=print&utm_medium=explainer&utm_campaign=india_ai_summit_2026';

  return (
    <div className="a4-page bg-gradient-to-br from-[#fafaf8] via-[#f5f5f3] to-[#fafaf8] relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4ff00] opacity-5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0d3d2d] opacity-5 rounded-full blur-3xl -ml-40 -mb-40" />

      <div className="relative p-12 h-full flex flex-col">
        {/* Header with QR code */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-[46px] leading-[1.05] font-bold tracking-tight text-[#1a1a1a] mb-1">
              You built a business<br />on WhatsApp.
            </h1>
            <h2 className="text-[46px] leading-[1.05] font-bold tracking-tight text-[#0d3d2d]">
              You have zero visibility into it.
            </h2>
          </div>

          {/* QR Code - Top Right */}
          <div className="ml-6 flex-shrink-0">
            <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-200">
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

        {/* Three outcomes - editorial list style */}
        <div className="mb-6 space-y-3 max-w-[540px]">
          <div className="flex gap-4 items-start bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#d4ff00] to-[#b8e000] rounded-xl flex items-center justify-center shadow-sm">
              <Eye className="w-5 h-5 text-[#0d3d2d]" />
            </div>
            <div>
              <p className="text-[15px] leading-[1.6] text-[#1a1a1a]">
                <span className="font-semibold">See every customer conversation across your team</span> — without joining every group
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#d4ff00] to-[#b8e000] rounded-xl flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5 text-[#0d3d2d]" />
            </div>
            <div>
              <p className="text-[15px] leading-[1.6] text-[#1a1a1a]">
                <span className="font-semibold">Auto-extract data from chats into Google Sheets</span> — no manual reporting, no copy-pasting
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#d4ff00] to-[#b8e000] rounded-xl flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-[#0d3d2d]" />
            </div>
            <div>
              <p className="text-[15px] leading-[1.6] text-[#1a1a1a]">
                <span className="font-semibold">Turn WhatsApp conversations into automated workflows</span> — deals, dispatches, site visits, whatever your business runs on
              </p>
            </div>
          </div>
        </div>

        {/* Data visualization - clean, confident cards */}
        <div className="flex-1 mb-6">
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="bg-white rounded-xl p-4 relative overflow-hidden shadow-md border border-gray-100">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#d4ff00] to-[#b8e000] opacity-15 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="p-1 bg-[#d4ff00]/20 rounded-md">
                    <MessageSquare className="w-3.5 h-3.5 text-[#0d3d2d]" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-[#666]">Messages</span>
                </div>
                <div className="text-[32px] font-bold leading-none text-[#1a1a1a] mb-1">2,004</div>
                <div className="text-[10px] text-[#0d3d2d] font-semibold">↑ 22.5%</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 relative overflow-hidden shadow-md border border-gray-100">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#d4ff00] to-[#b8e000] opacity-15 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="p-1 bg-[#d4ff00]/20 rounded-md">
                    <Users className="w-3.5 h-3.5 text-[#0d3d2d]" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-[#666]">Conversations</span>
                </div>
                <div className="text-[32px] font-bold leading-none text-[#1a1a1a] mb-1">31</div>
                <div className="text-[10px] text-[#ff4500] font-semibold">↓ 8.8%</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 relative overflow-hidden shadow-md border border-gray-100">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#d4ff00] to-[#b8e000] opacity-15 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="p-1 bg-[#d4ff00]/20 rounded-md">
                    <TrendingUp className="w-3.5 h-3.5 text-[#0d3d2d]" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-[#666]">Alerts</span>
                </div>
                <div className="text-[32px] font-bold leading-none text-[#1a1a1a] mb-1">78</div>
                <div className="text-[10px] text-[#0d3d2d] font-semibold">↑ 17.9%</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 relative overflow-hidden shadow-md border border-gray-100">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#3498db] to-[#2980b9] opacity-15 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="p-1 bg-[#3498db]/20 rounded-md">
                    <MessageSquare className="w-3.5 h-3.5 text-[#2980b9]" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-[#666]">Avg Response</span>
                </div>
                <div className="text-[28px] font-bold leading-none text-[#1a1a1a] mb-1">1h 14m</div>
                <div className="text-[10px] text-[#0d3d2d] font-semibold">↑ 228.9%</div>
              </div>
            </div>
          </div>

          {/* Sample conversation list - streamlined */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#fafaf8] to-white border-b border-gray-200 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#1a1a1a]">Live Conversations</span>
              <span className="text-[10px] text-[#666]">Last sync: 4m ago</span>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { name: 'Loic - Villa Inquiry', label: 'Hot Lead', color: '#d4ff00', time: '2m', owner: 'Sarah' },
                { name: 'Marina Brokers Group', label: 'Needs Reply', color: '#ff4500', time: '8m', owner: 'Mike' },
                { name: 'Rashid - JBR Penthouse', label: 'Awaiting Customer', color: '#3498db', time: '1h', owner: 'Sarah' },
                { name: 'VIPL-CC Vehicle Dispatch', label: 'Follow Up', color: '#ff4500', time: '14m', owner: 'VM' },
                { name: 'Afrilight Tech ChatReport', label: 'Support Needed', color: '#9b59b6', time: '34m', owner: 'VM' },
              ].map((conv, idx) => (
                <div key={idx} className="px-4 py-2.5 flex items-center justify-between group hover:bg-gray-50/50 transition-all">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: conv.color }} />
                    <div className="flex-1">
                      <span className="text-[12px] font-medium text-[#1a1a1a] block">{conv.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${conv.color}20`, color: '#1a1a1a' }}>
                      {conv.label}
                    </span>
                    <span className="text-[10px] text-[#999] min-w-[35px] text-right">{conv.time}</span>
                    <span className="text-[10px] font-semibold text-[#666] min-w-[40px] text-right">{conv.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance Summary */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100">
              <div className="text-[9px] uppercase tracking-wider text-[#666] mb-2 font-semibold">Top Performer</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[18px] font-bold text-[#1a1a1a]">Saurabh K.</div>
                  <div className="text-[11px] text-[#666]">226 messages sent</div>
                </div>
                <div className="text-[24px] font-bold text-[#0d3d2d]">30</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100">
              <div className="text-[9px] uppercase tracking-wider text-[#666] mb-2 font-semibold">Response Time (Avg)</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[18px] font-bold text-[#1a1a1a]">14.4m</div>
                  <div className="text-[11px] text-[#666]">vs groups</div>
                </div>
                <div className="text-[11px] text-[#ff4500] font-semibold bg-[#ff4500]/10 px-2 py-1 rounded-full">↓ 88.4%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Differentiator - bold statement */}
        <div className="bg-gradient-to-r from-[#0d3d2d] to-[#1a4a3a] text-white px-6 py-5 mb-6 rounded-2xl shadow-lg border border-[#0d3d2d]/20">
          <p className="text-[15px] font-semibold leading-tight text-center">
            Works on personal WhatsApp. No Business API.<br />
            No new number. No migration.
          </p>
        </div>

      </div>
    </div>
  );
};

export default FrontSide;
