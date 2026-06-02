import n8nLogo from "@/assets/integrations/n8n.jpg.asset.json";
import excelLogo from "@/assets/integrations/Excel.jpg.asset.json";
import gwsLogo from "@/assets/integrations/Google_Workspace.jpg.asset.json";
import hubspotLogo from "@/assets/integrations/Hubspot.jpg.asset.json";
import salesforceLogo from "@/assets/integrations/Salesforce.jpg.asset.json";
import slackLogo from "@/assets/integrations/Slack.jpg.asset.json";
import stripeLogo from "@/assets/integrations/Stripe.jpg.asset.json";
import notionLogo from "@/assets/integrations/Notion_Logo.jpg.asset.json";

export type IntegrationTool = {
  name: string;
  logo?: string;
  /** Short monogram fallback shown when no logo is available */
  initials?: string;
  /** Tailwind class for the monogram chip bg/fg */
  swatch?: string;
};

const t = (name: string, logo?: string, swatch?: string): IntegrationTool => ({
  name,
  logo,
  initials: name
    .split(/[\s.]+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
  swatch,
});

export const INTEGRATION_TOOLS: Record<string, IntegrationTool> = {
  n8n: t("n8n", n8nLogo.url),
  Excel: t("Microsoft Excel", excelLogo.url),
  "Google Workspace": t("Google Workspace", gwsLogo.url),
  HubSpot: t("HubSpot", hubspotLogo.url),
  Salesforce: t("Salesforce", salesforceLogo.url),
  Slack: t("Slack", slackLogo.url),
  Stripe: t("Stripe", stripeLogo.url),
  Notion: t("Notion", notionLogo.url),
  // Fallbacks (clean colored monogram)
  Zapier: t("Zapier", undefined, "bg-orange-500 text-white"),
  Make: t("Make", undefined, "bg-fuchsia-600 text-white"),
  Workato: t("Workato", undefined, "bg-red-600 text-white"),
  "Power Automate": t("Power Automate", undefined, "bg-blue-700 text-white"),
  Supabase: t("Supabase", undefined, "bg-emerald-600 text-white"),
  PostgreSQL: t("PostgreSQL", undefined, "bg-sky-700 text-white"),
  MongoDB: t("MongoDB", undefined, "bg-green-700 text-white"),
  Redis: t("Redis", undefined, "bg-red-700 text-white"),
  AWS: t("AWS", undefined, "bg-orange-600 text-white"),
  Azure: t("Azure", undefined, "bg-blue-600 text-white"),
  Cloudflare: t("Cloudflare", undefined, "bg-orange-500 text-white"),
  "Microsoft Teams": t("Microsoft Teams", undefined, "bg-indigo-600 text-white"),
  "Microsoft 365": t("Microsoft 365", undefined, "bg-blue-600 text-white"),
  "WhatsApp Business": t("WhatsApp Business", undefined, "bg-green-600 text-white"),
  Twilio: t("Twilio", undefined, "bg-red-600 text-white"),
  SendGrid: t("SendGrid", undefined, "bg-sky-600 text-white"),
  Mailgun: t("Mailgun", undefined, "bg-red-500 text-white"),
  Jira: t("Jira", undefined, "bg-blue-600 text-white"),
  Confluence: t("Confluence", undefined, "bg-blue-500 text-white"),
  Asana: t("Asana", undefined, "bg-rose-500 text-white"),
  Paystack: t("Paystack", undefined, "bg-sky-600 text-white"),
  Flutterwave: t("Flutterwave", undefined, "bg-orange-500 text-white"),
  "MTN MoMo": t("MTN MoMo", undefined, "bg-yellow-500 text-slate-900"),
  "Airtel Money": t("Airtel Money", undefined, "bg-red-600 text-white"),
  "Zamtel Kwacha": t("Zamtel Kwacha", undefined, "bg-green-600 text-white"),
  "Power BI": t("Power BI", undefined, "bg-yellow-500 text-slate-900"),
  Tableau: t("Tableau", undefined, "bg-blue-700 text-white"),
  Looker: t("Looker", undefined, "bg-indigo-600 text-white"),
  Metabase: t("Metabase", undefined, "bg-sky-700 text-white"),
  PostHog: t("PostHog", undefined, "bg-orange-500 text-white"),
  "Zoho CRM": t("Zoho CRM", undefined, "bg-red-600 text-white"),
  Pipedrive: t("Pipedrive", undefined, "bg-slate-900 text-white"),
  "Microsoft Entra ID": t("Microsoft Entra ID", undefined, "bg-blue-600 text-white"),
  Auth0: t("Auth0", undefined, "bg-orange-600 text-white"),
  Okta: t("Okta", undefined, "bg-blue-700 text-white"),
  OneLogin: t("OneLogin", undefined, "bg-cyan-600 text-white"),
};

export function getTool(name: string): IntegrationTool {
  return (
    INTEGRATION_TOOLS[name] ??
    t(name, undefined, "bg-slate-700 text-white")
  );
}
