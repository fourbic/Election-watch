import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../utils/types';

interface ProfileSettings {
  name: string;
  email: string;
  organization: string;
  regions: string[];
}

interface NotificationSettings {
  emailNotifications: boolean;
  narrativeAlerts: boolean;
  actorAlerts: boolean;
  reportGeneration: boolean;
  dailyDigest: boolean;
}

interface ProfileSettingsProps {
  user: User | null;
  onSave: (settings: ProfileSettings) => Promise<void>;
}

interface NotificationSettingsProps {
  settings: NotificationSettings;
  onSave: (settings: NotificationSettings) => Promise<void>;
}

// User profile settings component
const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onSave }) => {
  const [profile, setProfile] = useState<ProfileSettings>({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    regions: user?.regions || []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Update profile state if user prop changes
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        organization: user.organization,
        regions: user.regions
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(profile);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
          Organization
        </label>
        <input
          type="text"
          id="organization"
          value={profile.organization}
          onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

// Notification settings component
const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onSave }) => {
  const [notifications, setNotifications] = useState<NotificationSettings>(settings);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(notifications);
    } catch (error) {
      console.error('Error saving notification settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.emailNotifications}
            onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Narrative Alerts</h4>
            <p className="text-sm text-gray-500">Get notified about new narratives</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.narrativeAlerts}
            onChange={(e) => setNotifications({ ...notifications, narrativeAlerts: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Actor Alerts</h4>
            <p className="text-sm text-gray-500">Get notified about new actor activities</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.actorAlerts}
            onChange={(e) => setNotifications({ ...notifications, actorAlerts: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Report Generation</h4>
            <p className="text-sm text-gray-500">Get notified when reports are generated</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.reportGeneration}
            onChange={(e) => setNotifications({ ...notifications, reportGeneration: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Daily Digest</h4>
            <p className="text-sm text-gray-500">Receive a daily summary of activities</p>
          </div>
          <input
            type="checkbox"
            checked={notifications.dailyDigest}
            onChange={(e) => setNotifications({ ...notifications, dailyDigest: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
};

const SettingsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    narrativeAlerts: true,
    actorAlerts: true,
    reportGeneration: true,
    dailyDigest: true
  });

  const handleProfileSave = async (settings: ProfileSettings) => {
    // In a real app, this would make an API call
    console.log('Saving profile settings:', settings);
    // Refresh user data after successful save
    await refreshUser();
  };

  const handleNotificationSave = async (settings: NotificationSettings) => {
    // In a real app, this would make an API call
    console.log('Saving notification settings:', settings);
    setNotificationSettings(settings);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-4">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`${
                  activeTab === 'notifications'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Notifications
              </button>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="mt-6">
            {activeTab === 'profile' ? (
              <ProfileSettings user={user} onSave={handleProfileSave} />
            ) : (
              <NotificationSettings
                settings={notificationSettings}
                onSave={handleNotificationSave}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
