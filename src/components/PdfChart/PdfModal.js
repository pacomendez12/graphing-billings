import React from "react";
import "./PdfModal.css";
import { ReactComponent as CloseIcon } from "../../img/close.svg";
import PdfWizard from "./Wizard";
export default function PdfPreview(props) {
  return (
    <div className="pdf-main">
      <div className="top-bar">
        <div className="title">Exportar gráfica a PDF</div>
        <button
          className="close-button"
          onClick={() => {
            props.onClose();
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="pdf-body">
        {
          <PdfWizard
            daysData={props.daysData}
            title={props.title}
            comments={props.comments}
            chartType={props.chartType}
            closeModal={props.onClose}
          />
        }
      </div>
    </div>
  );
}
