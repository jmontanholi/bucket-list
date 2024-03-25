import { getSession } from "@auth0/nextjs-auth0";

async function Dashboard() {
  const session = await getSession();
  const user = session?.user;

  return (
    <main className="min-w-screen min-h-screen flex flex-col gap-20 pt-[100px] pb-[24px] md:px-[24px]">
      <div className="flex flex-1 gap-10">
        <div className="flex flex-col flex-[1_1_0%] gap-2">
          <h2 className="text-xl">Lists</h2>
          <div
            id="myLists"
            className="flex flex-1 justify-center border-2 rounded-md"
          >
            <ul>iterateOverLists</ul>
          </div>
        </div>

        <div className="min-h-full  flex flex-col flex-[2_1_0%] gap-2">
          <h2 className="text-xl">[ListTitle] Items</h2>
          <div
            id="listItems"
            className="flex flex-1 border-2 justify-center rounded-md"
          >
            <ol>iterateOverItemsOfList</ol>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
