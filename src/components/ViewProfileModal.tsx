import { X, User, Mail, Calendar, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ViewProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewProfileModal = ({ isOpen, onClose }: ViewProfileModalProps) => {
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-primary transition-all duration-200 z-20 p-2 hover:bg-white/5 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-8 pt-12 pb-10">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 border-4 border-primary/20 ring-8 ring-primary/5 shadow-2xl">
                <AvatarImage src={user.profilePhoto} alt={user.fullName} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-black uppercase">
                  {user.fullName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-4 border-card shadow-lg" />
            </div>
            <h2 className="text-2xl font-black text-foreground tracking-tight">{user.fullName}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Shield className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Verified Streamer</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</span>
                <span className="text-sm font-bold text-foreground">{user.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="rounded-xl bg-accent/10 p-2.5">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Membership Plan</span>
                <span className="text-sm font-black text-accent uppercase tracking-tight">
                  {user.membershipPlan || "Free Plan"}
                </span>
              </div>
            </div>

            {user.expiryDate && (
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="rounded-xl bg-green-500/10 p-2.5">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expiry Date</span>
                  <span className="text-sm font-bold text-foreground">{user.expiryDate}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10">
            <Button 
              onClick={onClose}
              className="w-full h-14 gradient-primary border-0 text-primary-foreground font-black uppercase tracking-widest text-xs glow-primary"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileModal;
