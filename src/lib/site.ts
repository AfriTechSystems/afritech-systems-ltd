export const SITE = {
  name: "AfriTech Systems Limited",
  shortName: "AfriTech Systems",
  tagline: "Systems Reimagined",
  domain: "afritechsystemsltd.com",
  email: "enquiry@afritechsystemsltd.com",
  phones: ["+260 969 071 139", "+260 973 655 569"],
  location: "Lusaka, Zambia",
  pacra: "Registered under the Patents and Companies Registration Agency (PACRA) in Lusaka, Zambia.",
  reach: "Headquartered in Zambia. Serving enterprises across Pan-Africa and globally.",
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/integrations", label: "Integrations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
