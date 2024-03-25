import { getSession } from '@auth0/nextjs-auth0';

async function Dashboard() {
  const { user } = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
      <div className="flex flex-col align-center justify-center">Dashboard</div>
      {Object.keys(user).map((key) => {
        return (
          <p key={key}>{user[key]}</p>
        )
      })}
    </main>
  );
}

export default Dashboard;
