import { useEffect } from "react";

export function useSetDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return;
}
