import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="flex flex-wrap items-center justify-center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4 className="text-3xl text-white">Cargando...</h4>
      </div>
    </div>
  );
};

export default Spinner;
