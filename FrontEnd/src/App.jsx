import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
// import './App.css'

function App() {

  const [empName, setEmpName] = useState("");
  const [empAge,setEmpAge]=useState("");

  const [empList,setEmpList]=useState([])

  useEffect(()=>{

    axios.get('/user?ID=12345').then((data)=>{
      setEmpList((e)=>([...e,data]))
    })
  })
  
  console.log("empList",empList);

  return (
    <div class="container">
      <div className="d-flex justify-content-center align-item-center">
        <div >
          <h2 className="mb-4">Employee DataStore</h2>
        <div>
          <label>Employee Name</label>
        <input id="name" name="empName" className="mx-2" type="text" value={empName} onChange={(e)=>setEmpName(e.target.value)}/>

        </div>
        <div> <label>Employee Name</label>
        <input id="age" name="age" className="mx-2" type="text" value={empAge} onChange={(e)=>setEmpAge(e.target.value)}/>

        </div>
      <button type="submit" className="btn btn-success float-right my-3">ADD</button>
      </div>
      
      </div>
      <div>
        <table>
        <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Age</th>
  </tr>
  {
    empList.map((ele,idx)=>{
return <>
  <tr>
    <td>{"ID"}</td>
    <td>{"name"}</td>
    <td>{"age"}</td>
  </tr>
</>
    })
  }

  
        </table>
        
      </div>
      </div>
  )
}

export default App
