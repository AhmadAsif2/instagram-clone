import React from 'react';

function Story({ img, username }) {
  return (
    <div>
      <img
        className="rounded-full w-14 h-14 p-[1.5px] border-red-500 border-2 cursor-pointer object-contain hover:scale-110 transition transform duration-200 ease-out"
        src={img}
        alt=""
      />
      <p className="text-xs truncate w-14 text-center scrollbar-thin">
        {username}
      </p>
    </div>
  );
}

export default Story;
