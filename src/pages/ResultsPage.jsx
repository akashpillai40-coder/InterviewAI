import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";

import LoadingSpinner from '../components/LoadingSpinner'

const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    //fetching a particular individual doc
    const fetchInterview = async () => {
      try {
        const res = await axiosInstance.get(`/interview/${id}`);
    
        setInterview(res.data);
      } catch (err) {
        setError("Failed to load interview results.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

if (loading) {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
      <LoadingSpinner text="Getting your Results..." />
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

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <p className="text-gray-500">No interview found...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎉 Interview Completed
          </h1>

          <p className="text-gray-500">
           Evaluation Report
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

            <div className="bg-purple-50 rounded-xl p-5">
              <p className="text-sm text-gray-500">Role</p>
              <h2 className="text-lg font-semibold text-purple-700">
                {interview.role}
              </h2>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-sm text-gray-500">Difficulty</p>
              <h2 className="text-lg font-semibold text-blue-700 capitalize">
                {interview.difficulty}
              </h2>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-sm text-gray-500">Overall Score</p>
              <h2 className="text-2xl font-bold text-green-600">
                {interview.overallScore}/10
              </h2>
            </div>

          </div>
        </div>

        {/* Answers */}
        <div className="space-y-6">
          {interview.answers.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <div className="flex justify-between items-center mb-5">
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-lg">
                  Question {index + 1}
                </span>

                <span className="bg-green-100 text-green-700 font-semibold px-4 py-1 rounded-full">
                  Score: {item.score}/100
                </span>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Question
                </h3>

                <p className="text-gray-900">
                  {item.question}
                </p>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Your Answer
                </h3>

                <p className="text-gray-700 whitespace-pre-wrap">
                  {item.answer}
                </p>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Feedback
                </h3>

                <p className="text-gray-700">
                  {item.feedback}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Suggested Improvements
                </h3>

                <p className="text-gray-700">
                  {item.improvements}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-4 rounded-xl text-white font-semibold
            bg-gradient-to-r from-blue-600 to-purple-600
            hover:scale-[1.01] transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultsPage;