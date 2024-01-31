import React from "react";
import { SimpleModalHeadType } from "./types";

export const SimpleModalHead = ({
  title,
  backButton,
  handleBack,
  handleClose
}: SimpleModalHeadType) => {
  return (
    <div className={"flex justify-between mb-6 items-center"}>
      {backButton && <button onClick={handleBack}>back</button>}
      <div>
        <p className={"text-white-100 text-xl font-medium"}>{title}</p>
      </div>
      {handleClose && <button onClick={handleClose}>close</button>}
    </div>
  );
};
