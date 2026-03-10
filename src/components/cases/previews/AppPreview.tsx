import type { CasePreviewData } from "@/data/casePreviews";

interface Props { data: CasePreviewData }

export function AppPreview({ data }: Props) {
  return (
    <div style={{ background: "#111", padding: "24px", display: "flex", justifyContent: "center", minHeight: "400px" }}>
      <div style={{ background: data.palette.bg, width: "200px", borderRadius: "24px", padding: "16px", fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ color: data.palette.text, fontSize: "13px" }}>{data.clientName}</div>
        <div style={{ color: data.palette.textMuted, fontSize: "11px", marginTop: "4px" }}>{data.clientTagline}</div>
      </div>
    </div>
  );
}
