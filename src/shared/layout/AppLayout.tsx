import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="bg-[#161820] max-w-md w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
