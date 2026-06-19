import React from "react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  // Data matrix mapped to populate the feature grid dynamically
  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Interviews",
      desc: "Our advanced AI adapts to your responses, asking relevant follow-up questions just like a real interviewer.",
      bgClass: "bg-blue-50",
    },
    {
      icon: "📊",
      title: "Detailed Analytics",
      desc: "Get comprehensive feedback on your performance, communication skills, and areas for improvement.",
      bgClass: "bg-purple-50",
    },
    {
      icon: "🎯",
      title: "Role-Specific Practice",
      desc: "Practice for your specific role with tailored questions for software engineering, product, design, and more.",
      bgClass: "bg-green-50",
    },
    {
      icon: "📹",
      title: "Video Recording",
      desc: "Record your sessions to review your body language, tone, and delivery for continuous improvement.",
      bgClass: "bg-orange-50",
    },
    {
      icon: "🔖",
      title: "Real-time Feedback",
      desc: "Receive instant feedback during practice to adjust your approach and improve on the spot.",
      bgClass: "bg-pink-50",
    },
    {
      icon: "🏆",
      title: "Progress Tracking",
      desc: "Monitor your improvement over time with detailed metrics and achievement milestones.",
      bgClass: "bg-teal-50",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#fcfcff] font-sans text-gray-900 antialiased">
        {/* ─── FIXED NAVBAR ─── */}

        {/* ─── ADDED BACK: Hero Banner Text Block ─── */}
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Ace Your Next Interview with Us
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg mb-2">
            Practice with our AI interviewer, get instant feedback, and land
            your dream job.
          </p>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg mb-8">
            Personalized mock interviews that adapt to your experience and
            target role.
          </p>
          <button className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition shadow-lg shadow-blue-600/20">
            Start Free Trial
          </button>
        </div>

        {/* ─── FIGMA SUBHEADING ACCENT ─── */}
        <div id="features" className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-500 font-medium">
            Powerful features designed to help you excel
          </p>
        </div>

        {/* ───  GRID ARCHITECTURE ─── */}
        <div className="max-w-7xl mx-auto px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-[20px] p-[35px] text-left shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition duration-200 ease-in-out"
              >
                <div
                  className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center text-2xl mb-6 ${item.bgClass}`}
                >
                  <span>{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-gray-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
