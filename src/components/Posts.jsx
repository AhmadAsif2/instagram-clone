import { useEffect } from 'react';
import Post from './Post';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { collection } from 'firebase/firestore';
import React from 'react';

function Posts() {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => setPosts(snapshot.docs)
    );

    return () => unsubscribe();
  }, [db]);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
