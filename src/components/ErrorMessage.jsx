
const ErrorMessage = ({ message }) => {
  return (
    <div 
    className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm"
    >
      {message}
    </div>
  )
}

export default ErrorMessage