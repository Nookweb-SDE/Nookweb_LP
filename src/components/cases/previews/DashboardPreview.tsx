import type { CasePreviewData } from "@/data/casePreviews";

interface Props { data: CasePreviewData }

export function DashboardPreview({ data }: Props) {
  return (
    <div style={{ background: data.palette.bg, minHeight: "400px", padding: "24px", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ color: data.palette.text, fontSize: "14px" }}>{data.clientName}</div>
      <div style={{ color: data.palette.textMuted, fontSize: "12px", marginTop: "8px" }}>{data.clientTagline}</div>
    </div>
  );
}
