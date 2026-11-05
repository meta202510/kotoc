import type { XPost } from "./mockPosts";

export function randomExtractPosts(
  posts: XPost[],
  startDate: string,
  endDate: string
): XPost[] {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(startDate) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(endDate) ||
    !Number.isFinite(Date.parse(startDate)) ||
    !Number.isFinite(Date.parse(endDate)) ||
    startDate > endDate
  ) {
    throw new Error("開始日と終了日を確認してください。");
  }

  // 対象期間に含まれる月を一覧化
  const months: string[] = [];
  const [sy, sm] = startDate.split("-").map(Number);
  const [ey, em] = endDate.split("-").map(Number);

  let year = sy;
  let month = sm;

  while (year < ey || (year === ey && month <= em)) {
    months.push(`${year}-${String(month).padStart(2, "0")}`);

    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  // 月をランダムに並べ、最大10か月を選ぶ
  const shuffledMonths = [...months];

  for (let i = shuffledMonths.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledMonths[i], shuffledMonths[j]] =
      [shuffledMonths[j], shuffledMonths[i]];
  }

  const selectedMonths = shuffledMonths.slice(0, 10);
  const results: XPost[] = [];

  for (const selectedMonth of selectedMonths) {
    const [y, m] = selectedMonth.split("-").map(Number);
    const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();

    // 月内の3区間から1つ選択
    const intervals = [
      [1, 10],
      [11, 20],
      [21, lastDay],
    ];

    const [fromDay, toDay] =
      intervals[Math.floor(Math.random() * intervals.length)];

    const fromDate =
      `${selectedMonth}-${String(fromDay).padStart(2, "0")}`;
    const toDate =
      `${selectedMonth}-${String(toDay).padStart(2, "0")}`;

    // 日本時間で投稿日を判定
    const candidates = posts.filter((post) => {
      const date = new Date(post.createdAt)
        .toLocaleDateString("sv-SE", {
          timeZone: "Asia/Tokyo",
        });

      return (
        date >= startDate &&
        date <= endDate &&
        date >= fromDate &&
        date <= toDate
      );
    });

    // 投稿をランダムに並べ、最大100件選択
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] =
        [candidates[j], candidates[i]];
    }

    results.push(...candidates.slice(0, 100));
  }

  // 重複を除去し、最大1,000件
  return [...new Map(results.map((post) => [post.id, post])).values()]
    .slice(0, 1000);
}