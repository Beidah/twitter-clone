type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
}

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
}

function InfiniteTweetList({ tweets }: InfiniteTweetListProps) {
  return (
    <div>InfiniteTweetList</div>
  )
}

export default InfiniteTweetList;