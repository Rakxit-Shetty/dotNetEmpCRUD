/* eslint-disable react/prop-types */
import {useState} from 'react'
import axios from "axios";

function EditEmp({
  setEditEmpModal, 
  editEmpDetModal, 
  getAllemployee
}) {
  let {data=null}=editEmpDetModal;
 
    const [empDet,setEmpDet]= useState({
        name:data?.name,
        dob:data?.dob.split("T")[0],
        designation:data?.designation,
        salary:data?.salary,
        email:data?.email
      });

      let{ name,dob, designation,salary,email} =empDet;
      
      const onEmpchange=((e)=>{
        let {name, value}=e.target;
        setEmpDet((el)=>({...el,[name]:value}));
      });

    const onEmpDetEditSubmit=async (e)=>{
      e.preventDefault();
     
const reqHeader={
  headers: {
    'Content-Type': 'application/json'
  }
};

  const empUpdatedData={
    id:data?.id,
    designation:empDet.designation,
    dob:empDet.dob,
    email:empDet.email,
    name:empDet.name,
    salary:empDet.salary
  };

  await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/Employee/UpdateEmployee/${data?.id}`,
    empUpdatedData,reqHeader);
    
  getAllemployee();
  setEditEmpModal({status:false, data:null})
   }


  return (
    <form onSubmit={(e)=>{onEmpDetEditSubmit(e)}}>
      <div className="d-flex justify-content-center align-item-center">
        <div>
        <div>
        <div className="row col-12 m-2">
        <div className="col-6"> 
           <label>Employee Name</label>
           </div>
           <div className="col-6">
           <input id="name" name="name" className="mx-2" type="text" value={name} onChange={(e)=>onEmpchange(e)} required/>
           </div>
        </div>

    
        <div className="row col-12 m-2">
        <div className="col-6">
          <label>Employee DOB</label>
        </div>
        <div className="col-6">        
          <input id="dob" name="dob" className="mx-2" type="date" value={dob} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12 m-2">
        <div className="col-6">
          <label>Employee Designation</label>
        </div>
        <div className="col-6">        
          <input id="designation" name="designation" className="mx-2" type="text" value={designation} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12 m-2">
        <div className="col-6">
          <label>Employee Salalry</label>
        </div>
        <div className="col-6">        
          <input id="salary" name="salary" className="mx-2" type="text" value={salary} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
        <div className="row col-12 m-2">
        <div className="col-6">
          <label>Employee Email</label>
        </div>
        <div className="col-6">        
          <input id="email" name="email" className="mx-2" type="text" value={email} onChange={(e)=>onEmpchange(e)} required/>
        </div>
        </div>
         
        </div>
        
      <button type="submit" className="btn btn-success float-right my-3">SAVE</button>
      </div>
      
      </div>
      </form>
  )
}

export default EditEmp