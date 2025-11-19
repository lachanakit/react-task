import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import AddTask from './screens/AddTask'
import ShowAlltask from './screens/ShowAllTask'
import UpdateTask from './screens/UpdateTask'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/showall" element={<ShowAlltask />} />
          <Route path="/update" element={<UpdateTask />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
