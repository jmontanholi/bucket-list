"use client";

import { List as ListType } from "@/app/lib/definitions";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

type Props = {
  list: ListType;
  expanded?: boolean;
};

function List(props: Props) {
  let { list, expanded } = props;
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [editedList, setEditedList] = useState(list);
  const [isPublic, setIsPublic] = useState(list.is_public);

  const handleCustomLink = (
    event: React.MouseEvent<Element, MouseEvent>,
    path: string
  ) => {
    const target = event?.target as HTMLElement;

    if (target?.closest(".input")) return;
    if (target?.closest(".customLink")) {
      router.push(path);
    }
  };

  const editList = async () => {
    setEditing(!editing);
    setEditedList(list);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/lists/${list.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedList: editedList }),
      });

      const data = await response.json();

      if (data.failed === 0) {
        router.refresh();
        setEditing(false);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublic = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e?.target as HTMLInputElement;
    setIsPublic(target.checked);
    editedList.is_public = target.checked;

    return;
  };

  const editingButtonClass = "input w-6 text-orange-500 hover:text-orange-400";

  return (
    <>
      {expanded ? (
        <div className="flex flex-col gap-2 border-b-2 pb-5">
          <div
            className="customLink cursor-pointer"
            onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
              handleCustomLink(e, "/dashboard");
            }}
          >
            <div className="flex gap-5 justify-between p-5">
              {editing ? (
                <input
                  className="input flex-1 border-2 rounded-md  max-w-96"
                  type="text"
                  value={editedList.title}
                  onChange={(e) =>
                    setEditedList({ ...editedList, title: e.target.value })
                  }
                />
              ) : (
                <p className="flex-1 border-2 border-transparent">
                  {list.title}
                </p>
              )}
              <span className="flex justify-end gap-4 flex-[0.25_0.25_0%]">
                {editing ? (
                  <>
                    <CheckCircleIcon
                      onClick={handleSaveChanges}
                      className="input w-6 text-green-500 hover:text-green-400"
                    />
                    <XCircleIcon
                      onClick={editList}
                      className="input w-6 text-red-500 hover:text-red-400"
                    />
                  </>
                ) : (
                  <PencilSquareIcon
                    onClick={editList}
                    className={editingButtonClass}
                  />
                )}
                <ChevronUpIcon className="w-5" />
              </span>
            </div>
            <div className="flex justify-between px-5 gap-1">
              {editing ? (
                <textarea
                  className="flex-1 input border-2 rounded-md max-h-16 max-w-96"
                  value={editedList.description}
                  onChange={(e) =>
                    setEditedList({
                      ...editedList,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="flex-1  border-2 border-transparent max-w-96">
                  {list.description}
                </p>
              )}
              <div className="flex justify-end flex-[0.25_0.25_0%] gap-2 self-start">
                <input
                  className={clsx(
                    "input cursor-pointer appearance-none h-5 w-5 border-2 border-orange-200 rounded-md checked:bg-orange-500 checked:border-orange-500"
                  )}
                  type="checkbox"
                  name="public"
                  id="public"
                  defaultChecked={isPublic}
                  disabled={!editing}
                  onChange={(e) => handlePublic(e)}
                />
                <p>Public</p>
              </div>
            </div>
          </div>
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
              <p className="flex-1">{list.title}</p>
              <span className="flex justify-end gap-4 flex-[0.25_0.25_0%]">
                <PencilSquareIcon
                  onClick={editList}
                  className={editingButtonClass}
                />
                <ChevronDownIcon className="w-5" />
              </span>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default List;
