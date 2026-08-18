import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, User, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [showBadge, setShowBadge] = useState(true);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "agent" | "user"; text: string; time: string }>>([
    {
      sender: "agent",
      text: "👋 Welcome to Smart Care TV! I'm Sarah from the support team.",
      time: "Just now"
    },
    {
      sender: "agent",
      text: "How can I help you today? You can ask about plan activations, request a 24h trial, or get setup assistance instantly!",
      time: "Just now"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "14064792077"; // +1 (406) 479-2077

  // Listen for custom open events (e.g. from the ContactSection support hub)
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowBadge(false);
    };
    window.addEventListener("open-live-chat", handleOpenChat);
    return () => window.removeEventListener("open-live-chat", handleOpenChat);
  }, []);

  // Scroll to bottom on open or new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isOpen]);

  // Hide badge once opened
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowBadge(false);
    }
  };

  const handleQuickAction = (actionText: string, waMessage: string) => {
    // Add to chat history
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatHistory((prev) => [...prev, { sender: "user", text: actionText, time: now }]);

    // Simulate agent reply typing briefly, then redirect
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { 
          sender: "agent", 
          text: "Opening instant secure support chat via WhatsApp...", 
          time: "Just now" 
        }
      ]);

      // Open WhatsApp URL
      const encodedMsg = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
      window.open(waUrl, "_blank");
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userText = typedMessage.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add to chat history
    setChatHistory((prev) => [...prev, { sender: "user", text: userText, time: now }]);
    setTypedMessage("");

    // Simulate Agent response and open WhatsApp
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { 
          sender: "agent", 
          text: "Perfect! Connecting you to a live representative on WhatsApp for instant assistance...", 
          time: "Just now" 
        }
      ]);

      const encodedMsg = encodeURIComponent(`Hello support team! ${userText}`);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
      window.open(waUrl, "_blank");
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-4 w-[360px] sm:w-[380px] h-[500px] flex flex-col rounded-3xl border border-white/10 bg-card/95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden"
          >
            {/* Header Banner */}
            <div className="relative p-5 bg-gradient-to-r from-red-600/20 via-primary/10 to-transparent border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Agent Avatar */}
                <div className="relative">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center text-white shadow-md shadow-primary/20">
                    <User className="h-5 w-5" />
                  </div>
                  {/* Active status pulse */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    Sarah <span className="text-[10px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded bg-primary/20 text-primary">AGENT</span>
                  </h4>
                  <p className="text-[10px] font-semibold text-emerald-400 tracking-wide">
                    Online • Active Support
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body & History */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-end gap-1.5 max-w-[85%]">
                    {msg.sender === "agent" && (
                      <div className="h-6 w-6 rounded-lg bg-secondary border border-white/5 flex items-center justify-center shrink-0">
                        <User className="h-3 w-3 text-muted-foreground" />
                      </div>
                    )}
                    
                    <div
                      className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-secondary/70 border border-white/5 text-foreground rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  <span className="text-[9px] text-muted-foreground/60 font-medium mt-1 pl-8 pr-1">
                    {msg.time}
                  </span>
                </div>
              ))}
              
              {/* Quick Actions Panel */}
              {chatHistory.length <= 3 && (
                <div className="pt-2 space-y-2 pl-7">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1 mb-2">
                    ⚡ Quick Support Links
                  </p>
                  
                  <button
                    onClick={() => handleQuickAction("🚀 Instant Activation", "Hello! I would like to order a subscription plan and activate it instantly.")}
                    className="w-full text-left p-2.5 rounded-xl border border-white/5 bg-secondary/30 hover:bg-secondary hover:border-primary/30 text-xs font-semibold text-foreground transition-all duration-200 flex items-center justify-between group"
                  >
                    <span>🚀 Order & Activate Instantly</span>
                    <Sparkles className="h-3.5 w-3.5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button
                    onClick={() => handleQuickAction("🎁 Request 24h Free Trial", "Hello! I would like to request a 24-hour free trial account.")}
                    className="w-full text-left p-2.5 rounded-xl border border-white/5 bg-secondary/30 hover:bg-secondary hover:border-primary/30 text-xs font-semibold text-foreground transition-all duration-200 flex items-center justify-between group"
                  >
                    <span>🎁 Request 24H Free Trial</span>
                    <Sparkles className="h-3.5 w-3.5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button
                    onClick={() => handleQuickAction("🔧 Get Setup & Tech Support", "Hello! I need assistance with setting up the streaming app on my device.")}
                    className="w-full text-left p-2.5 rounded-xl border border-white/5 bg-secondary/30 hover:bg-secondary hover:border-primary/30 text-xs font-semibold text-foreground transition-all duration-200 flex items-center justify-between group"
                  >
                    <span>🔧 Setup / Tech Support</span>
                    <Sparkles className="h-3.5 w-3.5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-secondary/30 border-t border-white/5 flex items-center gap-2"
            >
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder="Ask us anything..."
                className="flex-1 bg-secondary/60 border border-white/5 rounded-xl h-10 px-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl gradient-primary border-0 text-white shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Bubble */}
      <motion.button
        onClick={handleToggleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary to-orange-500 text-white flex items-center justify-center shadow-xl shadow-primary/30 cursor-pointer overflow-hidden group"
      >
        {/* Glow backdrop layer */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isOpen ? (
          <X className="h-6 w-6 relative z-10 transition-transform duration-300 rotate-90" />
        ) : (
          <MessageCircle className="h-6 w-6 relative z-10 animate-pulse" />
        )}

        {/* Pulse Ring Indicator */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl border-2 border-primary/50 animate-ping opacity-60 pointer-events-none" />
        )}

        {/* Notification Alert Badge */}
        {showBadge && !isOpen && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-black text-white shadow-lg">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default LiveChat;
