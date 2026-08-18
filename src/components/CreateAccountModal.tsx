import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAccountModal = ({ isOpen, onClose }: CreateAccountModalProps) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (!formData.email || !formData.password) {
        toast({
          title: "Missing Fields",
          description: "Please enter your email and password.",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate successful login
      login({
        fullName: formData.email.split('@')[0], // Fallback name
        email: formData.email,
        profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + formData.email,
      });

      toast({
        title: "Welcome Back!",
        description: "You have successfully logged in.",
      });
    } else {
      if (!formData.fullName || !formData.email || !formData.password) {
        toast({
          title: "Missing Fields",
          description: "Please fill in all fields to create your account.",
          variant: "destructive",
        });
        return;
      }
      if (formData.password.length < 6) {
        toast({
          title: "Weak Password",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        });
        return;
      }

      // Simulate successful signup
      login({
        fullName: formData.fullName,
        email: formData.email,
        profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + formData.fullName,
      });

      toast({
        title: "Account Created!",
        description: "Welcome to Smart Care TV. You can now explore our plans.",
      });
    }

    setFormData({ fullName: "", email: "", password: "" });
    onClose();

    // Scroll to plans after successful auth
    setTimeout(() => {
      document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
      if (window.location.pathname !== "/") {
         window.location.href = "/#plans";
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "Get Started" : "Create Account"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isLogin 
              ? "Welcome Back to Smart Care TV" 
              : "Join the Smart Care TV Community"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                Full Name <span className="text-primary">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address <span className="text-primary">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password <span className="text-primary">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={isLogin ? "Enter your password" : "Create your password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full gradient-primary border-0 text-primary-foreground glow-primary text-base py-5"
          >
            {isLogin ? "Get Started" : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-primary hover:underline font-medium"
              >
                Create Account
              </button>
            </>
          ) : (
             <>
               Already have an account?{" "}
               <button
                 onClick={() => setIsLogin(true)}
                 className="text-primary hover:underline font-medium"
               >
                 Get Started
               </button>
             </>
          )}
        </p>

        {!isLogin && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a href="/refund-policy" onClick={onClose} className="text-primary hover:underline">
              Terms & Conditions
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateAccountModal;
