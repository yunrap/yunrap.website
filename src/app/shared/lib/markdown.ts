import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export async function markdownToHtml(markdown: string) {
  const escapedContent = markdown.replace(/```[\s\S]*?```/g, (match) => {
    return match.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  });

  const result = await remark()
    .use(remarkGfm)
    .use(html, {
      sanitize: false,
      allowDangerousHtml: true,
    })
    .process(escapedContent);

  return result.toString();
}
