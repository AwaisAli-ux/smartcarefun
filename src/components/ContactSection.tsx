import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, Facebook, Instagram, ShieldCheck, Sparkles, Activity, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.541 4.191 1.57 6.017L0 24l6.135-1.61a11.757 11.757 0 005.912 1.595h.005c6.637 0 12.032-5.396 12.035-12.03a11.77 11.77 0 00-3.489-8.498z" />
  </svg>
);

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@smartcaretv.com", href: "mailto:support@smartcaretv.com" },
  { icon: WhatsAppIcon, label: "WhatsApp", value: "+1 (406) 479-2077", href: "https://wa.me/14064792077" },
  { icon: MessageCircle, label: "SMS Only", value: "+1 (406) 479-2077", href: "sms:+14064792077" },
  { icon: Clock, label: "Response Time", value: "Within 10 mins", href: "#" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", color: "hover:text-blue-500", href: "#" },
  { icon: Instagram, label: "Instagram", color: "hover:text-pink-500", href: "https://www.instagram.com/smart_caretv?igsh=MXh5aHliYzdpeGFvYw==" },
  { icon: WhatsAppIcon, label: "WhatsApp", color: "hover:text-green-500", href: "https://wa.me/14064792077" },
];

const ContactSection = () => {
  const handleOpenLiveWebChat = () => {
    window.dispatchEvent(new CustomEvent("open-live-chat"));
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground uppercase tracking-tight">
            Get in <span className="text-gradient-gold">Touch</span>
          </h2>
          <p className="text-muted-foreground font-medium">
            Have questions or need help? Our team is ready to assist you.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              {contactInfo.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-card/40 backdrop-blur-md p-5 transition-all hover:border-primary/40 group"
                >
                  <div className="rounded-xl gradient-primary p-3 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <c.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{c.label}</p>
                    <p className="font-bold text-foreground">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media Section */}
            <div className="rounded-3xl border border-white/5 bg-card/20 p-8 backdrop-blur-sm">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground mb-6">Stay Connected</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center h-14 w-14 rounded-2xl bg-secondary border border-white/5 ${social.color} transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-current group`}
                    title={social.label}
                  >
                    <social.icon className="h-6 w-6 transition-transform group-hover:rotate-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Activation & Support Hub */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/20 bg-card/40 backdrop-blur-xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" /> Live Support Hub
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
                  Skip the emails and wait times. Connect with our official support team immediately for instant subscriptions, plan activation, or setup assistance.
                </p>

                {/* Support Status Pulsing Banner */}
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Operators Online Now
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Response: &lt; 10 mins
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-7 w-7 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/15">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Secure Billing Support</h4>
                      <p className="text-[11px] text-muted-foreground font-medium">Safe order entry and encrypted conversations.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-7 w-7 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/15">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">5-Min Instant Activation</h4>
                      <p className="text-[11px] text-muted-foreground font-medium">Subscriptions are dispatched immediately post-payment.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <a
                  href="https://wa.me/14064792077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:opacity-90 transition-all flex items-center justify-center gap-2 rounded-2xl cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  Chat on WhatsApp Priority
                </a>

                <Button
                  onClick={handleOpenLiveWebChat}
                  className="w-full h-14 gradient-primary border-0 text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(243,38,42,0.3)] hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 rounded-2xl"
                >
                  <MessageSquare className="h-4 w-4" />
                  Start Live Web Chat
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
