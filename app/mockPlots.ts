
// KOTOC開発用：架空の小説構想データ
// OpenAI APIには接続しません。

export type NovelPlot = {
  id: string;
  title: string;
  synopsis: string;
};

export function createMockPlots(): NovelPlot[] {
  return [
    {
      id: "plot-1",
      title: "星降る街の約束",
      synopsis:
        "不思議な星が降る街で、過去の記憶を失った主人公が、忘れられた約束を探すファンタジー物語。",
    },
    {
      id: "plot-2",
      title: "雨音の向こう側",
      synopsis:
        "古い喫茶店で偶然出会った二人が、互いの秘密を知りながら少しずつ心を通わせていく物語。",
    },
    {
      id: "plot-3",
      title: "最後の手紙",
      synopsis:
        "差出人不明の手紙をきっかけに、主人公が十年前の事件の真相に迫るミステリー。",
    },
  ];
}
