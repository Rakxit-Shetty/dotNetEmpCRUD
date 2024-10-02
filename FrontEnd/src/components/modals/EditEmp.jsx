import {useState} from 'react'

function EditEmp() {
    const [empDet,setEmpDet]= useState({
        name:"",
        age:"",
        dob:"",
        designation:"",
        phone:"",
        email:""
      });
      let{ name,age,dob, designation,phone,email} =empDet;
      const onEmpchange=((e)=>{
        let {name, value}=e.target;
        setEmpDet((el)=>({...el,[name]:value}));
      })
    const onEmpDetEditSubmit=()=>{
        alert("");

    }
  return (
    <form onSubmit={(e)=>{onEmpDetEditSubmit(e)}}>
      <div className="d-flex justify-content-center align-item-center">
        <div>
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
        
      <button type="submit" className="btn btn-success float-right my-3">SAVE</button>
      </div>
      
      </div>
      </form>
  )
}

export default EditEmp