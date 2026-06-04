import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import PageTransition from "@/components/PageTransition";

interface ActivityType {
  day: string;
  pullRequests: number;
  commits: number;
}

interface PerformanceType {
  deploymentFrequency: string;
  averageReviewTime: string;
  mergeSuccessRate: string;
  openIssues: number;
}

interface AnalyticsType {
  repositories: number;
  pullRequests: number;
  vulnerabilities: number;
  contributors: number;
  performance: string;
}

const Analytics = () => {

  const [
    analytics,
    setAnalytics,
  ] = useState<AnalyticsType>({
    repositories: 0,
    pullRequests: 0,
    vulnerabilities: 0,
    contributors: 0,
    performance: "",
  });

  const [
    activity,
    setActivity,
  ] = useState<ActivityType[]>([]);

  const [
    performance,
    setPerformance,
  ] = useState<PerformanceType>({
    deploymentFrequency: "",
    averageReviewTime: "",
    mergeSuccessRate: "",
    openIssues: 0,
  });

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const [
          analyticsResponse,
          activityResponse,
          performanceResponse,
        ] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/analytics`,
            {
              withCredentials: true,
            }
          ),

          axios.get(
            `${import.meta.env.VITE_API_URL}/api/analytics/activity`,
            {
              withCredentials: true,
            }
          ),

          axios.get(
            `${import.meta.env.VITE_API_URL}/api/analytics/performance`,
            {
              withCredentials: true,
            }
          ),
        ]);

        setAnalytics(
          analyticsResponse.data
        );

        setActivity(
          activityResponse.data
        );

        setPerformance(
          performanceResponse.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchAnalytics();

  }, []);

  return (

    <PageTransition>

      <div className="min-h-screen bg-black text-white overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <div className="mb-10 sm:mb-12">

            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Analytics
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-7 sm:leading-8">
              AI-powered engineering metrics and repository intelligence insights.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {analytics.repositories}
              </h2>

              <p className="text-gray-400">
                Repositories
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {analytics.pullRequests}
              </h2>

              <p className="text-gray-400">
                Pull Requests
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {analytics.vulnerabilities}
              </h2>

              <p className="text-gray-400">
                Vulnerabilities
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {analytics.performance}
              </h2>

              <p className="text-gray-400">
                Performance
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <div className="mb-8">

                <h2 className="text-2xl font-semibold mb-2">
                  Pull Request Activity
                </h2>

                <p className="text-gray-400">
                  Weekly repository engineering activity.
                </p>

              </div>

              <div className="h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                  <AreaChart data={activity}>

                    <XAxis
                      dataKey="day"
                      stroke="#6b7280"
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="pullRequests"
                      stroke="#f97316"
                      fill="#f97316"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <div className="mb-8">

                <h2 className="text-2xl font-semibold mb-2">
                  Commit Insights
                </h2>

                <p className="text-gray-400">
                  Team commit distribution and repository activity.
                </p>

              </div>

              <div className="h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={activity}>

                    <XAxis
                      dataKey="day"
                      stroke="#6b7280"
                    />

                    <Tooltip />

                    <Bar
                      dataKey="commits"
                      fill="#3b82f6"
                      radius={[10, 10, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

          <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

            <div className="mb-8">

              <h2 className="text-2xl font-semibold mb-2">
                Performance Metrics
              </h2>

              <p className="text-gray-400">
                Engineering workflow and delivery insights.
              </p>

            </div>

            {loading ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                {[1, 2, 3, 4].map((item) => (

                  <div
                    key={item}
                    className="animate-pulse bg-black/20 border border-white/5 rounded-2xl h-32"
                  ></div>

                ))}

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                <div className="bg-black/20 border border-white/5 rounded-2xl p-5">

                  <h3 className="text-gray-400 mb-3">
                    Deployment Frequency
                  </h3>

                  <p className="text-2xl font-bold">
                    {performance.deploymentFrequency}
                  </p>

                </div>

                <div className="bg-black/20 border border-white/5 rounded-2xl p-5">

                  <h3 className="text-gray-400 mb-3">
                    Average Review Time
                  </h3>

                  <p className="text-2xl font-bold">
                    {performance.averageReviewTime}
                  </p>

                </div>

                <div className="bg-black/20 border border-white/5 rounded-2xl p-5">

                  <h3 className="text-gray-400 mb-3">
                    Merge Success Rate
                  </h3>

                  <p className="text-2xl font-bold">
                    {performance.mergeSuccessRate}
                  </p>

                </div>

                <div className="bg-black/20 border border-white/5 rounded-2xl p-5">

                  <h3 className="text-gray-400 mb-3">
                    Open Issues
                  </h3>

                  <p className="text-2xl font-bold">
                    {performance.openIssues}
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </PageTransition>
  );
};

export default Analytics;
