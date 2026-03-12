import { useEffect } from "react";

export default function useTheme() {
  useEffect(() => {
    document.body.className = "bg-slate-50 antialiased text-slate-900";
  }, []);
}
