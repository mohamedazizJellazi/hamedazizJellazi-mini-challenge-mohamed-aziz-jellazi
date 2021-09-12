import React, { useState } from "react";
import Fullpageloader from "../Fullpageloader/loader";
function useFullpageLoader() {
  const [loading, setloading] = useState(false);
  return [
    loading ? <Fullpageloader /> : null,
    () => setloading(true),
    () => setloading(false),
  ];
} //un custom hook pour show et hide le spinner pour le loading

export default useFullpageLoader;
