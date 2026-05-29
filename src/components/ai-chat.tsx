import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X, Send, Loader2 } from "lucide-react";
import alfredBot from "@/assets/alfred-bot.png";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

const STARTER_QUESTIONS = [
  "What services does AfriTech Systems offer?",
  "How much does a custom ERP cost?",
  "Can you automate my business operations?",
];

const FOLLOWUP_CHIPS = [
  "Book a free audit",
  "Tell me about pricing",
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
      {/* Floating launcher — transparent bot, no background */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Chat with Alfred"
        >
          <span className="absolute -top-2 right-0 hidden rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-brand-foreground shadow-md sm:block">
            Ask Alfred
          </span>
          <img
            src={alfredBot}
            alt="Alfred AI Assistant"
            className="h-20 w-20 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110 animate-float"
          />
          <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-success ring-2 ring-background" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex w-[94vw] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-gradient-to-r from-brand to-brand-glow px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={alfredBot}
                alt="Alfred"
                className="h-12 w-12 shrink-0 object-contain drop-shadow-md"
              />
              <div>
                <p className="text-sm font-bold text-brand-foreground">Alfred</p>
                <p className="text-[11px] text-brand-foreground/85">
                  {isLoading ? "Typing…" : "AfriTech Sales Assistant • Online"}
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

          {/* Messages */}
          <ScrollArea className="h-[380px] sm:h-[440px]" ref={scrollRef}>
            <div className="flex flex-col gap-3 p-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-3 text-sm leading-relaxed text-foreground">
                    <p className="font-semibold">👋 Hi, I'm Alfred from AfriTech Systems.</p>
                    <p className="mt-1 text-muted-foreground">
                      I help businesses replace expensive SaaS with custom-built
                      systems they fully own. Ask me anything, or pick a question below:
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="rounded-xl border border-border bg-background px-3 py-2.5 text-left text-xs font-medium text-foreground transition-all hover:border-brand hover:bg-brand/5 hover:text-brand"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user";
                const text = message.parts
                  ?.map((part) => (part.type === "text" ? part.text : ""))
                  .join("");

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      isUser ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {!isUser && (
                      <img
                        src={alfredBot}
                        alt=""
                        className="h-8 w-8 shrink-0 object-contain"
                      />
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                        isUser
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md bg-muted text-foreground"
                      )}
                    >
                      {text || (
                        <span className="italic opacity-60">Thinking…</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading &&
                messages.length > 0 &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-2">
                    <img src={alfredBot} alt="" className="h-8 w-8 shrink-0 object-contain" />
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Alfred is typing…</span>
                    </div>
                  </div>
                )}

              {/* Follow-up quick reply chips */}
              {showFollowups && (
                <div className="mt-1 flex flex-wrap gap-1.5 pl-10">
                  {FOLLOWUP_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => send(chip)}
                      className="rounded-full border border-brand/40 bg-brand/5 px-3 py-1 text-[11px] font-medium text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border bg-card p-3"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Alfred anything…"
              className="h-10 flex-1 bg-background text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
