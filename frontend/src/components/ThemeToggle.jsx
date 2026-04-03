import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      aria-label="Toggle theme"
    >
      <span className="relative flex items-center gap-1">
        {isDark ? (
          <>
            <MoonStar className="h-4 w-4" />
            
          </>
        ) : (
          <>
            <SunMedium className="h-4 w-4" />

          </>
        )}
      </span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
