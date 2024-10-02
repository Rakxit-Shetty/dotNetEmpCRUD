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
      <h3>Are you sure Want to Delete this User?</h3>
      <h4>Employee :{data?.title}</h4>
      <div>
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