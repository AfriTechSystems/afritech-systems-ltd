import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X, Send, Loader2 } from "lucide-react";
import alfredBot from "@/assets/alfred-bot.png";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

const STARTER_QUESTIONS = [
  "What services do you offer?",
  "How much does a custom ERP cost?",
  "Can you automate my operations?",
];

const FOLLOWUP_CHIPS = [
  "Book a free call",
  "Pricing details",
  "Show case studies",
  "Talk to a human",
];

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: chatTransport,
    id: "afritech-assistant",
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const send = (text: string) => {
    if (!text.trim() || isLoading) return;
    sendMessage({ text: text.trim() });
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(inputValue);
  };

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const showFollowups = !isLoading && lastAssistant && messages.length > 0;

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 group sm:bottom-6 sm:right-6"
          aria-label="Chat with Alfred"
        >
          <span className="absolute -top-1 right-0 hidden rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-brand-foreground shadow-md sm:block">
            Ask Alfred
          </span>
          <img
            src={alfredBot}
            alt="Alfred AI Assistant"
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110 animate-float"
          />
          <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-success ring-2 ring-background" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-3 right-3 z-50 flex w-[88vw] max-w-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:bottom-6 sm:right-6 sm:w-[380px] sm:max-w-[380px]">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-gradient-to-r from-brand to-brand-glow px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={alfredBot} alt="Alfred" className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 object-contain drop-shadow-md" />
              <div>
                <p className="text-sm font-bold text-brand-foreground">Alfred</p>
                <p className="text-[10px] sm:text-[11px] text-brand-foreground/85">
                  {isLoading ? "Typing…" : "AfriTech Sales · Online"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-brand-foreground/80 transition-colors hover:bg-brand-foreground/10 hover:text-brand-foreground"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ScrollArea className="h-[62vh] max-h-[440px] sm:h-[420px]" ref={scrollRef}>
            <div className="flex flex-col gap-3 p-3 sm:p-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="rounded-2xl rounded-bl-md bg-muted px-3 py-2.5 text-[13px] leading-relaxed text-foreground">
                    <p className="font-semibold">👋 Hi, I'm Alfred.</p>
                    <p className="mt-1 text-muted-foreground">
                      I help businesses replace expensive SaaS with custom systems they own. Pick a question or ask anything:
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="rounded-xl border border-border bg-background px-3 py-2 text-left text-[12px] font-medium text-foreground transition-all hover:border-brand hover:bg-brand/5 hover:text-brand"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user";
                const text = message.parts?.map((part) => (part.type === "text" ? part.text : "")).join("");

                return (
                  <div key={message.id} className={cn("flex gap-2", isUser ? "flex-row-reverse" : "flex-row")}>
                    {!isUser && <img src={alfredBot} alt="" className="h-7 w-7 shrink-0 object-contain" />}
                    <div
                      className={cn(
                        "max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed",
                        isUser
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md bg-muted text-foreground",
                      )}
                    >
                      {text ? (
                        isUser ? (
                          <span className="whitespace-pre-wrap">{text}</span>
                        ) : (
                          <div className="prose prose-sm max-w-none [&_p]:my-1.5 [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:my-0.5 [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-sm [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold [&_strong]:font-semibold [&_a]:text-brand [&_a]:underline">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                          </div>
                        )
                      ) : (
                        <span className="italic opacity-60">Thinking…</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-2">
                  <img src={alfredBot} alt="" className="h-7 w-7 shrink-0 object-contain" />
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-3 py-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Alfred is typing…</span>
                  </div>
                </div>
              )}

              {showFollowups && (
                <div className="mt-1 flex flex-wrap gap-1.5 pl-9">
                  {FOLLOWUP_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => send(chip)}
                      className="rounded-full border border-brand/40 bg-brand/5 px-2.5 py-1 text-[10px] font-medium text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-card p-2 sm:p-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Alfred anything…"
              className="h-9 flex-1 bg-background text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
