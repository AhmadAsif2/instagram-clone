import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  HeartIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atoms/modalAtom';

function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  console.log(session);

  return (
    <div className="flex justify-center shadow-sm border-b bg-white sticky z-50 top-0">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between items-center">
          {/* left */}
          <div className="hidden lg:inline-grid relative h-24 w-24 cursor-pointer">
            <Image
              src="https://links.papareact.com/ocw"
              layout="fill"
              objectFit="contain"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="relative flex-shrink-0 lg:hidden sm:inline-grid h-10 w-10 cursor-pointer">
            <Image
              src="https://links.papareact.com/jjm"
              layout="fill"
              objectFit="contain"
              onClick={() => router.push('/')}
            />
          </div>

          {/* Middle */}
          <div className="max-w-xs">
            <div className="relative mt-1 p-3 rounded-md">
              <div className="inset-y-0 absolute pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="bg-gray-50 pl-10 block w-full sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

          {/* right */}
          <div className="flex items-center justify-end space-x-4">
            <HomeIcon className="navBtn" onClick={() => router.push('/')} />
            <MenuIcon className="h-6 md:hidden cursor-pointer" />

            {session ? (
              <>
                <div className="relative navBtn">
                  <PaperAirplaneIcon className="navBtn rotate-45" />
                  <div className="absolute -top-1 -right-2 bg-red-400 rounded-full flex items-center text-white justify-center w-5 h-5 text-xs animate-pulse">
                    12
                  </div>
                </div>

                <PlusCircleIcon
                  onClick={() => setOpen(true)}
                  className="navBtn"
                />
                <UserGroupIcon className="navBtn" />
                <HeartIcon className="navBtn" />

                <img
                  onClick={signOut}
                  src={session?.user?.image}
                  alt="Profile Picture"
                  className="h-10  rounded-full cursor-pointer"
                />
              </>
            ) : (
              <button onClick={signIn}>Sign In</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
