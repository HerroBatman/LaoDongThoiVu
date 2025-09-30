import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  Bot,
  TrendingUp,
  AlertCircle,
  Users,
} from "lucide-react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const suggestions = [
    {
      icon: TrendingUp,
      text: "Bạn có muốn xem báo cáo chi tiết về tỉ lệ hoàn thành công việc trong tuần này không?",
      type: "report",
    },
    {
      icon: AlertCircle,
      text: "Có 3 khiếu nại khẩn cấp cần xử lý ngay. Bạn có muốn xem chi tiết không?",
      type: "urgent",
    },
    {
      icon: Users,
      text: "Danh sách 5 lao động có điểm uy tín thấp cần xem xét và can thiệp.",
      type: "reputation",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              AI Assistant
            </h3>
            <p className="text-sm text-gray-500">Trợ lý thông minh</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot size={12} className="text-white" />
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex-1">
              <p className="text-sm text-gray-700">
                Chào bạn! Tôi có thể giúp bạn phân tích dữ liệu và đưa ra các
                gợi ý quản lý. Bạn cần hỗ trợ gì?
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-gray-900">Gợi ý hôm nay:</p>
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <Icon
                    size={16}
                    className="text-gray-400 group-hover:text-blue-500 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-gray-700 group-hover:text-blue-700">
                    {suggestion.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hỏi AI Assistant..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
