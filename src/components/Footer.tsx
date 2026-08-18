import { useNavigate } from "react-router-dom";
import { MessageSquare, Instagram } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.541 4.191 1.57 6.017L0 24l6.135-1.61a11.757 11.757 0 005.912 1.595h.005c6.637 0 12.032-5.396 12.035-12.03a11.77 11.77 0 00-3.489-8.498z" />
  </svg>
);

const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Membership Plans", href: "/#plans" },
  { label: "Free Trial", href: "/free-trial" },
  { label: "Contact Us", href: "/#contact" },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      const parts = href.split("#");
      const path = parts[0];
      const hash = "#" + parts[1];

      if (path === "" || path === window.location.pathname) {
        // Anchor on current page
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Anchor on different page
        navigate(path || "/");
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo(0, 0);
          }
        }, 500);
      }
    } else if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const goHome = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <button onClick={goHome} className="flex items-center gap-2.5 group transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            <img src="/logo.png" alt="Smart Care TV Logo" className="h-11 w-11 object-contain rounded-xl" />
            <span className="text-lg font-bold text-foreground">Smart Care <span className="text-gradient-gold">TV</span></span>
          </button>

          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-accent font-medium cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Smart Care TV. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5">
              <WhatsAppIcon className="h-4 w-4 text-green-500 shrink-0" />
              <span className="text-muted-foreground">WhatsApp:</span>
              <a href="https://wa.me/14064792077" className="font-bold text-green-500 hover:text-green-400 transition-colors">
                +1 (406) 479-2077
              </a>
            </div>
            <span className="hidden md:inline text-muted-foreground/40">|</span>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-muted-foreground">SMS Only:</span>
              <a href="sms:+14064792077" className="font-bold text-primary hover:text-primary/80 transition-colors">
                +1 (406) 479-2077
              </a>
            </div>
            <span className="hidden md:inline text-muted-foreground/40">|</span>
            <div className="flex items-center gap-1.5">
              <Instagram className="h-3.5 w-3.5 text-pink-500 shrink-0" />
              <span className="text-muted-foreground">Instagram:</span>
              <a href="https://www.instagram.com/smart_caretv?igsh=MXh5aHliYzdpeGFvYw==" target="_blank" rel="noopener noreferrer" className="font-bold text-pink-500 hover:text-pink-400 transition-colors">
                @smart_caretv
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
