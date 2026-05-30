import { useState, useEffect } from "react";
import { PopupModal } from "react-calendly";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export const CALENDLY_URL = "https://calendly.com/afritech-systemsltd/30min";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BookCallButtonProps {
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand text-brand-foreground shadow-glow hover:scale-[1.02]",
  outline:
    "border border-border bg-background text-foreground hover:border-brand hover:text-brand",
  ghost:
    "bg-brand/10 text-brand hover:bg-brand/20",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm sm:text-base",
};

export function BookCallButton({
  label = "Book a discovery call",
  variant = "primary",
  size = "md",
  className,
  icon = true,
}: BookCallButtonProps) {
  const [open, setOpen] = useState(false);
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setRootEl(document.body);
    }
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
      >
        {icon && <Calendar className="h-4 w-4" aria-hidden />}
        {label}
      </button>
      {rootEl && (
        <PopupModal
          url={CALENDLY_URL}
          onModalClose={() => setOpen(false)}
          open={open}
          rootElement={rootEl}
          pageSettings={{
            backgroundColor: "ffffff",
            primaryColor: "16a3a3",
            textColor: "0f1b2d",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
          }}
        />
      )}
    </>
  );
}
