import Topbar from "@/components/Topbar";

import {
  LayoutDashboard,
  BarChart3,
  Shield,
  FileText,
  Users,
  Bot,
  CreditCard,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Security",
    path: "/security",
    icon: Shield,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Team",
    path: "/team",
    icon: Users,
  },
  {
    name: "Assistant",
    path: "/assistant",
    icon: Bot,
  },
  {
    name: "Billing",
    path: "/billing",
    icon: CreditCard,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const SidebarLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const location = useLocation();

  const [open, setOpen] = useState(false);

  return (

    <div className="min-h-screen bg-black text-white flex overflow-hidden">

      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[1000] w-12 h-12 rounded-2xl bg-[#111113] border border-white/10 flex items-center justify-center backdrop-blur-xl"
      >

        <Menu className="w-6 h-6" />

      </button>

      {open && (

        <div className="lg:hidden fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md">

          <div className="w-[280px] h-full bg-[#0f0f11] border-r border-white/5 p-6 overflow-y-auto">

            <div className="flex items-center justify-between mb-10">

              <div>

                <h1 className="text-3xl font-bold">
                  PRLens
                </h1>

                <p className="text-gray-400 text-sm mt-2">
                  AI Engineering Platform
                </p>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
              >

                <X className="w-5 h-5" />

              </button>

            </div>

            <div className="space-y-2">

              {links.map((item) => {

                const Icon = item.icon;

                return (

                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`h-14 rounded-2xl px-5 flex items-center gap-4 transition-all duration-300 ${
                      location.pathname === item.path
                        ? "bg-orange-500 text-white"
                        : "hover:bg-white/5 text-gray-300"
                    }`}
                  >

                    <Icon className="w-5 h-5" />

                    <span className="font-medium">
                      {item.name}
                    </span>

                  </Link>

                );
              })}

            </div>

          </div>

        </div>

      )}

      <aside className="hidden lg:flex flex-col w-[280px] border-r border-white/5 bg-[#0f0f11] p-6 sticky top-0 h-screen overflow-y-auto shrink-0">

        <div className="mb-12">

          <h1 className="text-3xl font-bold">
            PRLens
          </h1>

          <p className="text-gray-400 text-sm mt-2 leading-6">
            AI Engineering Intelligence Platform
          </p>

        </div>

        <div className="space-y-2">

          {links.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.path}
                to={item.path}
                className={`h-14 rounded-2xl px-5 flex items-center gap-4 transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >

                <Icon className="w-5 h-5 shrink-0" />

                <span className="font-medium truncate">
                  {item.name}
                </span>

              </Link>

            );
          })}

        </div>

      </aside>

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">

        <Topbar />

        <div className="flex-1 overflow-y-auto">

          {children}

        </div>

      </main>

    </div>
  );
};

export default SidebarLayout;