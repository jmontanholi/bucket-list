"use client";

import { PlusCircleIcon } from "@heroicons/react/20/solid";

type props = {
  action: Function;
};

async function CreateListButton({ action }: props) {
  return (
    <button className="h-full flex justify-center items-center gap-2 w-full flex-1 py-4 hover:bg-orange-100/25 active:bg-orange-100">
      <p>Create List</p>
      <PlusCircleIcon className="w-6 text-orange-400" />
    </button>
  );
}

export default CreateListButton;
