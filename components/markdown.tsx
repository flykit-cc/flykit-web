import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type MarkdownProps = {
  children: string;
  className?: string;
};

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        // Base prose + site aesthetic: mono headings/code, sans body, grayscale.
        "prose prose-neutral max-w-none font-sans text-foreground",
        "prose-headings:font-mono prose-headings:font-medium prose-headings:tracking-tight",
        "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base",
        "prose-p:text-muted-foreground",
        "prose-a:text-foreground prose-a:underline prose-a:underline-offset-4",
        "prose-strong:text-foreground",
        "prose-code:font-mono prose-code:text-sm prose-code:text-foreground",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-code:rounded-sm prose-code:border prose-code:border-border prose-code:bg-muted prose-code:px-1 prose-code:py-0.5",
        "prose-pre:font-mono prose-pre:rounded-md prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-pre:text-foreground",
        "prose-pre:shadow-none",
        "prose-li:text-muted-foreground prose-li:marker:text-muted-foreground/60",
        "prose-hr:border-border",
        "prose-blockquote:border-l-border prose-blockquote:text-muted-foreground prose-blockquote:not-italic",
        "prose-table:font-sans prose-th:text-foreground prose-th:font-mono prose-td:text-muted-foreground",
        "prose-img:rounded-md prose-img:border prose-img:border-border",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
