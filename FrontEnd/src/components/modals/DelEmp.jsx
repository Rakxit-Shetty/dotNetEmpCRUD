/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
function DelEmp({delEmpDetModal, setDelEmpModal, getAllemployee}) {

  let {data=null}=delEmpDetModal;
  console.log(data,"data");

 const onClickYES= async(id)=>{
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/Employee/DeleteEmployee/${id}`);
  getAllemployee();
  setDelEmpModal({status:false, data:null});
  };

  const onClickNO =()=>{
  setDelEmpModal({status:false, data:null});
  };


  return (
    <div>
      <h4>Are you sure want to delete this Employee?</h4>
      <div className="">    
        <h5>Employee Name: &nbsp; {data?.name}</h5>
        </div>
  
      <div className="d-flex justify-content-center m-3">
        <button type="button" className="btn btn-danger mx-2" onClick={()=>onClickYES(data?.id)}>
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