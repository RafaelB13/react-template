import { useState } from 'react';
import { toast } from 'sonner';

import { SuccessAnimation } from '@/components/success-animation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserProfileController } from './controller';

export const UserProfilePage = () => {
  const { formData, isEditing, isLoading, showSuccess, handleEditClick, handleSaveClick, handleChange } =
    useUserProfileController();
  const [open2faDialog, setOpen2faDialog] = useState(false);

  const handleConfirm2FA = () => {
    setOpen2faDialog(false);
    toast.success(`A confirmation email was sent to ${formData.email}. Please check your inbox.`);
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-6">
      {showSuccess && <SuccessAnimation />}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </header>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="min-h-[480px]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>View and edit your profile information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid max-w-xs gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  size={32}
                  className="h-8 text-sm"
                />
              </div>
              <div className="grid max-w-xs gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  size={32}
                  className="h-8 text-sm"
                />
              </div>
              {isEditing && (
                <div className="grid max-w-xs gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    onChange={handleChange}
                    size={32}
                    className="h-8 text-sm"
                  />
                </div>
              )}
              <div className="flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleEditClick} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveClick} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEditClick}>Edit Profile</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="min-h-[480px]">
          <AlertDialog open={open2faDialog} onOpenChange={setOpen2faDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Enable Two-Factor Authentication</AlertDialogTitle>
                <AlertDialogDescription>
                  An email will be sent to <span className="font-semibold">{formData.email}</span> with instructions to
                  complete the 2FA setup.
                  <br />
                  Do you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button variant="outline" onClick={() => setOpen2faDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm2FA}>Confirm</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                    <p className="text-muted-foreground text-sm">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch id="two-factor-auth" onCheckedChange={(checked) => checked && setOpen2faDialog(true)} />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="login-notifications">Login Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Get notified when there is a login from an unrecognized device.
                    </p>
                  </div>
                  <Switch id="login-notifications" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here. It's recommended to use a strong password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid max-w-xs gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" size={32} className="h-8 text-sm" />
                </div>
                <div className="grid max-w-xs gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" size={32} className="h-8 text-sm" />
                </div>
                <div className="grid max-w-xs gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" size={32} className="h-8 text-sm" />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your connected accounts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    {/* Placeholder for Google Icon */}
                    <div className="bg-muted h-8 w-8 rounded-full"></div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-muted-foreground text-sm">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data. This action cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="min-h-[480px]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive notifications via email.</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive push notifications on your devices.</p>
                </div>
                <Switch id="push-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
