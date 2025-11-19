import React from 'react'
import Footer from '../components/Footer'
import taskluno from '../assets/task.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../libs/supabaseClient.js'

function ShowAlltask() {
  const [tasks, setTasks] = useState([])

  //run everytime when page is rendered 
  useEffect(() => {
    //Pull data from supabase
    try {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from('lachaDB') //Database name
          .select("*") //Select all columns
          .order('created_at', { ascending: false })
        if (error) {
          alert("Failed to fetch data from supabase")
          throw error
        } else {
          setTasks(data)
        }
      }
      fetchData()
    } catch (error) {
      alert("Failed to fetch data from supabase")
      console.log("Failed to fetch data from supabase", error)
    }
  }, []
  )
  const DeleteHandle = async (id, ImageURL) => {
    if (confirm('Are you sure?') == true) {
      if (ImageURL != '') {
        const ImgName = ImageURL.split('/').pop()
        await supabase.storage.from('lachaDB-bk').remove([ImgName])
      }
      const { error } = await supabase.from('lachaDB').delete().eq('id', id)
      if (error) {
        alert("Delete Error")
        throw error
      } else {
        alert("Success")
        setTasks(tasks.filter(task => task.id !== id))
      }
    }
  }
  return (
    <>
      <div className="w-8/12 border border-amber-500 shadow-md rounded p-6 mx-auto mt-20 flex flex-col items-center">
        <img src={taskluno} alt="task" className='w-20 mb-4' />
        <h1 className="text-2xl font-bold text-fuchsia-400 text-center">
          Task APP
          <br />
          -- All Task --
        </h1>

        {/* Button to go to /add page */}

        <div className="w-full flex justify-end mt-6">
          <Link to="/add" className="bg-indigo-600 hover:bg-sky-600 text-white cursor-pointer p-3 rounded transition duration-200 ease-in-out">Add Task</Link>
        </div>

        {/* Supabse Section */}
        <div className="w-full mt-8">
          <table className="w-full border border-emerald-600 text-md">
            <thead>
              <tr>
                <th className="p-2 border border-teal-600">Image</th>
                <th className="p-2 border border-teal-600">Task Name</th>
                <th className="p-2 border border-teal-600">Task Detail</th>
                <th className="p-2 border border-teal-600">Status</th>
                <th className="p-2 border border-teal-600">Create date</th>
                <th className="p-2 border border-teal-600">Lasted edit</th>
                <th className="p-2 border border-teal-600">Manage</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="p-2 border border-teal-600">
                      {
                        task.ImageURL === null || task.ImageURL === ''
                          ? <img className='w-20 mx-auto' src={taskluno} alt='Img' />
                          : <img className='w-20 mx-auto' src={task.ImageURL} alt='Img' />
                      }
                    </td>
                    <td className="p-2 border border-teal-600">{task.Title}</td>
                    <td className="p-2 border border-teal-600">{task.Detail}</td>
                    <td className="p-2 border border-teal-600">
                      {
                        task.completed == true ? <span className='text-green-400'>Completed ✔</span> : <span className='text-red-500'>WIP ❌</span>
                      }
                    </td>
                    <td className="p-2 border border-teal-600">{new Date(task.created_at).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</td>
                    <td className="p-2 border border-teal-600">{new Date(task.lasted_update).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</td>
                    <td className="p-2 border border-teal-600">
                      <Link to={'/update/'+task.id} className='text-green-500'>Edit</Link>
                      <button className='text-red-500 ml-2 cursor-pointer' onClick={() => DeleteHandle(task.id, task.ImageURL)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ShowAlltask