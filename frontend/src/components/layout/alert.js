import React from "react";
import swal from "sweetalert";

const alert = () => {
    const swal = swal("Hello world!");
  return <div>
    {swal}
  </div>;
};

export default alert;
