import { X, Send, User, Mail, Phone, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  planPeriod: string;
}

const CheckoutModal = ({ isOpen, onClose, planName, planPrice, planPeriod }: CheckoutModalProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleActivationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const payload = {
      _subject: `⚡ [NEW ORDER] ${planName}`,
      _captcha: "false",
      _replyto: email || "no-reply@smartcaretv.net",
      "SELECTED PLAN": planName,
      "PLAN PRICE": planPrice,
      "BILLING PERIOD": planPeriod.replace("/", "PER "),
      "FIRST NAME": firstName,
      "LAST NAME": lastName,
      "PHONE NUMBER": phone,
      "EMAIL ADDRESS": email || "Not Provided",
      "USER MESSAGE": message || "No custom message provided.",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/support@smartcaretv.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success === "true") {
        toast({
          title: "Activation Request Sent!",
          description: "Your request was received. We will contact you shortly to activate your license.",
        });
        
        // Reset Form
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setMessage("");
        
        onClose();
      } else {
        toast({
          title: "Submission Failed",
          description: "There was a problem sending your request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-primary/20 bg-card/50 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Security Header Banner */}
        <div className="bg-secondary/80 border-b border-border/40 px-6 py-2.5 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
            Instant Activation Request Secure Form
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-6 text-muted-foreground hover:text-primary transition-all duration-200 z-20 p-2 hover:bg-secondary rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-6 py-8 md:px-10">
          {/* Plan Summary Banner */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-secondary/30 border border-white/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3 animate-pulse" /> Selected Plan Details
              </p>
              <h3 className="text-xl font-bold text-foreground">{planName}</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-foreground">{planPrice}</span>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                {planPeriod.replace("/", "PER ")}
              </p>
            </div>
          </div>

          {/* Activation Form */}
          <form onSubmit={handleActivationSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-xs font-medium pl-1 text-muted-foreground">
                  First Name <span className="text-primary">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                    disabled={isProcessing}
                    className="bg-secondary/50 border-white/5 h-11 pl-9 focus:ring-primary/20"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-xs font-medium pl-1 text-muted-foreground">
                  Last Name <span className="text-primary">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    required
                    disabled={isProcessing}
                    className="bg-secondary/50 border-white/5 h-11 pl-9 focus:ring-primary/20"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                </div>
              </div>
            </div>

            {/* Phone Number (Compulsory) */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-medium pl-1 text-muted-foreground">
                Phone Number <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                  disabled={isProcessing}
                  className="bg-secondary/50 border-white/5 h-11 pl-9 focus:ring-primary/20"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Email Address (Optional) */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium pl-1 text-muted-foreground">
                Email Address <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  disabled={isProcessing}
                  className="bg-secondary/50 border-white/5 h-11 pl-9 focus:ring-primary/20"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Custom Message */}
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-medium pl-1 text-muted-foreground">
                Custom Message / Device Details
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us any details (e.g. MAC address, device OS, etc.)"
                  disabled={isProcessing}
                  className="bg-secondary/50 border-white/5 min-h-[80px] pl-9 py-2.5 focus:ring-primary/20"
                />
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Action Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full h-12 gradient-primary border-0 text-white font-bold text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(243,38,42,0.3)] hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Submitting Activation...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Request
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
