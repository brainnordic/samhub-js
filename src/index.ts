export const VERSION = process.env.VERSION;
import Pixel from "./pixel";
import DataLayer from "./datalayer";
import Tracker from "./tracker";

const Samhub = { Pixel, VERSION, DataLayer, Tracker };

export { Pixel, DataLayer, Tracker };

if (typeof window !== "undefined") {
  (window as any).samhubData = (window as any).samhubData || [];
  const data_layer = new DataLayer((window as any).samhubData);
  let tracker: Tracker | null = null;
  data_layer.on("init", (...args) => {
    tracker = new Tracker(...args);
  });

  data_layer.on("track", (...args) => {
    if (tracker) {
      tracker.track(...args);
    }
  });
}

export default Samhub;