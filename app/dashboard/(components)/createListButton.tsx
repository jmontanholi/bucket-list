"use client";

import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

async function CreateListButton() {
  return (
    <Link
      href={"/dashboard?createListModal=true"}
      className="h-full flex justify-center items-center gap-2 w-full flex-1 py-4 hover:bg-orange-100/25 active:bg-orange-100"
    >
      <p>Create List</p>
      <PlusCircleIcon className="w-6 text-orange-400" />
    </Link>
  );
}

export default CreateListButton;
