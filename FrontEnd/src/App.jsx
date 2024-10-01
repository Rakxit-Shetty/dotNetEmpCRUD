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

    axios.get('https://jsonplaceholder.typicode.com/todos').then((res)=>{
      console.log(res.data)
      setEmpList((e)=>([...e,...res.data]))
    })
  },[])
  
  console.log("empList",empList);

  return (
    <div class="container">
      <div className="d-flex justify-content-center align-item-center">
        <div>
          <h2 className="mb-4">Employee DataStore</h2>
        <div>

        <div className="row col-12">
        <div className="col-6"> 
           <label>Employee Name</label>
           </div>
           <div className="col-6">
           <input id="name" name="empName" className="mx-2" type="text" value={empName} onChange={(e)=>setEmpName(e.target.value)}/>
           </div>
        </div>

          
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Age</label>
        </div>
        <div className="col-6">        
          <input id="age" name="age" className="mx-2" type="text" value={empAge} onChange={(e)=>setEmpAge(e.target.value)}/>
        </div>
        </div>

        <div className="row col-12">
        <div className="col-6">
          <label>Employee DOB</label>
        </div>
        <div className="col-6">        
          <input id="age" name="age" className="mx-2" type="text" value={empAge} onChange={(e)=>setEmpAge(e.target.value)}/>
        </div>
        </div>
        
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Desi</label>
        </div>
        <div className="col-6">        
          <input id="age" name="age" className="mx-2" type="text" value={empAge} onChange={(e)=>setEmpAge(e.target.value)}/>
        </div>
        </div>
         
        </div>
        
      <button type="submit" className="btn btn-success float-right my-3">ADD</button>
      </div>
      
      </div>
      <div>
        <table>
        <tr className="bg-sucess">
    <th>ID</th>
    <th>Name</th>
    <th>Age</th>
    <th>Action</th>
  </tr>
  {
    empList.map((ele,idx)=>{
return <>
  <tr>
    <td>{ele.userId}</td>
    <td>{ele.title}</td>
    <td>{ele.userId}</td>
    <td><button className="btn btn-primary mx-2">Edit</button><button className="btn btn-danger mx-2">Del</button></td>
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
