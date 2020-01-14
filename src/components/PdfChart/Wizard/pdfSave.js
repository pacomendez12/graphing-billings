import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReactComponent as PdfIcon } from "../../../img/pdf.svg";
import "./pdfSave.css";

import PdfRenderer from "../PdfRenderer";

const PdfSave = props => {
  const [renderPdf, setRenderPdf] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRenderPdf(true);

      return () => setRenderPdf(false);
    }, 100);
  }, []);
  return (
    <div className="pdf-save-main">
      <div className="export-button">
        {/* <PdfIcon className="pdf-large-icon" />
        <div className="pdf-large-icon-text">Exportar</div> */}

        {renderPdf ? (
          <PDFDownloadLink
            document={
              <PdfRenderer
                daysData={props.daysData}
                title={props.title}
                comments={props.comments}
                chartType={props.chartType}
                exportSolved={props.exportSolved}
              />
            }
            fileName={`${props.title || "grafica"}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Generando archivo"
              ) : (
                <React.Fragment>
                  <PdfIcon className="pdf-large-icon" />
                  <div className="pdf-large-icon-text">Exportar</div>
                </React.Fragment>
              )
            }
          </PDFDownloadLink>
        ) : null}
      </div>
    </div>
  );
};

export default PdfSave;
