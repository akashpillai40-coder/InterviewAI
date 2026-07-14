import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";


const NewInterviewPage = () => {
  
  const Roles = [
    {
      icon: "🖥️",
      role: "Full-Stack Developer",
      description: "Coding, system design & algorithms",
    },
    {
      icon: "🎨",
      role: "Front-End Developer",
      description: "Core client side developments",
    },
    {
      icon: "✏️",
      role: "UX Designer",
      description: "Portfolio review and design critique",
    },
    {
      icon: "📊",
      role: "Data Scientist",
      description: "Statistics, ML and case studies",
    },
    { icon: "⚙️", role: "DevOps", description: "Data pipeline and flow" },
    {
      icon: "📋",
      role: "Project Manager",
      description: "Strategy, prioritization and metrics",
    },
    {
      icon: "📝",
      role: "Business Analyst",
      description: "Processes, interprets and documents business",
    },
  ];

  const Experience = [
    { level: "Entry Level", years: "0–1 years" },
    { level: "Mid Level", years: "1–3 years" },
    { level: "Senior", years: "3–5 years" },
    { level: "Senior/Principal", years: "5+ years" },
  ];

  const questionCount = [5, 10, 15, 20, 30];

  const difficulty = [
    {
      level: "🟢 Easy",
      description: "Warm-up questions with straightforward answers",
    },
    {
      level: "🟡 Medium",
      description: "Standard interview difficulty with follow-ups",
    },
    {
      level: "🔴 Hard",
      description: "Deep-dive questions with edge cases and trade-offs",
    },
  ];

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [qCount, setQCount] = useState(5);
  const [difficulties, setDifficulties] = useState("");

  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleStart = async () => {
  setLoading(true)
  setError('')
  try {
    const res = await axiosInstance.post('/api/interview/create', {
      role,
      difficulty: difficulties.replace(/[🟢🟡🔴]\s*/g, '').toLowerCase(),
      count: qCount
    })
    navigate(`/interview/${res.data._id}/session`)
  } catch (err) {
    setError('Failed to create interview. Please try again.')
  } finally {
    setLoading(false)
  }
}
  // Two states for Selected and non-selected
  const selected = "border-purple-500 bg-purple-50 text-purple-700 shadow-sm";
  const idle =
    "border-gray-300 bg-white text-gray-700 hover:bg-purple-50 hover:border-purple-300";

  return (
    <div className="min-h-screen bg-[#FAF9F5] px-6 py-10 max-w-5xl mx-auto">
      {/*---------------- Header----------------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Configure your Interview</h1>
        <p className="text-gray-500 font-light">
          Choose your role, experience, and difficulty. Our AI will adapt
          questions to match your profile.
        </p>
      </div>

      {/* ──--------------- Role ---------------── */}
      <section className="mb-8">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">
          💼 Role
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Roles.map((r) => (
            <button
              key={r.role}
              onClick={() => setRole(r.role)}
              className={`p-4 border rounded-xl text-left transition-all duration-200 cursor-pointer
                ${role === r.role ? selected : idle}`}
            >
              <span className="text-2xl block mb-2">{r.icon}</span>
              <h2 className="text-sm font-bold">{r.role}</h2>
              <p className="text-xs text-gray-500 mt-1 leading-snug">
                {r.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ──------- Experience ──--------- */}
      <section className="mb-8">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">
          🎓 Experience Level
        </label>
        <div className="flex flex-wrap gap-3">
          {Experience.map((exp) => (
            <button
              key={exp.level}
              onClick={() => setExperience(exp.level)}
              className={`p-4 border rounded-xl w-[150px] transition-all duration-200 cursor-pointer
                ${experience === exp.level ? selected : idle}`}
            >
              <p className="text-sm font-semibold">{exp.level}</p>
              <p className="text-xs text-gray-500 mt-0.5">{exp.years}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ──---------- Difficulty ----------── */}
      <section className="mb-8">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">
          🧮 Difficulty
        </label>
        <div className="flex flex-wrap gap-3">
          {difficulty.map((diff) => (
            <button
              key={diff.level}
              onClick={() => setDifficulties(diff.level)}
              className={`p-4 border rounded-xl w-[190px] transition-all duration-200 cursor-pointer
                ${difficulties === diff.level ? selected : idle}`}
            >
              <p className="text-sm font-bold">{diff.level}</p>
              <p className="text-xs text-gray-500 mt-1 leading-snug">
                {diff.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ──------------------ Question Count ---------------── */}
      <section className="mb-10">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">
          🔢 Number of Questions
        </label>
        <div className="flex flex-wrap gap-3">
          {questionCount.map((count) => (
            <button
              key={count}
              onClick={() => setQCount(count)}
              className={`w-16 h-12 border rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer
                ${qCount === count ? selected : idle}`}
            >
              {count}
            </button>
          ))}
        </div>
      </section>

      {/* ----------── Summary Bar ---------------── */}
      <div className="flex items-center justify-between border border-gray-200 rounded-xl bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-bold mb-1">Ready to Practice</h2>
          <p className="text-sm text-gray-500">
            {role ? (
              <span className="text-gray-800 font-medium">{role}</span>
            ) : (
              <span>No role selected</span>
            )}
            {experience ? <span className="text-gray-400 mx-2">·</span> : null}
            {experience ? (
              <span className="text-gray-800 font-medium">{experience}</span>
            ) : null}
            {difficulties ? (
              <span className="text-gray-400 mx-2">·</span>
            ) : null}
            {difficulties ? (
              <span className="text-gray-800 font-medium">{difficulties}</span>
            ) : null}
            {qCount ? <span className="text-gray-400 mx-2">·</span> : null}
            {qCount ? (
              <span className="text-gray-800 font-medium">
                {qCount} questions
              </span>
            ) : null}
          </p>
        </div>
        <button
        onClick={handleStart}
          disabled={!role || !experience || !difficulties}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 disabled:opacity-40
            disabled:cursor-not-allowed disabled:hover:scale-100
            text-white text-sm font-semibold rounded-xl px-6 py-3 transition-all duration-200 cursor-pointer"
        >
          {loading ? 'Generating....' : 'Start Interview →'}
          
        </button>
      </div>
    </div>
    
  );
};

export default NewInterviewPage;
