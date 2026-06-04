import {
  ShieldAlert,
  Bug,
  Lock,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import PageTransition from "@/components/PageTransition";

interface VulnerabilityType {
  title: string;
  severity: string;
  package: string;
}

interface SecurityOverviewType {
  critical: number;
  medium: number;
  low: number;
  secureRepositories: number;
}

const Security = () => {

  const [
    vulnerabilities,
    setVulnerabilities,
  ] = useState<VulnerabilityType[]>([]);

  const [
    overview,
    setOverview,
  ] = useState<SecurityOverviewType>({
    critical: 0,
    medium: 0,
    low: 0,
    secureRepositories: 0,
  });

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const fetchSecurity = async () => {

      try {

        const [
          overviewResponse,
          vulnerabilitiesResponse,
        ] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/security`,
            {
              withCredentials: true,
            }
          ),

          axios.get(
            `${import.meta.env.VITE_API_URL}/api/security/vulnerabilities`,
            {
              withCredentials: true,
            }
          ),
        ]);

        setOverview(
          overviewResponse.data
        );

        setVulnerabilities(
          vulnerabilitiesResponse.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchSecurity();

  }, []);

  return (

    <PageTransition>

      <div className="min-h-screen bg-black text-white overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <div className="mb-10 sm:mb-12">

            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Security Center
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-7 sm:leading-8">
              AI-powered vulnerability analysis and DevSecOps intelligence.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <ShieldAlert className="w-9 h-9 sm:w-10 sm:h-10 text-red-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {overview.critical}
              </h2>

              <p className="text-gray-400">
                Critical Issues
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <AlertTriangle className="w-9 h-9 sm:w-10 sm:h-10 text-orange-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {overview.medium}
              </h2>

              <p className="text-gray-400">
                Medium Risks
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <ShieldCheck className="w-9 h-9 sm:w-10 sm:h-10 text-green-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {overview.secureRepositories}
              </h2>

              <p className="text-gray-400">
                Secure Repositories
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <Lock className="w-9 h-9 sm:w-10 sm:h-10 text-blue-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Active
              </h2>

              <p className="text-gray-400">
                Protection Status
              </p>

            </div>

          </div>

          <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

            <div className="mb-8">

              <h2 className="text-2xl font-semibold mb-2">
                AI Vulnerability Reports
              </h2>

              <p className="text-gray-400">
                Security insights generated from repository analysis.
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

                {vulnerabilities.map((item, index) => (

                  <div
                    key={index}
                    className="bg-black/20 border border-white/5 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01]"
                  >

                    <div className="flex items-start gap-4">

                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                          item.severity === "Critical"
                            ? "bg-red-500/10"
                            : "bg-orange-500/10"
                        }`}
                      >

                        <Bug
                          className={`w-6 h-6 ${
                            item.severity === "Critical"
                              ? "text-red-400"
                              : "text-orange-400"
                          }`}
                        />

                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">

                          <h3 className="text-lg sm:text-xl font-semibold">
                            {item.title}
                          </h3>

                          <span
                            className={`px-4 py-1 rounded-full text-sm border w-fit ${
                              item.severity === "Critical"
                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            }`}
                          >

                            {item.severity}

                          </span>

                        </div>

                        <p className="text-gray-400 leading-7 text-sm sm:text-base">
                          Package affected: {item.package}
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

    </PageTransition>
  );
};

export default Security;