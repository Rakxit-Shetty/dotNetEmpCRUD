import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
// import './App.css'

function App() {

  const [empDet,setEmpDet]= useState({
    name:"",
    age:"",
    dob:"",
    designation:"",
    phone:"",
    email:""
  });
  const [empList,setEmpList]=useState([]);
 let{ name,age,dob, designation,phone,email} =empDet;
 
 const getAllemployee=()=>{
  axios.get('https://jsonplaceholder.typicode.com/todos').then((res)=>{
    // console.log(res.data)
    setEmpList((e)=>([...e,...res.data]))
  });
 }

  useEffect(()=>{
    getAllemployee()
  },[])
  

  const onEmpchange=((e)=>{
    let {name, value}=e.target;
    setEmpDet((el)=>({...el,[name]:value}));
  })

  const onEmpDetSubmit=async (e)=>{
  e.preventDefault();
const reqHeader={
  headers: {
    'Content-Type': 'application/json'
  }
};

  const empFinData=empDet;
  console.log(empFinData);
  
  // let res=await axios.post('https://localhost:5001/addEmp', empFinData,reqHeader);
  alert("data sent");
  // getAllemployee()
  }

    const onEditEmp=(data)=>{
      alert("edit");
    }

  const onDelEmp=(data)=>{
    // console.log("emp del")
    alert("delete");
  };

  return (
    <div class="container">
      <form onSubmit={(e)=>{onEmpDetSubmit(e)}}>
      <div className="d-flex justify-content-center align-item-center">
        <div>
          <h2 className="mb-4">Employee DataStore</h2>
        <div>

        <div className="row col-12">
        <div className="col-6"> 
           <label>Employee Name</label>
           </div>
           <div className="col-6">
           <input id="name" name="name" className="mx-2" type="text" value={name} onChange={(e)=>onEmpchange(e)} required/>
           </div>
        </div>

      
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Age</label>
        </div>
        <div className="col-6">        
          <input id="age" name="age" className="mx-2" type="text" value={age} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12">
        <div className="col-6">
          <label>Employee DOB</label>
        </div>
        <div className="col-6">        
          <input id="dob" name="dob" className="mx-2" type="date" value={dob} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Designation</label>
        </div>
        <div className="col-6">        
          <input id="designation" name="designation" className="mx-2" type="text" value={designation} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Phone</label>
        </div>
        <div className="col-6">        
          <input id="phone" name="phone" className="mx-2" type="text" value={phone} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Email</label>
        </div>
        <div className="col-6">        
          <input id="email" name="email" className="mx-2" type="text" value={email} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
         
        </div>
        
      <button type="submit" className="btn btn-success float-right my-3">ADD</button>
      </div>
      
      </div>
      </form>
      <div>
        <table>
        <tr className="bg-sucess">
    <th>ID</th>
    <th>Name</th>
    <th>Age</th>
    <th>DOB</th>
    <th>Desination</th>
    <th>Phone</th>
    <th>Email</th>
    <th>Action</th>
  </tr>
  {
    empList.map((ele,idx)=>(
  <tr key={idx}>
    <td>{ele.userId}</td>
    <td>{ele.title}</td>
    <td>{ele.userId}</td>
   
    <td>{}</td>
    <td>{}</td>
    <td>{}</td>
    <td>{}</td>
    <td>
      <button className="btn btn-primary mx-2" onClick={()=>onEditEmp(ele)}>Edit</button>
      <button className="btn btn-danger mx-2" onClick={()=>onDelEmp(ele)}>Del</button></td>
  </tr>
    ))
  }
        </table>
        
      </div>
      </div>
  )
}

export default App
