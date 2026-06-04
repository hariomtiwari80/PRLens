import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Github,
  GitPullRequest,
  ShieldAlert,
  Sparkles,
  Activity,
  ArrowUpRight,
  Star,
} from "lucide-react";

import PageTransition from "@/components/PageTransition";

interface RepositoryType {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  owner: {
    login: string;
  };
}

interface PullRequestType {
  id: number;
  title: string;
  number: number;
  user: {
    login: string;
  };
}

const Dashboard = () => {
  const [repositories, setRepositories] = useState<RepositoryType[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequestType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const repoResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/repos`,
          {
            withCredentials: true,
          }
          
        );
        

        const uniqueRepos = Array.from(
          new Map(
            repoResponse.data.map((repo: RepositoryType) => [repo.id, repo])
          ).values()
        );

        setRepositories(uniqueRepos);

        if (uniqueRepos.length > 0) {
          const owner = uniqueRepos[0].owner.login;
          const repo = uniqueRepos[0].name;

          const prResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/repos/${owner}/${repo}/pulls`,
            {
              withCredentials: true,
            }
          );

          const uniquePRs = Array.from(
            new Map(
              prResponse.data.map((pr: PullRequestType) => [pr.id, pr])
            ).values()
          );

          setPullRequests(uniquePRs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = useMemo(
    () => [
      {
        icon: Github,
        value: repositories.length,
        label: "Repositories",
        color: "text-orange-400",
      },
      {
        icon: GitPullRequest,
        value: pullRequests.length,
        label: "Open Pull Requests",
        color: "text-blue-400",
      },
      {
        icon: ShieldAlert,
        value: "Active",
        label: "Security Monitoring",
        color: "text-red-400",
      },
      {
        icon: Sparkles,
        value: "AI",
        label: "Engineering Insights",
        color: "text-green-400",
      },
    ],
    [repositories.length, pullRequests.length]
  );

  return (
    <PageTransition>
      <div className="min-h-screen overflow-x-hidden bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Engineering Dashboard
              </h1>

              <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                AI-powered repository intelligence and engineering workflow
                analytics.
              </p>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>

              <span className="text-sm text-gray-400">
                Live GitHub Activity
              </span>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#111113] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 sm:p-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-black/30">
                      <Icon className={`h-7 w-7 ${item.color}`} />
                    </div>

                    <h2 className="break-words text-3xl font-bold tracking-tight sm:text-4xl">
                      {item.value}
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#111113] xl:col-span-2">
              <div className="flex items-center justify-between gap-4 border-b border-white/5 px-5 py-5 sm:px-6">
                <div>
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Repositories
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Connected GitHub repositories.
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
                  <Activity className="h-6 w-6 text-orange-400" />
                </div>
              </div>

              <div className="custom-scroll max-h-[520px] overflow-y-auto px-5 py-5 sm:px-6">
                {loading ? (
                  <div className="space-y-5">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-36 animate-pulse rounded-2xl border border-white/5 bg-black/20"
                      />
                    ))}
                  </div>
                ) : repositories.length > 0 ? (
                  <div className="space-y-5">
                    {repositories.map((repo) => (
                      <a
                        key={repo.id}
                        href={`https://github.com/${repo.owner.login}/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-2xl border border-white/5 bg-black/20 p-5 transition-all duration-300 hover:border-white/10 hover:bg-black/30"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="mb-3 flex items-start gap-3">
                              <h3 className="truncate text-lg font-semibold sm:text-xl">
                                {repo.name}
                              </h3>

                              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </div>

                            <p className="mb-5 break-words text-sm leading-7 text-gray-400 sm:text-[15px]">
                              {repo.description ||
                                "No repository description available."}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-orange-400"></div>

                                <span className="break-all">
                                  {repo.language || "Unknown"}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4" />

                                {repo.stargazers_count}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 text-xs text-gray-500 sm:text-sm">
                            Updated{" "}
                            {new Date(
                              repo.updated_at
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                <div className="flex h-full min-h-[380px] items-center justify-center rounded-2xl border border-white/5 bg-black/20 p-6 text-center text-sm text-gray-400">
                  No open pull requests found.
                </div>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#111113]">
              <div className="border-b border-white/5 px-5 py-5 sm:px-6">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Open Pull Requests
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Active engineering reviews.
                </p>
              </div>

              <div className="custom-scroll max-h-[720px] overflow-y-auto px-5 py-5 sm:px-6">
                {loading ? (
                  <div className="space-y-5">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-28 animate-pulse rounded-2xl border border-white/5 bg-black/20"
                      />
                    ))}
                  </div>
                ) : pullRequests.length > 0 ? (
                  <div className="space-y-5">
                    {pullRequests.map((pr) => (
                      <div
                        key={pr.id}
                        className="rounded-2xl border border-white/5 bg-black/20 p-5 transition-all duration-300 hover:border-white/10 hover:bg-black/30"
                      >
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <h3 className="line-clamp-3 break-words text-sm font-semibold leading-7 sm:text-base">
                            {pr.title}
                          </h3>

                          <span className="shrink-0 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-medium tracking-wide text-green-400 sm:text-xs">
                            OPEN
                          </span>
                        </div>

                        <p className="break-all text-sm text-gray-400">
                          #{pr.number} opened by {pr.user.login}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/5 bg-black/20 p-6 text-sm text-gray-400">
                    No open pull requests found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }

            .custom-scroll::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scroll::-webkit-scrollbar-thumb {
              background: rgba(255,255,255,0.12);
              border-radius: 999px;
            }

            .custom-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(255,255,255,0.22);
            }
          `}
        </style>
      </div>
    </PageTransition>
  );
};

export default Dashboard;