import type { ReactNode } from "react";

export function ServiceNowLogo({ size: _size }: { size?: string }) {
  return <span>ServiceNow</span>;
}

export function withLogo(text: string, _size?: string): ReactNode {
  return text;
}
