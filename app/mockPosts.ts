// KOTOC開発用：架空のX投稿データ
// 実際のX APIには接続しません。

export type XPost = {
    id: string;
    createdAt: string;
    text: string;
  };
  
  export function createMockPosts(): XPost[] {
    const posts: XPost[] = [];
  
    // 2025年の12か月分、毎日10件の架空投稿を作る
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(2025, month, 0).getDate();
  
      for (let day = 1; day <= daysInMonth; day++) {
        for (let number = 1; number <= 10; number++) {
          const mm = String(month).padStart(2, "0");
          const dd = String(day).padStart(2, "0");
          const hh = String(number + 8).padStart(2, "0");
  
          posts.push({
            id: `${month}-${day}-${number}`,
            createdAt: `2025-${mm}-${dd}T${hh}:00:00+09:00`,
            text: `これは2025年${month}月${day}日の架空の投稿${number}です。`,
          });
        }
      }
    }
  
    return posts;
  }