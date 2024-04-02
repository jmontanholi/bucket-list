import { List as ListType } from "@/app/lib/definitions";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

type Props = {
  list: ListType;
  expanded?: boolean;
};

function List(props: Props) {
  const { list, expanded } = props;

  return (
    <>
      {expanded ? (
        <Link href={`/dashboard`}>
          <div className="flex flex-col gap-5 border-b-2 p-5">
            <div className="flex gap-5 justify-between">
              <p>{list.id}</p>
              <p>{list.title}</p>
              <ChevronUpIcon className="w-5" />
            </div>
            <div className="border-b-2">
              <p>{list.description}</p>
            </div>
            <ul className="flex flex-col border-2 border-orange-500">
              <li className="border-2 border-teal-300">list of items here</li>
            </ul>
          </div>
        </Link>
      ) : (
        <Link href={`/dashboard?expanded=${list.id}`}>
          <div className="flex flex-col gap-5 border-b-2 p-5">
            <div className="flex gap-5 justify-between">
              <p>{list.id}</p>
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
