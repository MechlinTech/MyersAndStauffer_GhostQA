import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import AvarageResponseTimeChart from "./Graph/AvarageResponseTimeChart";
import SecondChart from "./Graph/SecondChart";
import ThirdChart from "./Graph/ThirdChart";
import FourthChart from "./Graph/FourthChart";
import FiftChart from "./Graph/FiftChart";
import SixChart from "./Graph/SixChart";

export default function Trends() {
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (cardValue) => {
    setSelectedCard(cardValue);
  };

  const calculateChartHeight = () => {
    const parentContainer = document.getElementById("line-container");
    const parentContainerHeight = parentContainer
      ? parentContainer.clientHeight
      : window.innerHeight;
    const desiredPercentage = 38;
    const calculatedHeight = `${
      (parentContainerHeight * desiredPercentage) / 100
    }px`;
    console.log("calculatedHeight", calculatedHeight);
    return calculatedHeight;
  };

  const renderChart = () => {
    switch (selectedCard) {
      case 1:
        return <AvarageResponseTimeChart height={300} fontSize="16px" />;
      case 2:
        return <SecondChart height={calculateChartHeight()} fontSize="16px"/>;
      case 3:
        return <ThirdChart height={calculateChartHeight()} fontSize="16px"/>;
      case 4:
        return <FourthChart height={calculateChartHeight()} fontSize="16px"/>;
      case 5:
        return <FiftChart height={calculateChartHeight()} fontSize="16px"/>;
      case 6:
        return <SixChart height={calculateChartHeight()} fontSize="16px"/>;
      default:
        return null;
    }
  };

  return (
    <>
      <Grid>
        {/* main compoent */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Card
              style={{
                width: "100%",
                height: "50vh",
                padding: "10px",
              }}
            >
              {renderChart()}
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {[1, 2, 3, 4, 5, 6].map((cardValue) => (
            <Grid item xs={12} sm={2} key={cardValue}>
              <Card
                style={{
                  width: "100%",
                  height: "20vh",
                  // padding: "10px",
                  cursor: "pointer",
                  border: `2px solid ${
                    selectedCard === cardValue ? "#654DF7" : "#FFFFFF"
                  }`,
                }}
                onClick={() => handleCardClick(cardValue)}
              >
                <div>
                  {cardValue === 1 && (
                    <AvarageResponseTimeChart height={'155px'} fontSize="8px" />
                  )}
                  {cardValue === 2 && (
                    <SecondChart height={'155px'} fontSize="8px" />
                  )}
                  {cardValue === 3 && (
                    <ThirdChart height={'155px'} fontSize="8px" />
                  )}
                  {cardValue === 4 && (
                    <FourthChart height={'155px'} fontSize="8px" />
                  )}
                  {cardValue === 5 && (
                    <FiftChart height={'155px'} fontSize="8px" />
                  )}
                  {cardValue === 6 && (
                    <SixChart height={'155px'} fontSize="8px" />
                  )}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
