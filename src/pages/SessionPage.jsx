import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../API/axiosInstance'

const SessionPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [interview, setInterview] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')



  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await axiosInstance.get(`/interview/${id}`)
        setInterview(res.data)
      
      } catch (err) {
        setError('Failed to load interview.')
        console.log(err)
      
      } finally {
        setLoading(false)
      }
    }
    fetchInterview()
  }, [id])

  const handleSubmit = async () => {
    if (!answer.trim()) return
    setSubmitting(true)
    setError('')
    try {
      // Submit answer — Gemini evaluates and saves to DB
      await axiosInstance.post(`/interview/${id}/submit`, {
        questionIndex: currentIndex,
        answer
      })

      const isLast = currentIndex === interview.questions.length - 1

      if (isLast) {
        // Complete interview → go to results
        await axiosInstance.post(`/interview/${id}/complete`)
        navigate(`/interview/${id}/results`)
      } else {
        // Move to next question
        setCurrentIndex(prev => prev + 1)
        setAnswer('')
      }
    } catch (err) {
      setError('Failed to submit answer. Please try again.')
      console.log(err);
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading your interview...</p>
      </div>
    </div>
  )

  if (!interview || !interview.questions?.length) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">No questions found.</p>
    </div>
  )

  const questions = interview.questions
  const progress = ((currentIndex + 1) / questions.length) * 100
  const isLast = currentIndex === questions.length - 1

  return (
    <div className="min-h-screen bg-[#FAF9F5] px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{interview.role}</h1>
            <p className="text-sm text-gray-500 capitalize">
              {interview.difficulty} · {questions.length} questions
            </p>
          </div>
          <span className="text-sm font-medium text-purple-600">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex items-start gap-3 mb-6">
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-lg shrink-0">
              Q{currentIndex + 1}
            </span>
            <p className="text-gray-900 font-medium leading-relaxed">
              {questions[currentIndex]}
            </p>
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={submitting}
            className="w-full min-h-[160px] p-4 rounded-xl border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-purple-400
              resize-none text-gray-800 text-sm leading-relaxed"
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!answer.trim() || submitting}
          className="w-full py-4 rounded-xl text-white font-semibold
            bg-gradient-to-r from-blue-600 to-purple-600
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:scale-[1.01] transition-all duration-200"
        >
          {submitting
            ? 'Evaluating...'
            : isLast
            ? 'Finish Interview →'
            : 'Submit & Next →'}
        </button>

      </div>
    </div>
  )
}

export default SessionPage


