import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../components/Loader/Loader.css";
import {
  Zap,
  Code,
  Users,
  Star,
  ArrowRight,
  Copy,
  Brain,
  Sparkles,
  Bot,
  Cpu,
  Network,
  Rocket,
  Shield,
  Globe,
  Settings,
  LogOut,
  User,
  Plus,
} from "lucide-react";
import {
  FaDiscord,
  FaGithub,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const logos = [
  {
    name: "Documenso",
    src: "https://imgs.search.brave.com/ermhmmdWusuW9Vc8K-THsACbQdu5kjw6FmeHdfXpPS4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTgv/MDgvMjMxNTU1MTMv/MTg5Mjc1NTAtNzY4/eDU4Mi5wbmc",
  },
  {
    name: "Grover",
    src: "https://imgs.search.brave.com/K2hqemd7-t4wAJVS2qPYSqr6cmv02SYHkL0u-ehZGXY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90ZW1w/bGF0ZS5jYW52YS5j/b20vRUFEbjJ1VWp4/MEUvMi8wLzQwMHct/ZTZ6N2UzbjI3T28u/anBn",
  },
  {
    name: "Formbricks",
    src: "https://imgs.search.brave.com/Tsx5p38kInagWNEeEKwAAKNt7NxrrvnZZembX0ZgCaQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzY4LzI0LzQ0/LzM2MF9GXzU2ODI0/NDQwM19ad1hjdzRR/aFhaQ3o2ZnZOenM0/dnVlRUU0ZVlFM1Fy/Ui5qcGc",
  },
  {
    name: "dub",
    src: "https://imgs.search.brave.com/OqlrME_xxPBRPJ6k63Mrn09pOFNW4oXYZ956bwppPrA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9keW5h/bWljLmJyYW5kY3Jv/d2QuY29tL2Fzc2V0/L2xvZ28vN2VmMjk1/ZjItNTdiMC00N2Qx/LThiMGMtNjIxMjdk/ODA5NjRlL2xvZ28t/c2VhcmNoLWdyaWQt/MXg_bG9nb1RlbXBs/YXRlVmVyc2lvbj0x/JnY9NjM4NTY5ODA2/NjczMDMwMDAw.jpeg",
  },
  {
    name: "kapa",
    src: "https://imgs.search.brave.com/4la5-eURWE1TG4wGou0QRkJa7spNONay1LiTPwdeyLo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/emFybGEuY29tL2lt/YWdlcy96YXJsYS1j/bGVhbi1saW5lcy0x/eDEtMjQwMHgyNDAw/LTIwMjEwOTA4LTN3/bXlkZzN2YmRtazM0/d3loazR5LnBuZz9j/cm9wPTE6MSxzbWFy/dCZ3aWR0aD0yNTAm/ZHByPTI",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser, projects, fetchProjects, loading } =
    useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const fullText = "AI-Powered Project Intelligence ";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const speed = isDeleting ? 40 : 100;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(fullText.substring(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  function logout() {
    axios
      .get("/users/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          navigate("/login");
          toast.success("Logged Out Successfully", { position: "top-right" });
        }
      })
      .catch(() => {
        toast.error("Logout Failed", { position: "top-right" });
      });
  }

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        if (res.status === 201) {
          fetchProjects();
          setIsModalOpen(false);
          setProjectName("");
          toast.success("Project Created Successfully!", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Project Creation Failed!", {
          position: "top-right",
        });
      });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950  to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AI Studio
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/update")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
          >
            <User size={16} />
            <span className="hidden sm:inline">
              {user?.name?.split(" ")[0]}
            </span>
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all duration-300"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="text-center">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 px-6 py-3 rounded-full mb-8">
            <Sparkles size={20} className="text-purple-400 animate-pulse" />
            <span className="text-purple-300 font-medium">
              Powered by Advanced AI
            </span>
            <Bot size={20} className="text-cyan-400 animate-bounce" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 h-24 relative">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-glow">
              {displayText}
            </span>
            <span className="border-r-2 border-cyan-300 animate-pulse ml-1 h-full inline-block align-middle" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
            Welcome back,{" "}
            <span className="text-purple-400 font-semibold">
              {user?.name?.split(" ")[0]}
            </span>
            ! Transform your ideas into reality with our intelligent project
            management platform.
          </p>

          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Harness the power of artificial intelligence to streamline
            workflows, predict outcomes, and accelerate innovation.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={24} />
            Create AI Project
            <Rocket
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
          </button>
        </div>
      </section>

      {/* AI Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Cpu size={24} className="text-purple-400" />
              <span className="text-purple-300 font-medium">
                Active Projects
              </span>
            </div>
            <div className="text-3xl font-bold text-white">
              {projects.length}
            </div>
            <div className="text-purple-200 text-sm">AI-Enhanced</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-500/30 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Network size={24} className="text-cyan-400" />
              <span className="text-cyan-300 font-medium">Team Members</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {projects.reduce((acc, project) => acc + project.users.length, 0)}
            </div>
            <div className="text-cyan-200 text-sm">Connected</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Brain size={24} className="text-green-400" />
              <span className="text-green-300 font-medium">AI Accuracy</span>
            </div>
            <div className="text-3xl font-bold text-white">98.7%</div>
            <div className="text-green-200 text-sm">Prediction Rate</div>
          </div>

          <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm border border-pink-500/30 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Zap size={24} className="text-pink-400" />
              <span className="text-pink-300 font-medium">Automation</span>
            </div>
            <div className="text-3xl font-bold text-white">2.4x</div>
            <div className="text-pink-200 text-sm">Faster Delivery</div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Your AI-Powered Projects
            </span>
          </h2>
          <p className="text-gray-400">
            Intelligent project management with predictive analytics
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project._id}
                onClick={() => navigate("/project", { state: { project } })}
                className={`group cursor-pointer p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                  index % 3 === 0
                    ? "bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:shadow-purple-500/25"
                    : index % 3 === 1
                      ? "bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 hover:shadow-cyan-500/25"
                      : "bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-pink-500/30 hover:shadow-pink-500/25"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      index % 3 === 0
                        ? "bg-purple-500/30"
                        : index % 3 === 1
                          ? "bg-cyan-500/30"
                          : "bg-pink-500/30"
                    }`}
                  >
                    <Bot size={24} className="text-white" />
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-400 group-hover:translate-x-1 transition-transform"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white">
                  {project.name.charAt(0).toUpperCase() + project.name.slice(1)}
                </h3>

                <div className="flex items-center gap-2 text-gray-300 mb-3">
                  <Users size={16} />
                  <span>{project.users.length} collaborators</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span className="text-gray-400">AI-Enhanced</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AI Features Section */}
      <section className="relative z-10 bg-gradient-to-br from-gray-950  to-black backdrop-blur-sm py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Next-Generation AI Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of project management with our advanced
              artificial intelligence capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Predictive Analytics
                  </h3>
                  <p className="text-gray-400">
                    AI analyzes patterns to predict project outcomes, identify
                    risks, and suggest optimizations before issues arise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Smart Automation
                  </h3>
                  <p className="text-gray-400">
                    Intelligent workflows that adapt and optimize themselves,
                    reducing manual work by up to 70%.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Intelligent Insights
                  </h3>
                  <p className="text-gray-400">
                    Real-time AI-powered recommendations and insights to keep
                    your projects on track and ahead of schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Dashboard Mockup */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">AI Dashboard</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center gap-3">
                    <Brain size={16} className="text-purple-400" />
                    <span className="text-white text-sm">
                      Project Success Probability
                    </span>
                  </div>
                  <span className="text-green-400 font-semibold">94%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                  <div className="flex items-center gap-3">
                    <Zap size={16} className="text-cyan-400" />
                    <span className="text-white text-sm">
                      Automation Active
                    </span>
                  </div>
                  <span className="text-cyan-400 font-semibold">12 Tasks</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-pink-500/20 rounded-lg border border-pink-500/30">
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-pink-400" />
                    <span className="text-white text-sm">
                      AI Recommendations
                    </span>
                  </div>
                  <span className="text-pink-400 font-semibold">3 New</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <Bot size={16} className="text-purple-400" />
                  <span className="text-purple-300 text-sm font-medium">
                    AI Assistant
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  "Based on current progress, I recommend allocating 2 more
                  developers to the frontend module to meet the deadline."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Integration Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <Code size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">AI Integration</span>
              </div>
            </div>
            <pre className="text-green-400 text-sm font-mono overflow-x-auto">
              {`// AI-Powered Project Creation
const aiProject = await createProject({
  name: "Smart Analytics Dashboard",
  aiFeatures: {
    predictiveAnalytics: true,
    smartAutomation: true,
    intelligentInsights: true
  },
  team: await ai.suggestOptimalTeam(),
  timeline: ai.predictDeliveryDate()
});

// AI automatically optimizes workflow
ai.optimizeWorkflow(aiProject.id);
console.log("🤖 AI optimization complete!");`}
            </pre>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Bot size={16} className="text-purple-400" />
              <span className="text-purple-300">AI-First Development</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for the AI Era
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Seamlessly integrate artificial intelligence into your development
              workflow with our comprehensive API and SDK.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300">
                  AI-powered code generation and optimization
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span className="text-gray-300">
                  Intelligent testing and quality assurance
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-300">
                  Automated deployment and scaling
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="relative z-10 py-16 mb-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-2">
            Trusted by AI-Forward Companies
          </h3>
          <p className="text-gray-400">
            Join the leaders in AI-powered project management
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-16">
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.name}
                className="h-12 opacity-40 hover:opacity-70 transition grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 bg-gradient-to-br from-gray-950  to-black backdrop-blur-sm py-20 mb-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 px-6 py-3 rounded-full mb-8">
            <Rocket size={20} className="text-purple-400" />
            <span className="text-purple-300 font-medium">
              Ready to Launch?
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transform Your Projects with AI
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of project management. Let artificial
            intelligence accelerate your success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Star size={20} />
              Start AI Project
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300">
              <Globe size={20} />
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Create AI Project
              </h2>
            </div>
            <form onSubmit={createProject} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your AI project name"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-600/50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl hover:from-purple-600 hover:to-cyan-600 transition font-medium"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
