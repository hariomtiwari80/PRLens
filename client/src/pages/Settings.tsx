import {
  Bell,
  Shield,
  Github,
  Save,
  User,
  Mail,
  LogOut,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import PageTransition from "@/components/PageTransition";

interface UserType {
  login: string;
  avatar_url: string;
  email: string;
}

const Settings = () => {

  const [
    user,
    setUser,
  ] = useState<UserType | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    notifications,
    setNotifications,
  ] = useState(true);

  const [
    securityAlerts,
    setSecurityAlerts,
  ] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/me`,
            {
              withCredentials: true,
            }
          );

        setUser(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchUser();

  }, []);

  const handleLogout = async () => {

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "/";

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <PageTransition>

      <div className="min-h-screen bg-black text-white overflow-hidden">

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <div className="mb-10 sm:mb-12">

            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Settings
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-7 sm:leading-8">
              Manage your PRLens workspace, GitHub integration, notifications, and account preferences.
            </p>

          </div>

          <div className="space-y-6">

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">

                  <Github className="w-7 h-7 text-orange-400" />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold">
                    GitHub Integration
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Connected account and repository access.
                  </p>

                </div>

              </div>

              {loading ? (

                <div className="animate-pulse bg-black/20 border border-white/5 rounded-2xl h-28"></div>

              ) : (

                <div className="bg-black/20 border border-white/5 rounded-2xl p-5">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={user?.avatar_url}
                        alt="avatar"
                        className="w-16 h-16 rounded-2xl border border-white/10"
                      />

                      <div>

                        <h3 className="text-lg font-semibold mb-2">
                          {user?.login}
                        </h3>

                        <p className="text-gray-400 text-sm">
                          GitHub account connected successfully.
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={handleLogout}
                      className="h-11 px-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center gap-3"
                    >

                      <LogOut className="w-5 h-5" />

                      Disconnect

                    </button>

                  </div>

                </div>

              )}

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">

                  <Bell className="w-7 h-7 text-blue-400" />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold">
                    Notifications
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Configure platform alerts and engineering updates.
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-2xl p-5 gap-4">

                  <div>

                    <h3 className="font-medium mb-2">
                      Pull Request Alerts
                    </h3>

                    <p className="text-sm text-gray-400">
                      AI review and repository activity notifications.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setNotifications(
                        !notifications
                      )
                    }
                    className={`w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ${
                      notifications
                        ? "bg-orange-500"
                        : "bg-gray-700"
                    }`}
                  >

                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                        notifications
                          ? "ml-auto"
                          : ""
                      }`}
                    ></div>

                  </button>

                </div>

                <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-2xl p-5 gap-4">

                  <div>

                    <h3 className="font-medium mb-2">
                      Security Alerts
                    </h3>

                    <p className="text-sm text-gray-400">
                      Vulnerability and dependency notifications.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setSecurityAlerts(
                        !securityAlerts
                      )
                    }
                    className={`w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ${
                      securityAlerts
                        ? "bg-orange-500"
                        : "bg-gray-700"
                    }`}
                  >

                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                        securityAlerts
                          ? "ml-auto"
                          : ""
                      }`}
                    ></div>

                  </button>

                </div>

              </div>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">

                  <Shield className="w-7 h-7 text-green-400" />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold">
                    Account Information
                  </h2>

                  <p className="text-gray-400 text-sm">
                    User profile and connected platform details.
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                <div className="bg-black/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4">

                  <User className="w-6 h-6 text-orange-400" />

                  <div>

                    <p className="text-sm text-gray-400 mb-1">
                      Username
                    </p>

                    <h3 className="font-medium">
                      {user?.login || "Loading"}
                    </h3>

                  </div>

                </div>

                <div className="bg-black/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4">

                  <Mail className="w-6 h-6 text-blue-400" />

                  <div>

                    <p className="text-sm text-gray-400 mb-1">
                      Email
                    </p>

                    <h3 className="font-medium">
                      {user?.email || "Private"}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

            <button className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-medium flex items-center justify-center gap-3">

              <Save className="w-5 h-5" />

              Save Settings

            </button>

          </div>

        </div>

      </div>

    </PageTransition>
  );
};

export default Settings;
