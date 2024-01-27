import { signOut, useSession } from 'next-auth/react';
import React from 'react';

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user?.image}
        className="rounded-full w-12 h-12 "
        alt=""
      />

      <div className="flex-1 mx-4">
        <h2 className="font-semibold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button
        className="text-blue-400 text-sm font-semibold cursor-pointer"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
