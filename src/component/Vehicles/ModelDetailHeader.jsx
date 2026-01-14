import React from "react";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";

const ModelDetailHeader = ({ modelName }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <VehicleBreadcrumbs modelName={modelName} />
    </div>
  );
};

export default ModelDetailHeader;

