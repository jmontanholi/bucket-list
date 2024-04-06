import clsx from "clsx";
import style from "./loader.module.scss";
function Loader() {
  console.log(style);
  return (
    <span className="flex justify-center items-center absolute h-full w-full bg-black/25">
      <div className={clsx(`${style["lds-roller"]}`)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </span>
  );
}

export default Loader;
