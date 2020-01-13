import React, { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import PdfRenderer from "./PdfRenderer";
import "./PdfPreview.css";
import { ReactComponent as CloseIcon } from "../../img/close.svg";
export default function PdfPreview(props) {
  const [renderPdf, setRenderPdf] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRenderPdf(true);

      return () => setRenderPdf(false);
    }, 100);
  }, []);
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
        {renderPdf &&
          (true ? (
            <PDFViewer>
              <PdfRenderer
                daysData={props.daysData}
                title={props.title}
                comments={props.comments}
                chartType={props.chartType}
              />
            </PDFViewer>
          ) : (
            <div>
              <PDFDownloadLink
                document={
                  <PdfRenderer
                    daysData={props.daysData}
                    title={props.title}
                    comments={props.comments}
                    chartType={props.chartType}
                  />
                }
                fileName="somename.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download now!"
                }
              </PDFDownloadLink>
            </div>
          ))}
      </div>
    </div>
  );
}
