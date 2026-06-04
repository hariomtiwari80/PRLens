import {
  FileText,
  Download,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import PageTransition from "@/components/PageTransition";

interface ReportType {
  id: number;
  title: string;
  status: string;
}

const Reports = () => {

  const [
    reports,
    setReports,
  ] = useState<ReportType[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const fetchReports = async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/reports`,
            {
              withCredentials: true,
            }
          );

        setReports(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchReports();

  }, []);

  return (

    <PageTransition>

      <div className="min-h-screen bg-black text-white overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <div className="mb-10 sm:mb-12">

            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              AI Reports
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-7 sm:leading-8">
              AI-generated engineering reports and repository intelligence summaries.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <FileText className="w-9 h-9 sm:w-10 sm:h-10 text-orange-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {reports.length}
              </h2>

              <p className="text-gray-400">
                Generated Reports
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <Sparkles className="w-9 h-9 sm:w-10 sm:h-10 text-blue-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                AI
              </h2>

              <p className="text-gray-400">
                Smart Analysis
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <ShieldCheck className="w-9 h-9 sm:w-10 sm:h-10 text-green-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                96%
              </h2>

              <p className="text-gray-400">
                Security Score
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <Download className="w-9 h-9 sm:w-10 sm:h-10 text-purple-400 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                PDF
              </h2>

              <p className="text-gray-400">
                Export Ready
              </p>

            </div>

          </div>

          {loading ? (

            <div className="space-y-6">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="animate-pulse bg-[#111113] border border-white/5 rounded-3xl h-40"
                ></div>

              ))}

            </div>

          ) : (

            <div className="space-y-6">

              {reports.map((report) => (

                <div
                  key={report.id}
                  className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:scale-[1.01]"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div className="flex items-start gap-4 sm:gap-5">

                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                          report.status === "Completed"
                            ? "bg-green-500/10"
                            : "bg-orange-500/10"
                        }`}
                      >

                        {report.status === "Completed" ? (

                          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />

                        ) : (

                          <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" />

                        )}

                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">

                          <h2 className="text-xl sm:text-2xl font-semibold">
                            {report.title}
                          </h2>

                          <span
                            className={`px-4 py-1 rounded-full text-sm border w-fit ${
                              report.status === "Completed"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            }`}
                          >

                            {report.status}

                          </span>

                        </div>

                        <p className="text-gray-400 leading-7 text-sm sm:text-base">
                          AI-generated engineering insights and repository analysis successfully processed from PRLens backend services.
                        </p>

                      </div>

                    </div>

                    <button className="h-12 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-medium flex items-center justify-center gap-3 w-full sm:w-fit">

                      <Download className="w-5 h-5" />

                      Download Report

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </PageTransition>
  );
};

export default Reports;