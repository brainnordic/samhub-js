export const VERSION = process.env.VERSION;
import Pixel from "./pixel";
import DataLayer from "./datalayer";
import Tracker from "./tracker";

const Samhub = { Pixel, VERSION, DataLayer, Tracker };
export default Samhub;

export { Pixel, DataLayer, Tracker };