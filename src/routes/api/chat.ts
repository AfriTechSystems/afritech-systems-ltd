import { createLovableAiGatewayProvider, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `You are the AfriTech Systems Limited AI Assistant. You help visitors learn about AfriTech Systems, a PACRA-registered Zambian enterprise software and automation company headquartered at Plot No. 1907, MJ Zulu Street, Ibex Hill, Lusaka, Zambia.

Key facts:
- Company: AfriTech Systems Limited — "Systems Reimagined"
- Contact: enquiry@afritechsystemsltd.com | +260 969 071 139 | +260 973 655 569
- Services: Custom ERP systems, school management software, automation & dashboards, industrial digitization, system integrations
- Industries: Healthcare & Pharma, Education, Manufacturing, Logistics, Public Sector
- Reach: Headquartered in Zambia, serving enterprises across Pan-Africa and globally
- Value proposition: Build custom in-house systems tailored to what clients need — no monthly SaaS fees, full ownership, localized for African business realities

Your tone is professional, helpful, and concise. Answer questions about AfriTech's services, solutions, industries, contact details, and how custom software can help businesses reduce costs and increase efficiency. If asked about pricing, explain that AfriTech builds bespoke systems and pricing depends on scope — encourage the visitor to fill out the audit form or contact the team directly. Do not make up specific prices. If you don't know something, suggest contacting the team directly.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const initialRunId = getLovableAiGatewayRunId(request);
        const gateway = createLovableAiGatewayProvider(key, initialRunId);
        const model = gateway("google/gemini-3-flash-preview");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        const response = result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });

        return withLovableAiGatewayRunIdHeader(response, gateway);
      },
    },
  },
});
