import React from "react";
function Userdata(props) {
  return (
    <div className="App-border">
      <div>email : {props.datas.email}</div>
      <div>name : {props.datas.name}</div>
      <div>gender : {props.datas.gender}</div>
      <div>status : {props.datas.status}</div>
      <button onClick={() => props.detail(props.datas.id)}>Details</button>
    </div>
  );
  // afficher les informations de user et d'avoir de user qu'on veut savoir ses détails
}

export default Userdata;
