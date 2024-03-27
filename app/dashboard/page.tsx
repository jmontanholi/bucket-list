import { getSession } from "@auth0/nextjs-auth0";
import { List as ListType } from "@/app/lib/definitions";
import List from "@/app/dashboard/(components)/list";
import CreateListButton from "@/app/dashboard/(components)/createListButton";

async function Dashboard() {
  const session = await getSession();
  const user = session?.user;

  const lists: ListType[] = [];

  const openCreateListModal = async () => {
    "use server";
    console.log("hey bro");
  };

  return (
    <main className="min-w-screen min-h-screen flex flex-col items-center gap-20 pt-[100px] pb-[24px] md:px-[24px]">
      <div className="w-2/4 flex flex-1 gap-10">
        <div className="flex flex-col flex-[1_1_0%] gap-2">
          <h2 className="text-xl">My Lists</h2>
          <div
            id="myLists"
            className="flex flex-1 justify-center border-2 rounded-md"
          >
            <ul className="w-full h-full">
              {lists.length > 0 ? (
                lists.map((list) => {
                  return (
                    <li>
                      <List />
                    </li>
                  );
                })
              ) : (
                <li className="w-full h-full">
                  <CreateListButton action={openCreateListModal} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
