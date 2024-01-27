import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker/locale/en';
import Story from './Story';
import { useSession } from 'next-auth/react';
function Stories() {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(25)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      id: i,
    }));

    console.log(suggestions);
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex border mt-8 p-6 border-gray-200 space-x-2 overflow-x-scroll rounded-sm bg-white scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session?.user?.image} username={session?.user?.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
