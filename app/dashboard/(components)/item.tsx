import { Item as ItemType } from "@/app/lib/definitions";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

type Props = {
  item: ItemType;
  refreshData: Function;
};

export default function Item(props: Props) {
  const router = useRouter();
  const { item, refreshData } = props;
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);
  const [done, setDone] = useState(item.is_done);

  const editingButtonClass =
    "cursor-pointer w-6 text-blue-500 hover:text-blue-400";

  const editItem = () => {
    setEditing(!editing);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `/api/lists/${item.list_id}/items/${item.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedItem: editedItem }),
        }
      );

      const data = await response.json();

      if (data.failed === 0) {
        await refreshData();
        setEditing(false);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/lists/${item.list_id}/items/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.failed === 0) {
        refreshData();
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDone = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e?.target as HTMLInputElement;
    setDone(target.checked);
    editedItem.is_done = target.checked;

    handleSaveChanges();

    return;
  };

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center gap-2">
        <input
          type="checkbox"
          className={clsx(
            "input cursor-pointer appearance-none h-5 w-5 border-2 border-orange-200 rounded-md checked:bg-orange-500 checked:border-orange-500"
          )}
          defaultChecked={done}
          onChange={(e) => handleDone(e)}
        />
        {editing ? (
          <input
            className="input flex-1 border-2 rounded-md"
            type="text"
            value={editedItem.description}
            onChange={(e) =>
              setEditedItem({ ...editedItem, description: e.target.value })
            }
          />
        ) : (
          <p
            className={clsx("flex-1 border-2 border-transparent max-w-96", {
              "line-through decoration-2": done,
            })}
          >
            {item.description}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        {editing ? (
          <>
            <CheckCircleIcon
              onClick={handleSaveChanges}
              className="cursor-pointer w-6 text-green-500 hover:text-green-400"
            />
            <XCircleIcon
              onClick={editItem}
              className="cursor-pointer w-6 text-red-500 hover:text-red-400"
            />
          </>
        ) : (
          <>
            <PencilSquareIcon
              onClick={editItem}
              className={editingButtonClass}
            />
            <TrashIcon
              onClick={handleDelete}
              className="cursor-pointer w-6 text-red-500 hover:text-red-400"
            />
          </>
        )}
      </div>
    </div>
  );
}
