import React from "react";
import Button from "../Button";

const Header = () => {
  return (
    <>
      <header class='text-gray-400 bg-gray-900 body-font'>
        <div class='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <a class='flex title-font font-medium items-center text-white mb-4 md:mb-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              class='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
              viewBox='0 0 24 24'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg>
            <span class='ml-3 text-xl'>ScripVault</span>
          </a>
          <nav class='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'></nav>
          <Button
            color="bg-indigo-500"
            hoverColor="hover:bg-indigo-600"
            text={<>Register</>}
            textSize='text-sm'
            btnSize='10%'
            textColor="text-white"
            link="/register"
          />
          <Button
            color='bg-slate-200'
            hoverColor='hover:bg-slate-300'
            text={<>Login</>}
            textSize='ms-4 text-sm'
            btnSize='10%'
            textColor="text-black"
            link="/login"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
