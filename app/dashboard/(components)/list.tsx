import { List as ListType } from "@/app/lib/definitions";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

type Props = {
  list: ListType;
  expanded?: boolean;
};

function List(props: Props) {
  const { list, expanded } = props;

  return (
    <>
      {expanded ? (
        <div className="flex flex-col gap-2 border-b-2 pb-5">
          <Link href={`/dashboard`}>
            <div className="flex gap-5 justify-between p-5">
              <p>{list.title}</p>
              <ChevronUpIcon className="w-5" />
            </div>
            <div className="flex justify-between px-5">
              <p>{list.description}</p>
              <div className="flex gap-2 self-start">
                <input
                  className={clsx(
                    "cursor-pointer appearance-none h-5 w-5 border-2 border-orange-200 rounded-md checked:bg-orange-500 checked:border-orange-500"
                  )}
                  type="checkbox"
                  name="public"
                  id="public"
                  defaultChecked={list.is_public}
                />
                <p>Public</p>
              </div>
            </div>
          </Link>
          <ul className="flex flex-col gap-1 p-5 border-y-2 bg-gray-100/50">
            <li className="border-2 rounded-md p-2 bg-white">
              list of items here
            </li>
            <li className="border-2 rounded-md p-2 bg-white">
              list of items here
            </li>
            <li className="border-2 rounded-md p-2 bg-white">
              list of items here
            </li>
          </ul>
        </div>
      ) : (
        <Link href={`/dashboard?expanded=${list.id}`}>
          <div className="flex flex-col gap-5 border-b-2 p-5">
            <div className="flex gap-5 justify-between">
              <p>{list.title}</p>
              <ChevronDownIcon className="w-5" />
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default List;
