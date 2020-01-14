import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet
} from "@react-pdf/renderer";

import babeImage from "./icons/babeIcon";
import blackDotsImage from "./icons/blackDotsImage";
import babeRedDotsIcon from "./icons/babeRedDotsIcon";
import bigDotIcon from "./icons/bigDotIcon";
import bigDotUnfilledIcon from "./icons/bigDotUnfilledIcon";
import bigDotUnfilledWithDotsIcon from "./icons/bigDotUnfilledWithDots";
import horizontalLinesIcon from "./icons/horizontalLinesIcon";
import verticalLineIcon from "./icons/verticalLineIcon";

const MAX_DAYS_PER_CHART = 36;

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row"
  },
  section: {
    margin: 8,
    padding: 8,
    flexGrow: 1,
    justifyContent: "space-between"
  },
  tableContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  table: {
    flexDirection: "row",
    height: "250pt",
    borderLeftColor: "black",
    borderLeftWidth: "1pt"
  },
  item: {
    width: "20pt",
    borderRight: "1pt solid black",
    flexDirection: "column"
  },
  itemHeader: {
    width: "40pt",
    borderRight: "1pt solid black",
    flexDirection: "column",
    backgroundColor: "#fafafa"
  },
  text: {
    fontSize: 12
  }
});

const renderTable = (daysData, subChartIdx, peakDay, chartType, fillChart) => {
  const tableContainerDynamic =
    subChartIdx === 1
      ? { marginBottom: "16pt" }
      : subChartIdx > 1
      ? { marginBottom: "16pt", marginTop: "16pt" }
      : {};
  return (
    <View
      wrap={false}
      style={[
        styles.tableContainer,
        { justifyContent: subChartIdx === 0 ? "center" : "flex-start" },
        tableContainerDynamic
      ]}
      key={subChartIdx}
    >
      <View style={styles.table}>
        <View style={styles.itemHeader}>
          <View
            style={{
              width: "40pt",
              height: "20pt",
              borderBottom: "1pt solid black",
              borderTop: "1pt solid black",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              maxLines={1}
              style={{
                fontSize: 10
              }}
            >
              Día
            </Text>
          </View>
          <View
            style={{
              width: "40pt",
              height: "80pt",
              borderBottom: "1pt solid black",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                transform: "rotate(-90deg) translate(-30pt, 0pt)",
                width: "80pt",
                fontSize: 10
              }}
            >
              Símbolo o color
            </Text>
          </View>
          <View style={{ height: "130pt" }}>
            <Text
              maxLines={1}
              style={{
                transform: "rotate(-90deg) translate(-60pt, -45pt)",
                width: "130pt",
                fontSize: 10,
                textAlign: "center"
              }}
            >
              Apariencia y sensación
            </Text>
          </View>
          <View
            style={{
              width: "40pt",
              height: "20pt",
              borderTop: "1pt solid black",
              borderBottom: "1pt solid black",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              maxLines={1}
              style={{
                fontSize: 10
              }}
            >
              Regla
            </Text>
          </View>
        </View>
        {daysData.map((day, idx) => {
          let bColor = "white";
          let icon;

          if (fillChart) {
            if (chartType === "COLORS") {
              switch (day.symbol.background) {
                case "RED":
                  bColor = "#AA0000";
                  break;
                case "GREEN":
                  bColor = "#1E6F1E";
                  break;
                case "YELLOW":
                  bColor = "#FFCC00";
                  break;
                default:
                  break;
              }

              switch (day.symbol.icon) {
                case "BABE":
                  icon = babeImage;
                  break;
                case "BLACK_DOTS":
                  icon = blackDotsImage;
                  break;
                case "BABE_RED_DOTS":
                  icon = babeRedDotsIcon;
                  break;
                default:
                  break;
              }
            } else {
              // symbols case
              switch (day.symbol.icon) {
                case "RED_ICON":
                  icon = bigDotIcon;
                  break;
                case "BLACK_DOTS":
                  icon = blackDotsImage;
                  break;
                case "GREEN_ICON":
                  icon = verticalLineIcon;
                  break;
                case "YELLOW_ICON":
                  icon = horizontalLinesIcon;
                  break;
                case "BABE":
                  if (idx > peakDay && idx <= peakDay + 3) {
                    icon =
                      day.symbol.background === "GREEN"
                        ? verticalLineIcon
                        : day.symbol.background === "GREEN"
                        ? horizontalLinesIcon
                        : "";
                  } else {
                    icon = bigDotUnfilledIcon;
                  }
                  break;
                case "BABE_RED_DOTS":
                  icon = bigDotUnfilledWithDotsIcon;
                  break;
                default:
                  break;
              }
            }
          }
          return (
            <View style={styles.item} key={idx}>
              <View
                style={{
                  width: "19pt",
                  height: "20pt",
                  borderBottom: "1pt solid black",
                  borderTop: "1pt solid black",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa"
                }}
              >
                <Text
                  maxLines={1}
                  style={{
                    fontSize: 10
                  }}
                >
                  {subChartIdx * MAX_DAYS_PER_CHART + (idx + 1)}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: bColor,
                  width: "19pt",
                  height: "80pt",
                  borderBottom: "1pt solid black",
                  alignItems: "center"
                }}
              >
                {icon ? (
                  <Image
                    style={{ marginTop: "5pt", width: "15pt" }}
                    source={icon}
                  />
                ) : (
                  <View style={{ height: "37pt" }}></View>
                )}
                <View
                  style={{
                    marginTop: "13pt",
                    width: "20pt",
                    height: "15pt",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 10 }}>
                    {fillChart
                      ? day.symbol.peakDay === true
                        ? "X"
                        : day.symbol.numberDay || ""
                      : ""}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20pt",
                    height: "15pt",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 10 }}>
                    {fillChart
                      ? day.symbol.intercourse === true
                        ? "R"
                        : ""
                      : ""}
                  </Text>
                </View>
              </View>
              <View style={{ height: "130pt" }}>
                <Text
                  maxLines={1}
                  wrap={false}
                  style={{
                    transform: "rotate(-90deg) translate(-60pt, -50pt)",
                    width: "120pt",
                    fontSize: 9
                  }}
                >
                  {day.annotation}
                </Text>
              </View>
              <View
                style={{
                  width: "19pt",
                  height: "20pt",
                  borderTop: "1pt solid black",
                  borderBottom: "1pt solid black",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  maxLines={1}
                  style={{
                    fontSize: 9
                  }}
                >
                  {fillChart ? day.rule : ""}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const renderTableSpliting = (daysData, peakDay, chartType, fillChart) => {
  let printedDay = 0;
  let idx = 0;
  const result = [];
  while (printedDay < daysData.length) {
    const end =
      printedDay + MAX_DAYS_PER_CHART > daysData.length
        ? daysData.length
        : printedDay + MAX_DAYS_PER_CHART;
    const subArrayDays = daysData.slice(printedDay, end);
    result.push(renderTable(subArrayDays, idx, peakDay, chartType, fillChart));
    printedDay += MAX_DAYS_PER_CHART;
    idx++;
  }
  return result;
};

const ChartToPdf = props => {
  const fillChart = props.exportSolved;

  const peakDay = props.daysData.findIndex(day => day.symbol.peakDay);

  return (
    <Document title={props.title}>
      <Page size="LETTER" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            {props.title}
          </Text>
          {renderTableSpliting(
            props.daysData,
            peakDay,
            props.chartType,
            fillChart !== undefined && fillChart !== null ? fillChart : true
          )}
          <Text maxLines={2} style={{ textAlign: "center", fontSize: 12 }}>
            {props.comments}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ChartToPdf;
