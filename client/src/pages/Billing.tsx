import {
  CreditCard,
  Check,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for personal repositories and learning.",
    features: [
      "3 repositories",
      "Basic AI reviews",
      "PR analysis",
      "Community support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "Advanced AI engineering intelligence for developers.",
    features: [
      "Unlimited repositories",
      "Advanced AI insights",
      "Security center",
      "Analytics dashboard",
      "AI reports",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "Enterprise-grade DevSecOps and engineering analytics.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "SSO authentication",
      "Custom AI workflows",
      "Advanced compliance",
      "Dedicated support",
    ],
    highlight: false,
  },
];

const Billing = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24">

        <div className="text-center mb-16">

          <div className="w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center mx-auto mb-6">

            <CreditCard className="w-10 h-10 text-orange-400" />

          </div>

          <h1 className="text-4xl sm:text-6xl font-bold mb-5">
            Pricing Plans
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-8">
            Flexible pricing for developers, teams, and enterprises
            using AI-powered engineering intelligence.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {plans.map((plan, index) => (

            <div
              key={index}
              className={`rounded-3xl p-8 border transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-orange-500/10 to-black border-orange-500/30 scale-[1.02]"
                  : "bg-[#111113] border-white/5"
              }`}
            >

              <div className="mb-8">

                <div className="flex items-center justify-between mb-5">

                  <h2 className="text-3xl font-bold">
                    {plan.name}
                  </h2>

                  {plan.highlight && (

                    <div className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs flex items-center gap-2">

                      <Sparkles className="w-3 h-3" />

                      Popular

                    </div>

                  )}

                </div>

                <div className="flex items-end gap-2 mb-4">

                  <span className="text-5xl font-bold">
                    {plan.price}
                  </span>

                  <span className="text-gray-400 mb-1">
                    /month
                  </span>

                </div>

                <p className="text-gray-400 leading-7">
                  {plan.description}
                </p>

              </div>

              <div className="space-y-4 mb-10">

                {plan.features.map((feature, idx) => (

                  <div
                    key={idx}
                    className="flex items-center gap-3"
                  >

                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">

                      <Check className="w-4 h-4 text-green-400" />

                    </div>

                    <span className="text-gray-300">
                      {feature}
                    </span>

                  </div>

                ))}

              </div>

              <button
                className={`w-full h-14 rounded-2xl font-semibold transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:opacity-90"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                Choose Plan
              </button>

            </div>

          ))}

        </div>

        <div className="mt-16 bg-[#111113] border border-white/5 rounded-3xl p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div className="flex items-start gap-5">

              <div className="w-16 h-16 rounded-3xl bg-green-500/10 flex items-center justify-center shrink-0">

                <ShieldCheck className="w-8 h-8 text-green-400" />

              </div>

              <div>

                <h2 className="text-3xl font-bold mb-3">
                  Enterprise Security
                </h2>

                <p className="text-gray-400 leading-8 max-w-2xl">
                  PRLens follows secure authentication and AI engineering
                  standards for enterprise-grade repository intelligence.
                </p>

              </div>

            </div>

            <button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:opacity-90 transition-all duration-300">
              Contact Sales
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Billing;