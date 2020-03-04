import React, { useEffect, useState } from "react";
import uuid from "uuid";

// css
import "./grid-layout.scss";
import "./resizable.scss";

// components
import Grid from "../grid";
import { FabAdd } from "../fab";
import Toolbar from "../toolbar";

// data
// import firebase from "./config.js";
import dummyData from "../../dummyData.json";

const App = () => {
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
  const colWidth = (gridWidth * (width - (cols + 1) * margin)) / cols;   // the colWidth is the total window width divided by number of columns. Also accounts for the margins.   // the rowHeight is set equal to the colWidth

  return (
    <React.Fragment>
      <FabAdd />
      <Toolbar />
      <Grid
        cols={cols}
        colWidth={colWidth}
        gridWidth={gridWidth}
        rowHeight={colWidth}
        data={data}
        margin={marginArray}
      />
    </React.Fragment>
  );
};

export default App;
