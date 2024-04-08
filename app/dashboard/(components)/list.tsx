"use client";

import { Item as ItemType, List as ListType } from "@/app/lib/definitions";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Item from "./item";
import Loader from "@/app/components/loader";

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
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCustomLink = (
    event: React.MouseEvent<Element, MouseEvent>,
    path: string
  ) => {
    const target = event?.target as HTMLElement;

    if (target?.closest(".input")) return;
    if (target?.closest(".customLink")) {
      router.push(path);
      setEditing(false);
    }
  };

  const editList = async () => {
    setEditing(!editing);
    setEditedList(list);
  };

  // Lists routes ----------------------------------------------------
  const handleSaveChanges = async () => {
    setLoading(true);
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
        setLoading(false);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/lists/${list.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.failed === 0) {
        setLoading(false);
        router.refresh();
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // End of lists routes ----------------------------------------------
  const handlePublic = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e?.target as HTMLInputElement;
    setIsPublic(target.checked);
    editedList.is_public = target.checked;

    return;
  };

  // Items routes ------------------------------------------------------
  const handleAddItem = async () => {
    setLoading(true);
    try {
      const responseOne = await fetch(`/api/random-item`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const randomIdea = await responseOne.json();

      const newItem = {
        list_id: list.id,
        created_by: list.user_id,
        description: randomIdea,
        item_order: items.length,
        is_done: false,
      };

      const responseTwo = await fetch(`/api/lists/${list.id}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: newItem }),
      });

      const data = await responseTwo.json();

      if (data.failed === 0) {
        setItems([...items, data.createdItem]);
        setLoading(false);
        router.refresh();
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/lists/${list.id}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.failed === 0) {
        setItems(data.data);
        setLoading(false);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // End of items routes ----------------------------------------------------

  const editingButtonClass = "input w-6 text-blue-500 hover:text-blue-400";

  return (
    <>
      {loading && <Loader />}
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
                  <>
                    <PencilSquareIcon
                      onClick={editList}
                      className={editingButtonClass}
                    />
                    <TrashIcon
                      onClick={handleDelete}
                      className="w-6 text-red-500 hover:text-red-400"
                    />
                  </>
                )}
                <ChevronUpIcon className="w-6" />
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
            {items.map((item: ItemType) => (
              <li
                className="flex gap-2 border-2 rounded-md p-2 bg-white"
                key={item.id}
              >
                <Item
                  refreshData={fetchItems}
                  setLoading={setLoading}
                  item={item}
                />
              </li>
            ))}
            <li
              onClick={handleAddItem}
              className="flex gap-2 justify-center border-2 rounded-md p-2 bg-white cursor-pointer hover:bg-orange-100/25"
            >
              New Item
              <PlusCircleIcon className="w-6 text-orange-400" />
            </li>
          </ul>
        </div>
      ) : (
        <Link href={`/dashboard?expanded=${list.id}`}>
          <div className="flex flex-col gap-5 border-b-2 p-5">
            <div className="flex gap-5 justify-between">
              <p className="flex-1 border-2 border-transparent">{list.title}</p>
              <span className="flex justify-end gap-4 flex-[0.25_0.25_0%]">
                <>
                  <PencilSquareIcon
                    onClick={editList}
                    className={editingButtonClass}
                  />
                  <TrashIcon
                    onClick={handleDelete}
                    className="w-6 text-red-500 hover:text-red-400"
                  />
                </>
                <ChevronDownIcon className="w-6" />
              </span>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default List;
