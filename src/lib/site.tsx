export const SITE = {
  name: "AfriTech Systems Limited",
  shortName: "AfriTech Systems",
  tagline: "Systems Reimagined",
  domain: "afritechsystemsltd.com",
  email: "enquiry@afritechsystemsltd.com",
  phones: ["+260 969 071 139", "+260 973 655 569"],
  location: "Plot No. 1907, MJ Zulu Street, Ibex Hill, Lusaka, Zambia",
  shortLocation: "Ibex Hill, Lusaka, Zambia",
  pacra: "Registered under the Patents and Companies Registration Agency (PACRA) in Lusaka, Zambia.",
  reach: "Headquartered in Zambia. Serving enterprises across Pan-Africa and globally.",
} as const;

export const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/afritechsystemsltd/", live: true, icon: "linkedin" },
  { name: "Facebook", href: "#", live: false, icon: "facebook" },
  { name: "Instagram", href: "#", live: false, icon: "instagram" },
  { name: "X", href: "#", live: false, icon: "x" },
] as const;

// Canonical site URL — used for canonical tags, og:url, sitemap, JSON-LD.
export const SITE_URL = "https://afritechsystemsltd.com";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/integrations", label: "Integrations" },
  { to: "/articles", label: "Articles" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

import { Boxes, GraduationCap, Factory, Truck, BarChart3, Plug, Building2, Mail } from "lucide-react";

export const NAV_GROUPS = [
  {
    label: "Solutions",
    to: "/solutions",
    items: [
      { to: "/solutions", label: "Custom ERP", desc: "Replace spreadsheets with one connected system.", icon: Boxes },
      { to: "/solutions", label: "School Management", desc: "Grades, attendance, fees and parent portal.", icon: GraduationCap },
      { to: "/solutions", label: "Automation & Dashboards", desc: "Live KPIs and automated workflows.", icon: BarChart3 },
    ],
  },
  {
    label: "Industries",
    to: "/industries",
    items: [
      { to: "/industries", label: "Healthcare & Pharma", desc: "Stock, dispensing, compliance.", icon: Boxes },
      { to: "/industries", label: "Education", desc: "Schools, colleges, universities.", icon: GraduationCap },
      { to: "/industries", label: "Manufacturing", desc: "Production, quality, inventory.", icon: Factory },
      { to: "/industries", label: "Logistics", desc: "Fleet, routing, dispatch.", icon: Truck },
    ],
  },
  {
    label: "Company",
    to: "/about",
    items: [
      { to: "/about", label: "About", desc: "Who we are and where we work.", icon: Building2 },
      { to: "/integrations", label: "Integrations", desc: "Tools we plug into.", icon: Plug },
      { to: "/contact", label: "Contact", desc: "Talk to a systems engineer.", icon: Mail },
    ],
  },
] as const;

// Ordered: Home · Solutions · Industries · Integrations · Articles · About · Contact
export const SIMPLE_NAV = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/integrations", label: "Integrations" },
  { to: "/articles", label: "Articles" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
