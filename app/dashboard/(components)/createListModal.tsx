import Link from "next/link";
import clsx from "clsx";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { createList } from "@/app/(controllers)/lists";
import { redirect } from "next/navigation";

const inputClass =
  "border-2 border-orange-200 rounded-md p-1 outline-none focus:border-orange-500";
const submitClass = "bg-orange-500 py-1 px-3 rounded-md text-white";

export default function CreateListModal(user: any) {
  const handleSubmit = async (data: FormData) => {
    "use server";

    const userData = {
      id: user.user.sub,
      email: user.user.email,
      username: user.user.nickname,
    };

    const listData = {
      user_id: user.user.sub,
      title: data.get("title") as string,
      description: data.get("description") as string,
      is_public: data.get("public") === "on",
    };

    const result = await createList(userData, listData);

    if (!result.failed) {
      redirect("/dashboard");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <Link
        href={"/dashboard"}
        className="fixed inset-0 bg-black/50 cursor-default"
      ></Link>
      <form
        action={handleSubmit}
        className="flex flex-col items-center gap-5 pt-12 pb-5 px-12 relative w-full max-w-96 bg-white rounded-md shadow-md"
      >
        <Link className="absolute top-2 right-2" href={"/dashboard"}>
          <XCircleIcon className="w-7 text-orange-500" />
        </Link>
        <input
          className={clsx(inputClass, "w-full")}
          type="text"
          name="title"
          placeholder="List Title"
          required
        />
        <div className="flex flex-col gap-2 items-center w-full">
          <textarea
            className={clsx(inputClass, "h-40 resize-none w-full")}
            placeholder="Description"
            name="description"
            id="description"
            cols={25}
            rows={1}
            maxLength={100}
            required
          ></textarea>
          <span className="text-xs">Max length: 100 characters</span>
        </div>
        <div className="flex gap-2 self-start">
          <input
            className={clsx(
              "cursor-pointer appearance-none h-5 w-5 border-2 border-orange-200 rounded-md checked:bg-orange-500 checked:border-orange-500"
            )}
            type="checkbox"
            name="public"
            id="public"
          />
          <p>Public</p>
        </div>
        <button className={clsx(submitClass)}>Submit</button>
      </form>
    </div>
  );
}
