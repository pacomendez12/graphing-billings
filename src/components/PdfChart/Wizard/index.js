import React, { useState } from "react";
import StepWizard from "react-step-wizard";

import "./wizard.css";

import Config from "./config";
import PdfSave from "./pdfSave";

const NavButtons = props => {
  return <div></div>;
};

const customTransitions = {
  enterRight: "fadeIn",
  enterLeft: "fadeIn",
  exitRight: "fadeOut",
  exitLeft: "fadeOut"
};

const PdfWizard = props => {
  const [chartType, setChartType] = useState(props.chartType);
  const [exportSolved, setExportSolved] = useState("yes");
  return (
    <StepWizard
      nav={<NavButtons />}
      transitions={customTransitions}
      className="wizard"
    >
      <PdfSave
        daysData={props.daysData}
        title={props.title}
        comments={props.comments}
        chartType={chartType}
        exportSolved={exportSolved === "yes"}
        closeModal={props.closeModal}
        className="wizard-step"
      />
    </StepWizard>
  );
};

export default PdfWizard;
