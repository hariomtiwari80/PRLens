import {
  GitCommit,
  GitPullRequest,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const activities = [
  {
    title: "Authentication middleware updated",
    time: "2 minutes ago",
    type: "commit",
  },
  {
    title: "AI reviewed PR #42 successfully",
    time: "10 minutes ago",
    type: "pr",
  },
  {
    title: "Security vulnerability detected",
    time: "24 minutes ago",
    type: "security",
  },
  {
    title: "AI generated engineering report",
    time: "1 hour ago",
    type: "ai",
  },
];

const ActivityFeed = () => {

  return (

    <div className="bg-[#111113] border border-white/5 rounded-3xl p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-semibold mb-2">
            Live Activity
          </h2>

          <p className="text-gray-400 text-sm">
            Real-time engineering updates
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex gap-4"
          >

            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                item.type === "commit"
                  ? "bg-orange-500/10"
                  : item.type === "pr"
                  ? "bg-blue-500/10"
                  : item.type === "security"
                  ? "bg-red-500/10"
                  : "bg-purple-500/10"
              }`}
            >

              {item.type === "commit" ? (

                <GitCommit className="w-5 h-5 text-orange-400" />

              ) : item.type === "pr" ? (

                <GitPullRequest className="w-5 h-5 text-blue-400" />

              ) : item.type === "security" ? (

                <ShieldAlert className="w-5 h-5 text-red-400" />

              ) : (

                <Sparkles className="w-5 h-5 text-purple-400" />

              )}

            </div>

            <div className="flex-1">

              <h3 className="font-medium mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ActivityFeed;