import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";

const HistoryPage = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosInstance.get("/interview/history");
        setHistory(res.data);
      } catch (err) {
        setError("Oops! Failed to load your previous interviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading interview history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Interview History
          </h1>
          <p className="text-gray-500 mt-2">
            Review all your previous AI interviews and performance.
          </p>
        </div>

        {/* Empty State */}
        {history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              No Interviews Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start your first interview to see your history here.
            </p>

            <button
              onClick={() => navigate("/interview/new")}
              className="mt-6 px-6 py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:scale-105 transition"
            >
              Start New Interview
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {history.map((item) => (      //each interview doc object
              <div
                key={item._id}
                onClick={() =>
                  navigate(`/interview/${item._id}/results`)
                }
                className="bg-white rounded-2xl border border-gray-100 shadow-sm
                hover:shadow-lg hover:scale-[1.01]
                transition-all duration-200 cursor-pointer p-6"
              >
                <div className="flex justify-between items-center">

                  {/* Left */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      💼 {item.role}
                    </h2>

                    <p className="text-gray-500 capitalize mt-1">
                      Difficulty: {item.difficulty}
                    </p>

                    <p className="text-sm text-gray-400 mt-3">
                      📅{" "}
                      {new Date(item.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="text-right">

                    <p
                      className={`text-3xl font-bold ${
                        item.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {item.overallScore}/100
                    </p>

                    <span
                      className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status === "completed"
                        ? "✅ Completed"
                        : "⏳ Pending"}
                    </span>

                    <p className="mt-4 text-sm text-purple-600 font-semibold">
                      View Report →
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;