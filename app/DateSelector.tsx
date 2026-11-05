
"use client";

type DateSelectorProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function DateSelector({
  id,
  label,
  value,
  onChange,
}: DateSelectorProps) {
  const [year, month, day] = value
    ? value.split("-").map(Number)
    : [0, 0, 0];

  // Xが始まった2006年から現在の年まで
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2006 + 1 },
    (_, i) => currentYear - i
  );

  const daysInMonth =
    year && month
      ? new Date(Date.UTC(year, month, 0)).getUTCDate()
      : 31;

  function updateDate(
    newYear: number,
    newMonth: number,
    newDay: number
  ) {
    if (!newYear || !newMonth || !newDay) {
      onChange("");
      return;
    }

    const maxDay = new Date(
      Date.UTC(newYear, newMonth, 0)
    ).getUTCDate();

    const safeDay = Math.min(newDay, maxDay);

    onChange(
      `${newYear}-${String(newMonth).padStart(2, "0")}-${String(safeDay).padStart(2, "0")}`
    );
  }

  return (
    <div>
      <p className="mb-2 text-sm text-gray-700">{label}</p>

      <div className="grid grid-cols-3 gap-2">
        <select
          aria-label={`${label}の年`}
          id={`${id}-year`}
          value={year || ""}
          onChange={(e) =>
            updateDate(Number(e.target.value), month || 1, day || 1)
          }
          className="min-w-0 rounded-lg border border-gray-300 bg-white px-2 py-3 text-base text-gray-900"
        >
          <option value="">年</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}年
            </option>
          ))}
        </select>

        <select
          aria-label={`${label}の月`}
          id={`${id}-month`}
          value={month || ""}
          onChange={(e) =>
            updateDate(year || currentYear, Number(e.target.value), day || 1)
          }
          className="min-w-0 rounded-lg border border-gray-300 bg-white px-2 py-3 text-base text-gray-900"
        >
          <option value="">月</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {m}月
            </option>
          ))}
        </select>

        <select
          aria-label={`${label}の日`}
          id={`${id}-day`}
          value={day || ""}
          onChange={(e) =>
            updateDate(year || currentYear, month || 1, Number(e.target.value))
          }
          className="min-w-0 rounded-lg border border-gray-300 bg-white px-2 py-3 text-base text-gray-900"
        >
          <option value="">日</option>
          {Array.from(
            { length: daysInMonth },
            (_, i) => i + 1
          ).map((d) => (
            <option key={d} value={d}>
              {d}日
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
