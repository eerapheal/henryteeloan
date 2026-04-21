'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Percent,
  Save,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsView() {
  const [loading, setLoading] = useState(false);

  const handleSave = async (section: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast.success(`${section} updated successfully`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fadeIn">
      {/* System Configuration */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">System Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 border-none shadow-sm space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Percent className="w-4 h-4" /> Default Interest Rate (%)
              </Label>
              <Input type="number" defaultValue={20} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Maximum Loan Amount (₦)</Label>
              <Input type="number" defaultValue={500000} className="rounded-xl" />
            </div>
            <Button 
              className="w-full rounded-xl gap-2" 
              onClick={() => handleSave("System Settings")}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save System Settings
            </Button>
          </Card>

          <Card className="p-8 border-none shadow-sm space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Bell className="w-4 h-4" /> Admin Notification Email
              </Label>
              <Input type="email" defaultValue="santech901@gmail.com" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Support Phone Number</Label>
              <Input type="text" defaultValue="08034783848" className="rounded-xl" />
            </div>
            <Button 
              variant="outline" 
              className="w-full rounded-xl gap-2"
              onClick={() => handleSave("Communication Settings")}
            >
              Update Contact Info
            </Button>
          </Card>
        </div>
      </section>

      {/* Security Settings */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Security & Authentication</h3>
        </div>

        <Card className="p-8 border-none shadow-sm max-w-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" className="rounded-xl" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" variant="default" className="rounded-xl px-8" onClick={() => handleSave("Password")}>
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      </section>

      {/* Profile Settings */}
      <section className="space-y-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Administrator Profile</h3>
        </div>

        <Card className="p-8 border-none shadow-sm max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-2xl font-bold">
              AS
            </div>
            <div>
              <Button variant="outline" size="sm" className="rounded-lg">Change Avatar</Button>
              <p className="text-xs text-slate-400 mt-2">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input type="text" defaultValue="Admin Santech" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Public Email</Label>
              <Input type="email" defaultValue="support@henryteeloans.com" className="rounded-xl" />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
