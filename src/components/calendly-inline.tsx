import { InlineWidget } from "react-calendly";
import { CALENDLY_URL } from "./book-call-button";

export function CalendlyInline() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
      <InlineWidget
        url={CALENDLY_URL}
        styles={{ height: "780px", minWidth: "280px" }}
        pageSettings={{
          backgroundColor: "ffffff",
          primaryColor: "16a3a3",
          textColor: "0f1b2d",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
        }}
      />
    </div>
  );
}
