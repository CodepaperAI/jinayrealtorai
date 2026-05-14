/**
 * Tiny safe-Markdown renderer for the LLM-generated `description_md`.
 *
 * Why not `marked` or `react-markdown`: the LLM output is constrained
 * (paragraphs, **bold**, h2/h3, ul) and routing through a full Markdown
 * parser pulls in 20-50 KB. This handles exactly what the prompt asks
 * for and escapes everything else so injected HTML is inert.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inline(s: string): string {
  let out = escapeHtml(s);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return out;
}

export function renderSimpleMarkdown(md: string): string {
  if (!md) return "";
  const lines = md.split(/\r?\n/);
  const blocks: string[] = [];
  let para: string[] = [];
  let list: string[] | null = null;

  const flushPara = () => {
    if (para.length) {
      blocks.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list && list.length) {
      blocks.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join("")}</ul>`);
    }
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      flushList();
      blocks.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      list = list ?? [];
      list.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks.join("\n");
}
