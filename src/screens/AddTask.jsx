import React from 'react'
import Footer from '../components/Footer'
import taskluno from '../assets/taskpic.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../libs/supabaseClient.js'
import { useNavigate } from 'react-router-dom'

function AddTask() {
  const navigate = useNavigate()  
  const [ Title, setTitle ] = useState('')
  const [ Detail, setDetail ] = useState('')
  const [ Completed, setCompleted ] = useState(false)
  const [ ImageFE, setImgFile ] = useState(null)
  const [ ImgPrev, setImgPrev ] = useState('')

  const ImgSelect = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImgFile(file)
      setImgPrev(URL.createObjectURL(file))
    }
  }
  const HandleSaved = async (e) => {
    e.preventDefault()

    if (Title.trim() === '' || Detail.trim() === '') {
      alert('Please Input All the data')
      return;
    }

    let ImgURL = ''
    if (ImageFE) {
      let NewImgName = `${Date.now()}_${ImageFE.name}`
      const { error } = await supabase.storage
        .from('lachaDB-bk')
        .upload(NewImgName, ImageFE)
        
      if (error) {
        alert("Something Went Wrong")
        return;
      } else {
        const { data } = supabase.storage
          .from('lachaDB-bk')
          .getPublicUrl(NewImgName)
        ImgURL = data.publicUrl
      }
    }
    const { error } = await supabase.from('lachaDB')
      .insert({
        Title: Title,
        Detail: Detail,
        completed: Completed,
        ImageURL: ImgURL
      })
      if(error){
        alert("Something went Wrong. Please Try again")
        return
      }else{
        alert("Success")
        navigate('/showall')
      }
  }

  return (
    <>
      <div className="w-8/12 border border-amber-500 shadow-md rounded p-6 mx-auto mt-20 flex flex-col items-center">
        <img src={taskluno} alt="task" className='w-20 mb-4' />
        <h1 className="text-2xl font-bold text-fuchsia-400 text-center">
          Task APP
          <br />
          -- Add New Task --
        </h1>
        <form className='w-full' onSubmit={HandleSaved}>

          <div>
            <label className='mt-10'>Task Name</label>
            <input type="text" placeholder='Input Task Name' className='w-full border border-gray-400 p-2 rounded' value={Title} onChange={(e) => { setTitle(e.target.value) }} />
          </div>

          <div className='mt-5'>
            <label className='mt-10'>Task Detail</label>
            <input type="text" placeholder='Input Task Detail' className='w-full border border-gray-400 p-2 rounded' value={Detail} onChange={(e) => { setDetail(e.target.value) }} />
          </div>

          <div className='mt-10'>
            <label className='mt-10'>Task Picture</label>
            <input type="file" placeholder='Input Task Picture' className='hidden' id="ImageSE" accept='image/' onChange={ImgSelect} />
            <label htmlFor="ImageSE" className='w-full bg-cyan-400 text-white p-2 rounded cursor-pointer ml-5'>Select Picture</label>
            <div className='mt-5'>
              {
                ImgPrev && <img src={ImgPrev} alt="Preview" className='w-30 mt-2' />
              }
            </div>
          </div>

          <div className='mt-10'>
            <label className='mt-10'>Task Status</label>
            <select className='w-full p-2 border border-gray-400 rounded' value={Completed == false ? '0' : '10'} onChange={(e) => { setCompleted(e.target.value == '1' ? true : false) }}>
              <option value="1">Completed ✅</option>
              <option value="0">WIP ❌</option>
            </select>
          </div>

          <div className='mt-10'>
            <button type='submit' className='w-full bg-sky-400 hover:bg-emerald-500 p-2 text-white rounded cursor-pointer text-xl'>Save/AddItem</button>
          </div>

          <div className='mt-10 text-center'>
            <Link to={'/showall'} className='text-sky-400 hover:text-emerald-500 cursor-pointer text-2xl'>Back to All Task</Link>
          </div>

        </form >
      </div >
      <Footer />
    </>
  )
}

export default AddTask