/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Modal } from "react-bootstrap";
import EditEmp from './components/modals/EditEmp';
import DelEmp from './components/modals/DelEmp';
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

  const [editEmpDetModal,setEditEmpModal]=useState({status:false, data:null});
  const [delEmpDetModal,setDelEmpModal]=useState({status:false, data:null});

 let{ name,age,dob, designation,phone,email} =empDet;
 
 const getAllemployee=()=>{
  axios.get(import.meta.env.VITE_BACKEND_URL).then((res)=>{
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
// const reqHeader={
//   headers: {
//     'Content-Type': 'application/json'
//   }
// };

  const empFinData=empDet;
  console.log(empFinData);
  
  // let res=await axios.post('https://localhost:5001/addEmp', empFinData,reqHeader);
  alert("data sent");
  // getAllemployee()
  }

    const onEditEmp=(data)=>{
      setEditEmpModal({status:true, data:data})
      //alert("edit");
    }

  const onDelEmp=(data)=>{
    setDelEmpModal({status:true, data:data})
    // alert("delete");
  };

  return (<>

  <Modal
          show={editEmpDetModal.status}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        ><Modal.Header>
        <div className="col-lg-10">
          <h3 className="modal-title text-center">Edit Employee Details</h3>
        </div>
        <div className="col-lg-2">
          <button
            onClick={()=>{setEditEmpModal({status:false, data:null})}}
            className="close"
          >X
          </button>
        </div>
      </Modal.Header>
      <Modal.Body><EditEmp setEditEmpModal={setEditEmpModal} editEmpDetModal={editEmpDetModal}/></Modal.Body>
          </Modal>

{/* DEL EMP */}
          <Modal
          show={delEmpDetModal.status}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        ><Modal.Header>
        <div className="col-lg-10">
          <h3 className="modal-title text-center">Del Emp Details</h3>
        </div>
        <div className="col-lg-2">
          <button
            onClick={()=>{setDelEmpModal({status:false, data:null})}}
            className="close"
          >X
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <DelEmp 
        setDelEmpModal={setDelEmpModal} 
        delEmpDetModal={delEmpDetModal} /> 
        </Modal.Body>
          </Modal>
          
  
    <div className="container card">
      <form onSubmit={(e)=>{onEmpDetSubmit(e)}}>
      <div className="d-flex justify-content-center align-item-center">
        <div>
          <h2 className="mb-4">Employee DataStore</h2>
        <div>

        <div className="row col-12">
        <div className="col-6"> 
           <label>Employee Name:<span className="text-danger">*</span></label>
           </div>
           <div className="col-6">
           <input id="name" name="name" className="mx-2" type="text" value={name} onChange={(e)=>onEmpchange(e)} title='Enter Name' required/>
           </div>
        </div>

      
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Age:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="age" name="age" className="mx-2" type="text" value={age} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12">
        <div className="col-6">
          <label>Employee DOB:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="dob" name="dob" className="mx-2" type="date" value={dob} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Designation:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="designation" name="designation" className="mx-2" type="text" value={designation} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Phone:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="phone" name="phone" className="mx-2" type="text" value={phone} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12">
        <div className="col-6">
          <label>Employee Email:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="email" name="email" className="mx-2" type="email" value={email} onChange={(e)=>onEmpchange(e)} required/>
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
      </>
  )
}

export default App
