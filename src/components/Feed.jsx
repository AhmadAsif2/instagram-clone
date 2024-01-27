import React from 'react';
import Stories from './Stories';
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';
import { useSession } from 'next-auth/react';

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 md:max-w-3xl xl:max-w-4xl mx-auto ${
        !session && '!grid-cols-1 !max-w-3xl'
      } `}
    >
      <section className=" col-span-2">
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>

      {session && (
        <section className="xl:inline-grid col-span-1 hidden ">
          <div className="fixed top-20 ">
            {/* Miniprofile */}
            <MiniProfile />
            {/* Suggestions */}
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
