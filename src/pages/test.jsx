import React from 'react'
import { useEffect, useState } from 'react'
import axiosInstance from '../API/axiosInstance'

const HistoryPage = () => {
   //role difficulty overallScore status createdAt = res
   const [history, setHistory] = useState([]);
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(true)

useEffect(() => {
   const fetchHistory = async() => {
       try{
          const res = await axiosInstance.get('/interview/history')
          setHistory(res.data)
          console.log("History Data", history)
       }catch(error){
         setError('Oops! Failed top Load your Previous Interviews..')
       }finally{
         setLoading(false)
       }
   }
   fetchHistory()
}, [])



  return (
    <div>
        
            {
                history.map((data, index) => (
                    <div key={data._id}>

                    <li >{data.role}</li>
                    <li>Difficulty: {data.difficulty}</li>
                    <li >Status: {data.status}</li>
                    <li >Score: {data.overallScore} /100</li>
                    <li >Date: {data.createdAt}</li>

                    </div>
                    
                ))
            }
       
    </div>
  )
}

export default HistoryPage