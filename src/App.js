import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useStyles } from "./style";
import { useDispatch } from "react-redux";
import { setClasses } from "./reducers/styleReducer";
import { setData } from "./reducers/dataReducer";
import Drawer from "./components/Drawer";
import Routing from "./components/utils/Routing";
import { getPrediction, getData } from "./services/service";
import { setPrediction } from "./reducers/predictionReducer";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getResources() {
      const prediction = await getPrediction();
      const data = await getData();
      const filteredData = data.results.map(filterData);
      dispatch(setPrediction(prediction));
      dispatch(setData(filteredData));
      dispatch(setClasses(classes));
    }
    getResources();
  });

  return (
    <div>
      <Navbar />
      <Drawer />
      <main className={classes.bigPadding}>
        <Routing />
      </main>
    </div>
  );
};

const filterData = (data) => {
  data.open = data.o;
  data.high = data.h;
  data.low = data.l;
  data.close = data.c;
  data.volume = data.v;
  data.date = new Date(data.t);

  delete data.o;
  delete data.vw;
  delete data.c;
  delete data.h;
  delete data.l;
  delete data.t;
  delete data.n;
  delete data.v;
  return data;
};
export default App;
