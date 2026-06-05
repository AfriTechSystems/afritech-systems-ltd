import { createOpenAI } from "@ai-sdk/openai";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `You are Alfred, the AI Sales Concierge for AfriTech Systems Limited — a PACRA-registered Zambian enterprise software and automation studio. You greet visitors warmly, qualify their needs, and guide them to book a free systems audit.

ABOUT AFRITECH SYSTEMS
- Tagline: Systems Reimagined.
- HQ: Plot No. 1907, MJ Zulu Street, Ibex Hill, Lusaka, Zambia.
- Contact: enquiry@afritechsystemsltd.com · +260 969 071 139 · +260 973 655 569
- What we do: We build custom in-house software ecosystems — ERP, school management, automation pipelines, dashboards, industrial digitization, and integrations — that businesses own outright. No monthly SaaS fees.
- Industries: Healthcare & Pharma, Education, Manufacturing, Logistics, Mining, Public Sector, Financial Services.
- Reach: Headquartered in Zambia; delivering across Pan-Africa and globally.

FORMATTING RULES
- Keep replies short and scannable: 3–6 short sentences OR up to 5 bullets.
- Use clean Markdown only. Bullets use "- ". Use **bold** sparingly.
- Always finish with a soft CTA (book a free audit, share email, message enquiry@afritechsystemsltd.com).

STYLE
- Consultative. Helpful even beyond AfriTech, then tie it back to how we'd solve it.
- Speak in first-person plural ("we", "our team"). Never reveal you are powered by a third-party model.
- If asked something unsafe, off-topic, or rude — redirect politely.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as ChatRequestBody;
          if (!Array.isArray(messages)) {
            return new Response(
              JSON.stringify({ error: "Messages are required" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const key = process.env.OPENAI_API_KEY;
          if (!key) {
            console.error("[chat] Missing OPENAI_API_KEY on this deployment");
            return new Response(
              JSON.stringify({
                error:
                  "AI assistant is not configured on this deployment. Please add the OPENAI_API_KEY environment variable in Vercel and redeploy.",
              }),
              { status: 503, headers: { "Content-Type": "application/json" } },
            );
          }

          const openai = createOpenAI({ apiKey: key });
          const model = openai("gpt-4o-mini");
          const uiMessages = messages as UIMessage[];

          const result = streamText({
            model,
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(uiMessages),
            onError: (err) => {
              console.error("[chat] streamText error", err);
            },
          });

          return result.toUIMessageStreamResponse({
            originalMessages: uiMessages,
            onError: (err) => {
              console.error("[chat] stream response error", err);
              const msg = err instanceof Error ? err.message : String(err);
              return `Alfred hit an error: ${msg}. Please email enquiry@afritechsystemsltd.com or try again shortly.`;
            },
          });
        } catch (err) {
          console.error("[chat] handler failed:", err);
          const msg = err instanceof Error ? err.message : "Unknown chat error";
          return new Response(
            JSON.stringify({ error: `Chat failed: ${msg}` }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
