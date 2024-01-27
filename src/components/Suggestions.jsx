import React from 'react';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker/locale/en';
function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      companyName: faker.company.name(),
      id: i,
    }));

    // console.log(suggestions);
    setSuggestions(suggestions);
  }, []);
  return (
    <div>
      <div className="flex justify-between mt-10 ml-10 mb-6">
        <h3 className="text-sm font-semibold text-gray-400">
          Suggestions for you
        </h3>
        <button className="font-semibold text-sm cursor-pointer text-gray-600">
          See All
        </button>
      </div>

      {suggestions.map((profile) => (
        <div key={profile.id} className="flex items-center ml-10 mb-4">
          <img
            className="w-10 h-10 rounded-full border p-[2px] cursor-pointer"
            src={profile.avatar}
            alt=""
          />

          <div className="flex flex-col ml-3 flex-1">
            <h3 className="font-semibold text-sm">{profile.username}</h3>
            <p className="text-xs text-gray-400">
              Works at {profile.companyName}
            </p>
          </div>

          <button className="text-blue-400 text-sm ">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
