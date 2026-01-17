import { useMemo } from 'react';

const RevenueChart = ({ data }) => {
  const maxValue = useMemo(() => {
    return Math.max(...data.map(d => d.amount), 100);
  }, [data]);

  return (
    <div className="w-full h-64 flex items-end justify-between gap-2 sm:gap-4 mt-6">
      {data.map((item, index) => {
        const heightPercentage = (item.amount / maxValue) * 100;
        return (
          <div key={index} className="group relative flex-1 flex flex-col items-center justify-end h-full">
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              <p className="font-bold">{item.orders} orders</p>
              <p className="text-emerald-400">{item.amount.toLocaleString()} DZD</p>
            </div>

            {/* Bar */}
            <div 
              className="w-full bg-gray-700/50 rounded-t-lg group-hover:bg-emerald-500/50 transition-all duration-300 relative overflow-hidden"
              style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
            >
              <div 
                className="absolute bottom-0 left-0 w-full bg-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ height: '100%' }}
              />
            </div>

            {/* Label */}
            <p className="text-xs text-gray-400 mt-2 font-mono">{item.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RevenueChart;
