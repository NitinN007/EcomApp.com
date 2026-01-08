import React from "react";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
