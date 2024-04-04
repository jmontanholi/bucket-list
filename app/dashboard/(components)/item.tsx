import { Item } from "@/app/lib/definitions";
import clsx from "clsx";

type Props = {
  item: Item;
};

export default function Item(props: Props) {
  const { item } = props;
  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className={clsx(
            "input cursor-pointer appearance-none h-5 w-5 border-2 border-orange-200 rounded-md checked:bg-orange-500 checked:border-orange-500"
          )}
        />
        <p>{item.description}</p>
      </div>
    </div>
  );
}
