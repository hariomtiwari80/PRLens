import {
  Users,
  GitPullRequest,
  GitCommit,
  Activity,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import PageTransition from "@/components/PageTransition";

interface ContributorType {
  name: string;
  commits: number;
  pullRequests: number;
}

interface TeamOverviewType {
  contributors: number;
  commits: number;
  pullRequests: number;
}

interface ActivityType {
  activity: string;
  time: string;
}

const Team = () => {

  const [
    overview,
    setOverview,
  ] = useState<TeamOverviewType>({
    contributors: 0,
    commits: 0,
    pullRequests: 0,
  });

  const [
    contributors,
    setContributors,
  ] = useState<ContributorType[]>([]);

  const [
    activities,
    setActivities,
  ] = useState<ActivityType[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const fetchTeamData = async () => {

      try {

        const [
          overviewResponse,
          contributorsResponse,
          activitiesResponse,
        ] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/team`,
            {
              withCredentials: true,
            }
          ),

          axios.get(
            `${import.meta.env.VITE_API_URL}/api/team/contributors`,
            {
              withCredentials: true,
            }
          ),

          axios.get(
            `${import.meta.env.VITE_API_URL}/api/team/activity`,
            {
              withCredentials: true,
            }
          ),
        ]);

        setOverview(
          overviewResponse.data
        );

        setContributors(
          contributorsResponse.data
        );

        setActivities(
          activitiesResponse.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchTeamData();

  }, []);

  return (

    <PageTransition>

      <div className="min-h-screen bg-black text-white overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <div className="mb-10 sm:mb-12">

            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Team Intelligence
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-7 sm:leading-8">
              Engineering collaboration insights and contributor performance analytics.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <Users className="w-9 h-9 sm:w-10 sm:h-10 text-orange-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {overview.contributors}
              </h2>

              <p className="text-gray-400">
                Contributors
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <GitCommit className="w-9 h-9 sm:w-10 sm:h-10 text-blue-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {overview.commits}
              </h2>

              <p className="text-gray-400">
                Total Commits
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <GitPullRequest className="w-9 h-9 sm:w-10 sm:h-10 text-green-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {overview.pullRequests}
              </h2>

              <p className="text-gray-400">
                Pull Requests
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <Activity className="w-9 h-9 sm:w-10 sm:h-10 text-purple-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Active
              </h2>

              <p className="text-gray-400">
                Team Status
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <div className="mb-8">

                <h2 className="text-2xl font-semibold mb-2">
                  Contributors
                </h2>

                <p className="text-gray-400">
                  Team contribution analytics from repositories.
                </p>

              </div>

              {loading ? (

                <div className="space-y-5">

                  {[1, 2, 3].map((item) => (

                    <div
                      key={item}
                      className="animate-pulse bg-black/20 border border-white/5 rounded-2xl h-28"
                    ></div>

                  ))}

                </div>

              ) : (

                <div className="space-y-5">

                  {contributors.map((item, index) => (

                    <div
                      key={index}
                      className="bg-black/20 border border-white/5 rounded-2xl p-5"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <h3 className="text-lg font-semibold mb-2">
                            {item.name}
                          </h3>

                          <p className="text-gray-400 text-sm">
                            {item.commits} commits • {item.pullRequests} pull requests
                          </p>

                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">

                          <Users className="w-6 h-6 text-orange-400" />

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <div className="mb-8">

                <h2 className="text-2xl font-semibold mb-2">
                  Team Activity
                </h2>

                <p className="text-gray-400">
                  Recent engineering collaboration updates.
                </p>

              </div>

              {loading ? (

                <div className="space-y-5">

                  {[1, 2, 3].map((item) => (

                    <div
                      key={item}
                      className="animate-pulse bg-black/20 border border-white/5 rounded-2xl h-24"
                    ></div>

                  ))}

                </div>

              ) : (

                <div className="space-y-5">

                  {activities.map((item, index) => (

                    <div
                      key={index}
                      className="bg-black/20 border border-white/5 rounded-2xl p-5"
                    >

                      <div className="flex items-start gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">

                          <Activity className="w-6 h-6 text-blue-400" />

                        </div>

                        <div className="flex-1">

                          <h3 className="text-lg font-semibold mb-2">
                            {item.activity}
                          </h3>

                          <p className="text-gray-400 text-sm">
                            {item.time}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </PageTransition>
  );
};

export default Team;