import React from "react";
import Spinner from "../../assets/spinner.gif";
function Fullpageloader() {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
} //l'interface de spinner pour le loading

export default Fullpageloader;
