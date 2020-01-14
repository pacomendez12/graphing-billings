import React from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { ChartTypes } from "../../../Constants";

import "./config.css";

const renderRadioGroup = (values, defaultValue, onChange, radioGroupClass) => {
  return (
    <div className="chart-type-buttons">
      <RadioGroup
        className={radioGroupClass}
        onChange={value => onChange(value)}
        horizontal
        value={defaultValue}
      >
        {values.map(value => (
          <RadioButton
            key={value.value}
            padding={10}
            rootColor="#0066ff"
            pointColor="#0066ff"
            value={value.value}
          >
            {value.name}
          </RadioButton>
        ))}
      </RadioGroup>
    </div>
  );
};

const PdfConfig = props => {
  const onChangeChartType = value => {
    if (value === ChartTypes.SYMBOLS || value === ChartTypes.COLORS)
      props.setChartType(value);
  };

  return (
    <div className="config-main">
      <div className="config-row">
        <div>Tipo de gráfica: </div>
        {renderRadioGroup(
          [
            { value: ChartTypes.COLORS, name: "Colores" },
            { value: ChartTypes.SYMBOLS, name: "Símbolos" }
          ],
          props.chartType,
          onChangeChartType,
          "chart-type"
        )}
      </div>
      <div className="config-row">
        <div>Exportar gráfica resuelta: </div>
        {renderRadioGroup(
          [
            { value: "yes", name: "Sí" },
            { value: "no", name: "No" }
          ],
          props.exportSolved,
          value => props.setExportSolved(value),
          "chart-type"
        )}
      </div>
    </div>
  );
};

export default PdfConfig;
