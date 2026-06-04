import {
  Bell,
  ShieldAlert,
  GitPullRequest,
  Sparkles,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

interface NotificationType {
  id: number;
  title: string;
  time: string;
}

const Notifications = () => {

  const [
    notifications,
    setNotifications,
  ] = useState<NotificationType[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/notifications`,
            {
              withCredentials: true,
            }
          );

        setNotifications(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchNotifications();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        <div className="mb-10 sm:mb-12">

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center mb-6">

            <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />

          </div>

          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Notifications
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-7 sm:leading-8">
            Live engineering alerts, AI insights, and repository activity updates.
          </p>

        </div>

        {loading ? (

          <div className="space-y-5">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="animate-pulse bg-[#111113] border border-white/5 rounded-3xl p-6 h-32"
              ></div>

            ))}

          </div>

        ) : (

          <div className="space-y-5">

            {notifications.map((item) => (

              <div
                key={item.id}
                className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:scale-[1.01]"
              >

                <div className="flex items-start gap-4 sm:gap-5">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">

                    {item.title.toLowerCase().includes("vulnerability") ? (

                      <ShieldAlert className="w-6 h-6 text-red-400" />

                    ) : item.title.toLowerCase().includes("pull") ? (

                      <GitPullRequest className="w-6 h-6 text-orange-400" />

                    ) : item.title.toLowerCase().includes("ai") ? (

                      <Sparkles className="w-6 h-6 text-blue-400" />

                    ) : (

                      <CheckCircle2 className="w-6 h-6 text-green-400" />

                    )}

                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">

                      <h2 className="text-lg sm:text-2xl font-semibold leading-7">
                        {item.title}
                      </h2>

                      <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">

                        <Clock3 className="w-4 h-4" />

                        {item.time}

                      </div>

                    </div>

                    <p className="text-gray-400 leading-7 text-sm sm:text-base">
                      Engineering notification received successfully from PRLens backend services.
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Notifications;
