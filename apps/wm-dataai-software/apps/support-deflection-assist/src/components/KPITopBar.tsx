import React from 'react';
import { kpis } from '../data';
import { Radar } from 'lucide-react';

export const KPITopBar = () => {
  return (
    <div className="bg-[#9F1239] text-white shadow-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center shrink-0 w-full md:w-auto justify-center md:border-r md:border-white/20 pb-2 md:pb-0 md:pr-4 border-b md:border-b-0 border-white/10">
            <Radar className="w-5 h-5 text-white mr-2" />
            <span className="font-semibold text-sm tracking-wide">Impact Metrics</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 grow w-full">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start min-w-[120px]">
                <span className="text-[10px] text-wm-gray-med uppercase tracking-wider mb-0.5 whitespace-nowrap">{kpi.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/60 text-xs line-through">{kpi.baseline}</span>
                  <span className="text-sm font-semibold text-green-400">{kpi.improved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
