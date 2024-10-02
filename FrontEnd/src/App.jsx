/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import EditEmp from './components/modals/EditEmp';
import DelEmp from './components/modals/DelEmp';
import { is18OrOlder } from './util/GlobalFunctions';
import axios from 'axios';
// import './App.css'
//SHREYA
function App() {

  const [empDet,setEmpDet]= useState({
    name:"",
    age:"",
    dob:"",
    designation:"",
    salary:"",
    email:""
  });

  //destructr
  let{ name, dob, designation, salary, email} =empDet;

  const [empList,setEmpList]=useState([]);
  const [editEmpDetModal,setEditEmpModal]=useState({status:false, data:null});
  const [delEmpDetModal,setDelEmpModal]=useState({status:false, data:null});
  const [is18Validation,setIs18Validation]=useState(false);
 
 
 const getAllemployee=()=>{
  axios.get(import.meta.env.VITE_BACKEND_URL+"api/Employee/GetEmployeeInfo").then((res)=>{
    setEmpList(res.data);
  });
 }

  useEffect(()=>{
    getAllemployee();
  },[])
  
  useEffect(()=>{
    if(is18Validation){
    setTimeout(()=>{
      setIs18Validation(false)
    },2500)
    }
  },[is18Validation])

  const getAge=(DOBdata)=>{
    return Number(new Date().getFullYear()) - Number(DOBdata.split("-")[0]) 
  }

  const onEmpchange=((e)=>{
    let {name, value}=e.target;
    setEmpDet((el)=>({...el,[name]:value}));
  })

  const onEmpDetSubmit=async (e)=>{
  e.preventDefault();

  if(!is18OrOlder(empDet.dob)){  
    setIs18Validation(true);
    return;
  }

const reqHeader={
  headers: {
    'Content-Type': 'application/json'
  }
};

  const empFinData={
    designation:empDet.designation,
    dob:empDet.dob,
    email:empDet.email,
    name:empDet.name,
    salary:empDet.salary
  };

  console.log(empFinData);
  
  await axios.post(import.meta.env.VITE_BACKEND_URL+"api/Employee/AddEmployee",
     empFinData,reqHeader);

   getAllemployee()
   setEmpDet({
    name:"",
    age:"",
    dob:"",
    designation:"",
    salary:"",
    email:""
  })

  }

    const onEditEmp=(data)=>{
      setEditEmpModal({status:true, data:data})
    }

  const onDelEmp=(data)=>{
    setDelEmpModal({status:true, data:data})
  };

  console.log("emp",empList);
  
  return (<>

    {/* emp validation */}
    <Modal show={is18Validation}>
      <div className="bg-danger d-flex justify-content-center">
        <h5 className="m-2 p-2 text-light">Employee should be greater than 18 year&apos;s old</h5></div>
      </Modal>

  {/* EDIT EMP */}
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
      <Modal.Body><EditEmp setEditEmpModal={setEditEmpModal} editEmpDetModal={editEmpDetModal} getAllemployee={getAllemployee}/></Modal.Body>
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
          <h3 className="modal-title text-center">Delete Employee Data</h3>
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
        delEmpDetModal={delEmpDetModal} 
        getAllemployee={getAllemployee}/> 
        </Modal.Body>
          </Modal>
          
  
    <div className="container card border-radius p-4 shadow bg-white rounded">
      <form onSubmit={(e)=>{onEmpDetSubmit(e)}} >
      <div className="d-flex justify-content-center align-item-center">
        <div>
          <h2 className=" ml-4 mb-4 mt-2 ">MY EMPLOYEE DATA STORE</h2>
        <div>
<div className='border p-2'>


        <div className="row col-12 m-2">
        <div className="col-6"> 
           <label>Employee Name:<span className="text-danger">*</span></label>
           </div>
           <div className="col-6">
           <input id="name" name="name" className="mx-2" type="text" value={name} onChange={(e)=>onEmpchange(e)} title='Enter Name' required/>
           </div>
        </div>

      
        
        <div className="row col-12 m-2">
        <div className="col-6">
          <label>Employee DOB:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="dob"  name="dob" className="mx-2" type="date" value={dob} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12 m-2">
        <div className="col-6">
          <label>Employee Designation:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="designation" name="designation" className="mx-2" type="text" value={designation} onChange={(e)=>onEmpchange(e)} title="Only text is allowed" pattern='^[a-zA-Z@]+$' required/>
        </div>
        </div>

        <div className="row col-12 m-2">
        <div className="col-6">
          <label>Employee Salary:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="salary" name="salary" className="mx-2" type="number" value={salary} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        
        <div className="row col-12 m-2">
        <div className="col-6">
          <label>Employee Email:<span className="text-danger">*</span></label>
        </div>
        <div className="col-6">        
          <input id="email" name="email" className="mx-2" type="email" value={email} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div> 
        </div>
      <button type="submit" className="btn btn-success float-right my-3 px-3">ADD EMPLOYEE</button>
      </div>
      </div>
      
      </div>
      </form>
      <div>
        <table>
        <tr className="bg-sucess">
    <th>SL No.</th>
    <th>Name</th>
    <th>Age</th>
    <th>DOB</th>
    <th>Designation</th>
    <th>Salary</th>
    <th>Email</th>
    <th>Action</th>
  </tr>
  {
    empList.map((ele,idx)=>(
  <tr key={ele.id}>
    <td>{idx+1}</td>
    <td>{ele.name}</td>
    <td>{getAge(ele.dob.split("T")[0])}</td>
    <td>{ele.dob.split("T")[0].split("-").reverse().join("-")}</td>
    <td>{ele.designation}</td>
    <td>{ele.salary}</td>
    <td>{ele.email}</td>
    <td>
      <button className="btn btn-success mx-2 my-2 px-4" onClick={()=>onEditEmp(ele)}>EDIT</button>
      <button className="btn btn-danger mx-2 my-2" onClick={()=>onDelEmp(ele)}>DELETE</button></td>
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
