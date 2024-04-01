import { getSession } from "@auth0/nextjs-auth0";
import { List as ListType } from "@/app/lib/definitions";
import List from "@/app/dashboard/(components)/list";
import CreateListButton from "@/app/dashboard/(components)/createListButton";
import CreateListModal from "@/app/dashboard/(components)/createListModal";
import { getLists } from "@/app/(controllers)/lists";

export type Props = {
  searchParams: Record<string, string> | null | undefined;
};

async function Dashboard(props: Props) {
  const showModal = props.searchParams?.createListModal === "true";
  const session = await getSession();
  const user = session?.user;
  let lists: ListType[] = [];

  try {
    const userData = {
      id: user?.sub,
      email: user?.email,
      username: user?.nickname,
    };

    const result = await getLists(userData);

    lists = result.data;
  } catch (err) {
    console.log(err);
  }

  return (
    <main className="min-w-screen min-h-screen flex flex-col items-center pt-[100px] pb-[24px] md:px-[24px]">
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
                      <List list={list} />
                    </li>
                  );
                })
              ) : (
                <li className="w-full h-full">
                  <CreateListButton />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {showModal && <CreateListModal user={user} />}
    </main>
  );
}

export default Dashboard;
