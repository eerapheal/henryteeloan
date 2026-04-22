'use client';

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Settings as SettingsIcon, 
  User as UserIcon, 
  Bell, 
  Percent,
  Save,
  Loader2,
  Camera,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function SettingsView() {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [settings, setSettings] = useState({
    interestRate: 20,
    maxLoanAmount: 500000,
    adminEmail: "santech901@gmail.com",
    supportPhone1: "08034783848",
    supportPhone2: "07025251073",
  });

  // Profile State
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePic: "",
    isHardcoded: false
  });
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch System Settings
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSettings(data);
        setIsFetching(false);
      })
      .catch(err => {
        console.error("Failed to load settings", err);
        setIsFetching(false);
      });

    // Fetch Profile Data
    fetch('/api/admin/profile')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setProfile(data);
      })
      .catch(err => console.error("Failed to load profile", err));
  }, []);

  const handleSave = async (section: string, payload: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(`${section} updated successfully`);
      } else {
        toast.error(`Failed to update ${section}`);
      }
    } catch (error) {
      toast.error(`An error occurred while updating ${section}`);
    }
    setLoading(false);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: profile.username,
          email: profile.email,
          profilePic: profile.profilePic
        })
      });
      if (res.ok) {
        toast.success("Profile updated successfully");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });
      if (res.ok) {
        toast.success("Password updated successfully");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to update password");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 animate-fadeIn">
      {/* System Configuration */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-navy-gradient text-white rounded-xl shadow-md">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-[#0F2B46]">System Configuration</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 border-[#E4E7EC] shadow-soft rounded-[2rem] space-y-6 bg-white">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">
                <Percent className="w-4 h-4 text-[#C8992C]" /> Default Interest Rate (%)
              </Label>
              <Input type="number" name="interestRate" value={settings.interestRate} onChange={handleChange} className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">Maximum Loan Amount (₦)</Label>
              <Input type="number" name="maxLoanAmount" value={settings.maxLoanAmount} onChange={handleChange} className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46]" />
            </div>
            <Button 
              className="w-full h-12 rounded-xl gap-2 bg-[#0F2B46] hover:bg-[#0A1E33] shadow-lg shadow-[#0F2B46]/10" 
              onClick={() => handleSave("System Settings", { interestRate: settings.interestRate, maxLoanAmount: settings.maxLoanAmount })}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save System Settings
            </Button>
          </Card>

          <Card className="p-8 border-[#E4E7EC] shadow-soft rounded-[2rem] space-y-6 bg-white">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">
                <Bell className="w-4 h-4 text-[#C8992C]" /> Admin Notification Email
              </Label>
              <Input type="email" name="adminEmail" value={settings.adminEmail} onChange={handleChange} className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">Primary Support Phone</Label>
              <Input type="text" name="supportPhone1" value={settings.supportPhone1} onChange={handleChange} className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">Secondary Support Phone</Label>
              <Input type="text" name="supportPhone2" value={settings.supportPhone2} onChange={handleChange} className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46]" />
            </div>
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-xl gap-2 border-[#0F2B46] text-[#0F2B46] hover:bg-[#0F2B46] hover:text-white"
              onClick={() => handleSave("Communication Settings", { adminEmail: settings.adminEmail, supportPhone1: settings.supportPhone1, supportPhone2: settings.supportPhone2 })}
              disabled={loading}
            >
              Update Contact Info
            </Button>
          </Card>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Profile Settings */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#0F2B46]/10 text-[#0F2B46] rounded-xl">
              <UserIcon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#0F2B46]">Administrator Profile</h3>
          </div>

          <Card className="p-8 border-[#E4E7EC] shadow-soft rounded-[2rem] bg-white">
            <form onSubmit={handleProfileUpdate} className="space-y-8">
              <div className="flex flex-col items-center gap-6 pb-6 border-b border-[#E4E7EC]">
                <div className="relative group">
                  <div className="w-24 h-24 bg-[#FAFBFC] rounded-2xl border-2 border-dashed border-[#E4E7EC] flex items-center justify-center overflow-hidden">
                    {profile.profilePic ? (
                      <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-[#0F2B46]/20">
                        {profile.username?.slice(0, 2).toUpperCase() || "AD"}
                      </span>
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 p-2 bg-[#C8992C] text-white rounded-lg shadow-lg hover:scale-110 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#0F2B46]">Profile Picture</p>
                  <p className="text-xs text-[#5A6577] mt-1">Recommended: Square image, max 2MB</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">Display Name</Label>
                  <Input 
                    type="text" 
                    value={profile.username} 
                    onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                    className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">Account Email</Label>
                  <Input 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl" 
                  />
                </div>
                {profile.isHardcoded && (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-xs text-amber-700 leading-relaxed font-medium">
                      Note: You are logged in as a hardcoded administrator. Profile changes may not persist until you create a database-managed admin account.
                    </p>
                  </div>
                )}
                <Button type="submit" className="w-full h-12 rounded-xl bg-[#0F2B46] hover:bg-[#0A1E33]" disabled={profileLoading}>
                  {profileLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </Card>
        </section>

        {/* Security Settings */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#0F2B46]">Security & Privacy</h3>
          </div>

          <Card className="p-8 border-[#E4E7EC] shadow-soft rounded-[2rem] bg-white">
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">Current Password</Label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))}
                    required
                    className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">New Password</Label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                    required
                    className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#5A6577] font-semibold text-xs uppercase tracking-wider ml-1">Confirm New Password</Label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    className="h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl" 
                  />
                </div>
              </div>
              <Button type="submit" variant="default" className="w-full h-12 rounded-xl bg-amber-600 hover:bg-amber-700" disabled={passwordLoading}>
                {passwordLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
                Update Security Credentials
              </Button>
              <p className="text-[10px] text-center text-[#5A6577] font-medium leading-relaxed">
                Ensure your password is at least 8 characters long and contains symbols for maximum security.
              </p>
            </form>
          </Card>
        </section>
      </div>
    </div>
  );
}
