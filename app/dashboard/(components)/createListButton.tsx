"use client";

import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  fillSpace?: boolean;
};

function CreateListButton(props: Props) {
  const { fillSpace } = props;

  const fillClass = "h-full w-full flex-1";

  return (
    <Link
      href={"/dashboard?createListModal=true"}
      className={clsx(
        { [fillClass]: fillSpace },
        { "rounded-md": !fillSpace },
        "flex justify-center items-center gap-2 p-4 hover:bg-orange-100/25 active:bg-orange-100"
      )}
    >
      <p>Create List</p>
      <PlusCircleIcon className="w-6 text-orange-400" />
    </Link>
  );
}

export default CreateListButton;
