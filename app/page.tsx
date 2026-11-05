export default function Home() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-xl">
        <header className="text-center">
          <p className="text-sm text-gray-500">AI小説制作サービス</p>
          <h1 className="mt-2 text-4xl font-bold tracking-wide text-gray-900 sm:text-5xl">
            KOTOC
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            連携したXの投稿を、指定した期間に応じて自動取得し、オリジナル小説を作成します。初期版はXのみ対応です。
          </p>
        </header>

        <form className="mt-10 space-y-6">
          <section className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
            <p className="text-sm font-medium text-gray-800">Xアカウント連携</p>
            <p className="mt-2 text-sm font-medium text-gray-900">
              連携済み（デモ表示）
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              これは画面確認用のデモ表示です。実際のXアカウントには連携していません。
            </p>
          </section>

          <fieldset>
            <legend className="mb-3 text-sm font-medium text-gray-800">
              投稿の対象期間
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="start-date" className="mb-2 block text-sm text-gray-700">
                  開始日
                </label>
                <input
                  id="start-date"
                  name="startDate"
                  type="date"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-gray-900 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="mb-2 block text-sm text-gray-700">
                  終了日
                </label>
                <input
                  id="end-date"
                  name="endDate"
                  type="date"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-gray-900 focus:outline-none"
                />
              </div>
            </div>
          </fieldset>

          <div>
            <label htmlFor="genre" className="mb-2 block text-sm font-medium text-gray-800">
              小説ジャンル
            </label>
            <select
              id="genre"
              name="genre"
              defaultValue=""
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
            type="button"
            className="w-full rounded-lg bg-gray-900 px-4 py-3 text-base font-medium text-white"
          >
            物語を作成する
          </button>
        </form>
      </div>
    </main>
  );
}
