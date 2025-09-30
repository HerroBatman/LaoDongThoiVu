import React from "react";

export default function Charts() {
  const monthlyRevenue = [
    { month: "T1", revenue: 1.8 },
    { month: "T2", revenue: 2.1 },
    { month: "T3", revenue: 1.9 },
    { month: "T4", revenue: 2.3 },
    { month: "T5", revenue: 2.0 },
    { month: "T6", revenue: 2.4 },
  ];

  const industries = [
    { name: "Nhà hàng - Khách sạn", value: 35, color: "bg-blue-500" },
    { name: "Xây dựng", value: 25, color: "bg-green-500" },
    { name: "Bán lẻ", value: 20, color: "bg-yellow-500" },
    { name: "Logistics", value: 15, color: "bg-purple-500" },
    { name: "Khác", value: 5, color: "bg-gray-500" },
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map((item) => item.revenue));

  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Doanh thu theo tháng (tỷ VNĐ)
        </h3>
        <div className="flex items-end space-x-4 h-64">
          {monthlyRevenue.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gray-200 rounded-t-lg relative"
                style={{ height: "200px" }}
              >
                <div
                  className="bg-blue-500 rounded-t-lg absolute bottom-0 w-full transition-all duration-500"
                  style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-gray-900">
                  {item.revenue}
                </p>
                <p className="text-xs text-gray-500">{item.month}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ngành nghề hot (%)
        </h3>
        <div className="space-y-4">
          {industries.map((industry, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm text-gray-600 text-right">
                {industry.name}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                <div
                  className={`${industry.color} h-4 rounded-full transition-all duration-500`}
                  style={{ width: `${industry.value}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-900">
                {industry.value}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
