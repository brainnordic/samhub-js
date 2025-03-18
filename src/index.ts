export const VERSION = process.env.VERSION;
import Pixel from "./pixel";
import DataLayer from "./datalayer";
import Api from "./api";

const Samhub = { Pixel, VERSION, DataLayer, Api };
export default Samhub;

export { Pixel, DataLayer, Api };