import { useState } from "react";
import { X, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.profilePhoto || "");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    // Simulate update delay
    setTimeout(() => {
      updateUser({ fullName, profilePhoto: photoUrl });
      toast({
        title: "Profile Updated",
        description: "Your profile changes have been saved successfully.",
      });
      setIsUpdating(false);
      onClose();
    }, 600);
  };

  const handleRandomizePhoto = () => {
    const newUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    setPhotoUrl(newUrl);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/20 blur-[80px]" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative z-10 text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
          <p className="text-sm text-muted-foreground">Customize your appearance</p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-primary/50 ring-4 ring-primary/10">
                <AvatarImage src={photoUrl} alt={fullName} />
                <AvatarFallback className="text-xl">{fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={handleRandomizePhoto}
                className="absolute bottom-0 right-0 p-2 rounded-full gradient-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
                title="Change Photo"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Click the camera to randomize your avatar</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">Display Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                className="bg-secondary border-border focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Address</Label>
              <Input
                value={user.email}
                disabled
                className="bg-secondary/50 border-border opacity-60 cursor-not-allowed"
              />
              <p className="text-[10px] text-muted-foreground pl-1 italic">Email cannot be changed</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 border border-border hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="flex-1 gradient-primary border-0 text-primary-foreground shadow-lg shadow-primary/20"
            >
              {isUpdating ? "Saving..." : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
