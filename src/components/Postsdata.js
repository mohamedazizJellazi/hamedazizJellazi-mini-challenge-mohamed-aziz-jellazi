import React from "react";
function Postsdata(props) {
  return (
    <div className="App-border">
      <div>
        <h1>title </h1> {props.datas.title}
      </div>
      <button onClick={() => props.detail(props.datas.body)}>details</button>
    </div>
  );
  //afficher les informations de post et d'avoir les details d'un post
}

export default Postsdata;
