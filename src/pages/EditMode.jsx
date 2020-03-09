import React, { useEffect, useState } from "react";
import uuid from "uuid";
import styled from "styled-components";

// components
import Board from "../components/Board";
import Grid from "../components/Grid/Grid";
import { AddImagesFab } from "../components/Fab";
import Toolbar from "../components/Toolbar";

// css
import "../components/Grid/grid-layout.scss";
import "../components/Grid/resizable.scss";

// data
import dummyData from "../dummyData.json";

const GreyBackground = styled.div`
  background-color: #f9f9f9;
`;

const EditMode = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [data, setData] = useState([]);
  const cols = 5; // number of columns

  // componentDidMount
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    (async () => {
      const getImageDimensions = dummyData.map(({ src, x, y }) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            const { width, height } = img;
            resolve({ src, width, height, x, y, key: uuid() });
          };
        });
      });
      const loadedData = await Promise.all(getImageDimensions);
      setData([...data, ...loadedData]);
    })();
  }, []);

  const margin = 0; // px
  const marginArray = [margin, margin]; // [x,y]
  const gridWidth = 0.7; // % screen width to assign to grid
  // the colWidth is the total window width divided by number of columns. Also accounts for the margins.
   // the rowHeight is set equal to the colWidth
  const colWidth = (gridWidth * (width - (cols + 1) * margin)) / cols;

  return (
    <GreyBackground>
      <AddImagesFab />
      <Toolbar />
      <Board gridWidth={gridWidth}>
        <Grid
          cols={cols}
          colWidth={colWidth}
          rowHeight={colWidth}
          data={data}
          margin={marginArray}
        />
      </Board>
    </GreyBackground>
  );
};

export default EditMode;
