/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import axios from "axios";
function DelEmp({delEmpDetModal, setDelEmpModal}) {

  let {data=null}=delEmpDetModal;

 const onClickYES=()=>{
  alert("clicked YES");
  setDelEmpModal({status:false, data:null});
  };

  const onClickNO =()=>{
  alert("clicked NO");
  setDelEmpModal({status:false, data:null});

  }

  return (
    <div>
      <h3>Are you sure Want to Delete this User?</h3>
      <h4>Employee :{data?.title}</h4>
      <div>
        <button type="button" className="btn btn-danger mx-2" onClick={()=>onClickYES()}>
          YES
        </button>  
        <button className="btn btn-success mx-2" onClick={()=>onClickNO()}>
          NO
          </button>
      </div>
    </div>
  )
}

export default DelEmp