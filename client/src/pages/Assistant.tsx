import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  GitPullRequest,
} from "lucide-react";

import {
  useState,
} from "react";

import axios from "axios";

import PageTransition from "@/components/PageTransition";

const Assistant = () => {

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    response,
    setResponse,
  ] = useState("");

  const sendMessage = async () => {

    if (!message.trim()) {
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/assistant/chat`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      );

      setResponse(
        res.data.reply
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <PageTransition>

      <div className="min-h-screen bg-black text-white overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <div className="mb-10 sm:mb-12">

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center mb-6">

              <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />

            </div>

            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              AI Assistant
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-7 sm:leading-8">
              Analyze repositories, review pull requests, detect vulnerabilities, and generate engineering insights using AI.
            </p>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <Sparkles className="w-10 h-10 text-orange-400 mb-5" />

              <h2 className="text-2xl font-semibold mb-3">
                AI Insights
              </h2>

              <p className="text-gray-400 leading-7">
                Generate intelligent engineering analysis for repositories and architecture.
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <GitPullRequest className="w-10 h-10 text-blue-400 mb-5" />

              <h2 className="text-2xl font-semibold mb-3">
                PR Reviews
              </h2>

              <p className="text-gray-400 leading-7">
                AI-powered pull request review with engineering best practices.
              </p>

            </div>

            <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

              <ShieldCheck className="w-10 h-10 text-green-400 mb-5" />

              <h2 className="text-2xl font-semibold mb-3">
                Security Analysis
              </h2>

              <p className="text-gray-400 leading-7">
                Detect vulnerabilities and repository security concerns automatically.
              </p>

            </div>

          </div>

          <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 sm:p-6">

            <div className="mb-8">

              <h2 className="text-2xl font-semibold mb-3">
                Ask PRLens AI
              </h2>

              <p className="text-gray-400">
                Chat with the engineering intelligence assistant.
              </p>

            </div>

            <div className="space-y-5">

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Analyze my repository architecture and identify technical debt..."
                className="w-full h-40 rounded-3xl bg-black/20 border border-white/5 p-5 resize-none outline-none focus:border-orange-500 transition-all duration-300 text-sm sm:text-base"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="w-full sm:w-fit h-12 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-medium flex items-center justify-center gap-3 disabled:opacity-50"
              >

                <Send className="w-5 h-5" />

                {loading
                  ? "Generating..."
                  : "Generate AI Response"}

              </button>

              {response && (

                <div className="bg-black/20 border border-white/5 rounded-3xl p-5 sm:p-6 mt-8">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">

                      <Bot className="w-6 h-6 text-orange-400" />

                    </div>

                    <div>

                      <h3 className="text-xl font-semibold">
                        PRLens AI Response
                      </h3>

                      <p className="text-sm text-gray-400">
                        Generated by Groq AI
                      </p>

                    </div>

                  </div>

                  <div className="text-gray-300 leading-8 whitespace-pre-wrap text-sm sm:text-base">
                    {response}
                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </PageTransition>
  );
};

export default Assistant;