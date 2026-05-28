import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Bot,
  X,
  Send,
  MessageSquare,
  Loader2,
  User,
  Sparkles,
} from "lucide-react";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue.trim() });
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  return (
    <>
      {/* Floating toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95",
            "bg-brand text-brand-foreground"
          )}
          aria-label="Open AI assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex w-[92vw] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-brand px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-foreground/20">
                <Sparkles className="h-4 w-4 text-brand-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-foreground">
                  AfriTech AI
                </p>
                <p className="text-[11px] text-brand-foreground/80">
                  {isLoading ? "Typing..." : "Online"}
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
          <ScrollArea className="h-[320px] sm:h-[400px]" ref={scrollRef}>
            <div className="flex flex-col gap-3 p-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center gap-3 py-8 text-center text-muted-foreground">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <Bot className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Hello! I'm the AfriTech Systems AI Assistant.
                    </p>
                    <p className="mt-1 text-xs">
                      Ask me about our custom ERP, school management,
                      automation solutions, or how we can help your business.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user";
                const text = message.parts
                  ?.map((part) =>
                    part.type === "text" ? part.text : ""
                  )
                  .join("");

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      isUser ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      )}
                    >
                      {isUser ? (
                        <User className="h-3.5 w-3.5" />
                      ) : (
                        <Bot className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        isUser
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md bg-muted text-foreground"
                      )}
                    >
                      {text || (
                        <span className="italic opacity-60">
                          Thinking...
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && messages.length > 0 &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        AfriTech AI is typing…
                      </span>
                    </div>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our solutions…"
              className="h-10 flex-1 bg-background text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="h-10 w-10 shrink-0 bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
