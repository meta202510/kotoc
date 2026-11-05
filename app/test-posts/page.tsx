
"use client";

import { useState } from "react";
import { createMockPosts, type XPost } from "../mockPosts";
import { randomExtractPosts } from "../randomExtractPosts";

export default function TestPostsPage() {
  // 入力された対象期間
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");

  // 抽出結果とエラーメッセージ
  const [results, setResults] = useState<XPost[] | null>(null);
  const [error, setError] = useState("");
  const [executedRange, setExecutedRange] = useState("");

  function runTest() {
    setError("");
    setResults(null);

    if (!startDate || !endDate) {
      setError("開始日と終了日を入力してください。");
      return;
    }

    if (startDate > endDate) {
      setError("開始日は終了日以前にしてください。");
      return;
    }

    try {
      const posts = createMockPosts();

      const extracted = randomExtractPosts(
        posts,
        startDate,
        endDate
      );

      setResults(extracted);
      setExecutedRange(`${startDate} ～ ${endDate}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "抽出中にエラーが発生しました。"
      );
    }
  }

  const selectedMonths = results
    ? [...new Set(
        results.map((post) => post.createdAt.slice(0, 7))
      )].sort()
    : [];

  return (
    <main className="min-h-screen bg-white p-8 text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">
        KOTOC ランダム抽出テスト
      </h1>

      <p className="mb-4">
        架空のX投稿3,650件を使った無料テストです。
      </p>

      <div className="mb-5 flex flex-wrap gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="mb-2 block font-bold"
          >
            開始日
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded border p-3"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="mb-2 block font-bold"
          >
            終了日
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded border p-3"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={runTest}
        className="rounded bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
      >
        ランダム抽出を実行
      </button>

      {error && (
        <p role="alert" className="mt-5 text-red-600">
          {error}
        </p>
      )}

      {results !== null && (
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-bold">
            抽出結果
          </h2>

          <p>対象期間：{executedRange}</p>
          <p>抽出件数：{results.length}件</p>
          <p>
            抽出された月：
            {selectedMonths.length > 0
              ? selectedMonths.join("、")
              : "なし"}
          </p>

          <div className="mt-6 space-y-3">
            {results.slice(0, 20).map((post) => (
              <div
                key={post.id}
                className="rounded border p-3"
              >
                <p className="text-sm text-gray-500">
                  {post.createdAt}
                </p>
                <p>{post.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-500">
            ※ 投稿本文の表示は先頭20件のみです。
          </p>
        </section>
      )}
    </main>
  );
}
