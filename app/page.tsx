
"use client";

import DateSelector from "./DateSelector";

import { useState } from "react";
import { createMockPosts, type XPost } from "./mockPosts";
import { randomExtractPosts } from "./randomExtractPosts";

export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [genre, setGenre] = useState("");
  const [results, setResults] = useState<XPost[] | null>(null);
  const [error, setError] = useState("");
  const [executedRange, setExecutedRange] = useState("");
  const [executedGenre, setExecutedGenre] = useState("");

  const genres: Record<string, string> = {
    romance: "恋愛",
    mystery: "ミステリー",
    fantasy: "ファンタジー",
    "human-drama": "ヒューマンドラマ",
    sf: "SF",
  };

  function handleCreate() {
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

    if (!genre) {
      setError("小説ジャンルを選択してください。");
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
      setExecutedGenre(genres[genre]);
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
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-xl">
        <header className="text-center">
          <p className="text-sm text-gray-500">
            AI小説制作サービス
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-wide text-gray-900 sm:text-5xl">
            KOTOC
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            連携したXの投稿を、指定した期間に応じて自動取得し、
            オリジナル小説を作成します。初期版はXのみ対応です。
          </p>
        </header>

        <form
          className="mt-10 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <section className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
            <p className="text-sm font-medium text-gray-800">
              Xアカウント連携
            </p>
            <p className="mt-2 text-sm font-medium text-gray-900">
              連携済み（デモ表示）
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              これは画面確認用のデモ表示です。
              実際のXアカウントには連携していません。
            </p>
          </section>


          <fieldset>
            <legend className="mb-3 text-sm font-medium text-gray-800">
              投稿の対象期間
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DateSelector
                id="start-date"
                label="開始日"
                value={startDate}
                onChange={setStartDate}
              />

              <DateSelector
                id="end-date"
                label="終了日"
                value={endDate}
                onChange={setEndDate}
              />
            </div>
          </fieldset>


          <div>
            <label
              htmlFor="genre"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              小説ジャンル
            </label>
            <select
              id="genre"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-gray-900 focus:outline-none"
            >
              <option value="" disabled>
                選択してください
              </option>
              <option value="romance">恋愛</option>
              <option value="mystery">ミステリー</option>
              <option value="fantasy">ファンタジー</option>
              <option value="human-drama">ヒューマンドラマ</option>
              <option value="sf">SF</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-4 py-3 text-base font-medium text-white hover:bg-gray-800"
          >
            物語を作成する
          </button>
        </form>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {results !== null && (
          <section className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-lg font-bold text-gray-900">
              投稿抽出結果（開発用デモ）
            </h2>

            <p className="mt-3 text-sm text-gray-700">
              対象期間：{executedRange}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              小説ジャンル：{executedGenre}
            </p>
            <p className="mt-1 font-bold text-gray-900">
              抽出件数：{results.length}件
            </p>
            <p className="mt-1 text-sm text-gray-700">
              抽出された月：
              {selectedMonths.length > 0
                ? selectedMonths.join("、")
                : "なし"}
            </p>

            {results.length === 0 && (
              <p className="mt-4 text-sm text-gray-600">
                指定期間内に架空の投稿データがありません。
              </p>
            )}

            <div className="mt-5 space-y-3">
              {results.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg border border-gray-200 bg-white p-3"
                >
                  <p className="text-xs text-gray-500">
                    {post.createdAt}
                  </p>
                  <p className="mt-1 text-sm text-gray-800">
                    {post.text}
                  </p>
                </div>
              ))}
            </div>

            {results.length > 5 && (
              <p className="mt-4 text-xs text-gray-500">
                ※ 投稿本文は先頭5件のみ表示しています。
              </p>
            )}

            <p className="mt-5 text-xs text-gray-500">
              ※ これは開発用の架空データです。
              実際のX投稿取得やAI小説生成は行っていません。
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
