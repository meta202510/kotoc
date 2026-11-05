import type { XPost } from "./mockPosts";

// 指定した期間内の投稿を取り出す
export function extractPostsByDate(
  posts: XPost[],
  startDate: string,
  endDate: string
): XPost[] {
  if (startDate > endDate) {
    throw new Error("開始日は終了日以前にしてください。");
  }

  return posts.filter((post) => {
    // 投稿日時を日本時間の日付に変換する
    const postDate = new Date(post.createdAt)
      .toLocaleDateString("sv-SE", {
        timeZone: "Asia/Tokyo",
      });

    return postDate >= startDate && postDate <= endDate;
  });
}