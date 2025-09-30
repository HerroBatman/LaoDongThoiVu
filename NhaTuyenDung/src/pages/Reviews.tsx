import React, { useState } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bot,
  User,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react";

const Reviews: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number>(1);

  const completedJobs = [
    {
      id: 1,
      title: "Dọn dẹp văn phòng",
      date: "20/12/2024",
      workersCount: 2,
      avgRating: 4.5,
    },
    {
      id: 2,
      title: "Phụ bếp nhà hàng",
      date: "18/12/2024",
      workersCount: 3,
      avgRating: 4.2,
    },
  ];

  const workers = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      currentRating: 4.8,
      jobPerformance: "excellent",
      attendance: "on-time",
      workQuality: 5,
      communication: 4,
      reliability: 5,
      myRating: null,
      myComment: "",
      jobTitle: "Dọn dẹp văn phòng",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      currentRating: 4.6,
      jobPerformance: "good",
      attendance: "on-time",
      workQuality: 4,
      communication: 5,
      reliability: 4,
      myRating: 4,
      myComment: "Làm việc chăm chỉ, tỉ mỉ",
      jobTitle: "Dọn dẹp văn phòng",
    },
  ];

  const [reviews, setReviews] = useState(
    workers.map((worker) => ({
      id: worker.id,
      rating: worker.myRating || 0,
      comment: worker.myComment || "",
    }))
  );

  const updateReview = (workerId: number, rating: number, comment: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === workerId ? { ...review, rating, comment } : review
      )
    );
  };

  const StarRating = ({
    rating,
    onRatingChange,
    readonly = false,
  }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
            className={`w-5 h-5 ${
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
            } transition-transform`}
            disabled={readonly}
          >
            <Star
              className={`w-full h-full ${
                star <= rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "average":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceText = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "Xuất sắc";
      case "good":
        return "Tốt";
      case "average":
        return "Trung bình";
      default:
        return "Chưa đánh giá";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Đánh giá lao động</h1>
        <p className="text-gray-600 mt-2">
          Đánh giá và phản hồi về chất lượng làm việc
        </p>
      </div>

      {/* AI Suggestion */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Gợi ý từ AI Assistant
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Bạn có muốn hệ thống gợi ý top 5 lao động tốt nhất để giữ liên hệ
              cho lần sau không?
            </p>
            <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Xem gợi ý →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Job List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">
            Công việc đã hoàn thành
          </h3>
          <div className="space-y-3">
            {completedJobs.map((job) => (
              <button
                key={job.id}
                onClick={() => setSelectedJob(job.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedJob === job.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="font-medium text-sm mb-2">{job.title}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{job.date}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span>{job.avgRating}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {job.workersCount} lao động
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Đánh giá lao động -{" "}
              {completedJobs.find((j) => j.id === selectedJob)?.title}
            </h2>

            <div className="space-y-6">
              {workers.map((worker) => {
                const currentReview = reviews.find((r) => r.id === worker.id);
                const isReviewed = currentReview && currentReview.rating > 0;

                return (
                  <div
                    key={worker.id}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    {/* Worker Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {worker.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              Điểm uy tín: {worker.currentRating}
                            </span>
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-2 ${getPerformanceBadge(
                              worker.jobPerformance
                            )}`}
                          >
                            {getPerformanceText(worker.jobPerformance)}
                          </span>
                        </div>
                      </div>

                      {worker.attendance === "on-time" && (
                        <div className="flex items-center space-x-1 text-green-600 text-sm">
                          <Award className="w-4 h-4" />
                          <span>Đúng giờ</span>
                        </div>
                      )}
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">
                          Chất lượng
                        </div>
                        <StarRating rating={worker.workQuality} readonly />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">
                          Giao tiếp
                        </div>
                        <StarRating rating={worker.communication} readonly />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">
                          Tin cậy
                        </div>
                        <StarRating rating={worker.reliability} readonly />
                      </div>
                    </div>

                    {/* Review Section */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Đánh giá của bạn
                      </h4>

                      {isReviewed ? (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <StarRating
                              rating={currentReview.rating}
                              readonly
                            />
                            <span className="text-sm text-gray-600">
                              Đã đánh giá {currentReview.rating}/5 sao
                            </span>
                          </div>
                          {currentReview.comment && (
                            <p className="text-sm text-gray-700">
                              {currentReview.comment}
                            </p>
                          )}
                          <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Chỉnh sửa đánh giá
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Cho điểm (1-5 sao)
                            </label>
                            <StarRating
                              rating={currentReview?.rating || 0}
                              onRatingChange={(rating) =>
                                updateReview(
                                  worker.id,
                                  rating,
                                  currentReview?.comment || ""
                                )
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nhận xét
                            </label>
                            <textarea
                              rows={3}
                              value={currentReview?.comment || ""}
                              onChange={(e) =>
                                updateReview(
                                  worker.id,
                                  currentReview?.rating || 0,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Chia sẻ kinh nghiệm làm việc với lao động này..."
                            />
                          </div>

                          <div className="flex space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                              <ThumbsUp className="w-4 h-4" />
                              <span>Hài lòng</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                              <ThumbsDown className="w-4 h-4" />
                              <span>Không hài lòng</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Reviews */}
            <div className="mt-6 pt-6 border-t">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Gửi tất cả đánh giá
              </button>
            </div>
          </div>

          {/* Top Workers Suggestion */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Lao động xuất sắc để giữ liên hệ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                  alt="Top worker"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Nguyễn Văn An</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    4.8 • 15 job hoàn thành
                  </div>
                </div>
                <button className="px-3 py-1 text-xs bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                  Liên hệ
                </button>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                  alt="Top worker"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Trần Thị Bình</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    4.6 • 12 job hoàn thành
                  </div>
                </div>
                <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  Liên hệ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
