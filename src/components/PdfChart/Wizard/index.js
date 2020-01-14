import React, { useState } from "react";
import StepWizard from "react-step-wizard";

import "./wizard.css";

import Config from "./config";
import PdfSave from "./pdfSave";

const NavButtons = props => {
  return (
    <div
      style={{
        justifyContent: props.currentStep === 1 ? "flex-end" : "space-between"
      }}
      className="nav-buttons"
    >
      {props.currentStep > 1 ? (
        <div className="button" onClick={() => props.previousStep()}>
          <span className="text">Anterior</span>
        </div>
      ) : null}
      {props.currentStep !== props.totalSteps ? (
        <div className="button" onClick={() => props.nextStep()}>
          <span className="text">Siguiente</span>
        </div>
      ) : null}
    </div>
  );
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
      <Config
        chartType={chartType}
        setChartType={setChartType}
        exportSolved={exportSolved}
        setExportSolved={setExportSolved}
        className="wizard-step"
      />
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
