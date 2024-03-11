import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import {
  useGetRecentPosts,
  useGetUsers,
} from "@/lib/react-query/queriesAndMutations";
import { useInView } from "react-intersection-observer";
import { Models } from "appwrite";
import { useEffect } from "react";

const Home = () => {
  const { inView } = useInView();

  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();

  const { data: users, fetchNextPage } = useGetUsers();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!users)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="flex flex-center h3-bold md:h2-bold text-left w-full pt-4">
            Home Feed
          </h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
