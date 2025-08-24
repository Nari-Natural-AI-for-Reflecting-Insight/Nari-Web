import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <main className="flex flex-col items-center w-full h-dvh">
      <section className="bg-[#161820] max-w-md w-full h-dvh pb-[108px]">
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
