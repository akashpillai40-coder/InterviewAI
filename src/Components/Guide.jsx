import React from 'react'


const Guide = () => {
    const features =[
        {
            icon: '①',
            title: "Enter a job Description",
            description: "Select your target role, difficulty level, and number of questions. Customize your interview to match real job requirements, gives you more accurate, faster results than similar tools"
        },
        {
            icon: '②',
            title: "Start Answering the mock interview tailored to your job role",
            description: "Instantly creates relevant technical and behavioral questions tailored specifically to your selected role and difficulty."
  
        },
        {
            icon: '③',
            title: "Get instant AI feedback",
            description: "See what works, make improvements compare with previous interview history "
        },
        {
            icon: '④',
            title: "Practice and improve",
            description: "Practice more, get polished and improved"
        }

    ]
  return (
    <>

   
   <div className="max-w-7xl mx-auto px-8 pb-24">

                {/*----------------- Header---------------------- */}

    <div className='text-center mb-16 mt-10 text-5xl'> 
        <h1 className='font-medium mb-3'>How to Use Interview AI Mock Interview</h1>
        <p className='text-lg font-light text-gray-500'>Get ready for the interview with guided practice, real-time feedback and 
            <br /> without wasting time </p>
        
   </div>


                 {/*----------------- Cards---------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-[20px] p-[35px] text-left shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition duration-200 ease-in-out"
            >
              <div
                className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center text-2xl mb-6 ${item.bgClass}`}
              >
                <span className='text-3xl'>{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[0.98rem] leading-relaxed text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Guide