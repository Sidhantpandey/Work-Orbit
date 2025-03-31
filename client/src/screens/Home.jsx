import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../components/Loader/Loader.css";
import Navbar from "./Navbar.jsx";
import { FiZap } from "react-icons/fi";
import {
  FaDiscord,
  FaGithub,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import Testimonals from "./Testimonals.jsx";

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

  const fullText = "Build dreams Lead boldly Inspire ";
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
    <main className="min-h-screen bg-white text-gray-900 px-6 pt-4">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mt-24 mb-16">
        <p className="text-3xl text-gray-700">Welcome</p>
        <h1 className="text-5xl sm:text-6xl font-bold mt-4 h-20 text-indigo-900">
          {displayText}
          <span className="border-r-2 border-indigo-00 animate-pulse ml-1" />
        </h1>
        <p className="text-2xl mt-4 text-gray-700">
          Hello,{" "}
          <span className="font-semibold text-indigo-900">
            {user?.name?.split(" ")[0]}
          </span>{" "}
          👋
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-900 text-white px-6 py-2 rounded-lg shadow"
          >
            Create Project
          </button>
          <button
            onClick={() => navigate("/update")}
            className="border border-indigo-800 text-indigo-900 px-6 py-2 rounded-lg hover:bg-indigo-100"
          >
            Update Profile
          </button>
          <button
            onClick={logout}
            className="border border-red-800 text-red-800 px-6 py-2 rounded-lg hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </section>

      {/* Projects List */}
      <section className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 mb-20">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate("/project", { state: { project } })}
              className="cursor-pointer p-6 bg-gray-200 border-2 hover:shadow-xl transition rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-800">
                {project.users.length} collaborators
              </p>
            </div>
          ))
        )}
      </section>

      <section className="bg-white text-gray-900 py-20 px-6 rounded-2xl shadow-inner mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Side */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-extrabold mb-4">
              Lorem, ipsum dolor.{" "}
              <span className="text-teal-600">Lorem ipsum dolor sit.</span>
            </h2>
            <p className="text-lg text-gray-700 mb-2">
         Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
            <p className="text-sm text-gray-500">
             Lorem ipsum dolor sit amet.
            </p>
          </div>

          {/* Zap Icon & Line */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="text-teal-600 bg-teal-100 p-2 rounded-full shadow-md">
              <FiZap size={25} />
            </div>
            <div className="w-px h-32 bg-gradient-to-b from-teal-500 to-transparent mt-1" />
          </div>

          {/* Visual Side */}
          <div className="md:w-1/2 bg-gray-100 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-600">
               lorem <span className="text-black font-bold">12</span>
              </div>
              <div className="text-gray-600">
              lorem <span className="text-black font-bold">3</span> of 12
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 px-3 py-1 text-sm text-white rounded">
               lorem
              </button>
            </div>

            <div className="h-28 bg-white border rounded mb-6 shadow-sm" />

            <div className="flex justify-center items-end gap-6">
              <div className="bg-teal-500 w-16 h-8 rounded-t-full relative">
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal-300 rounded-full animate-ping" />
              </div>
              <div className="bg-teal-300 w-16 h-10 rounded-t-full relative">
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal-100 rounded-full animate-ping" />
              </div>
              <div className="bg-blue-300 w-16 h-12 rounded-t-full" />
            </div>
          </div>
        </div>
      </section>



      <section className="bg-white text-gray-900 py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10 md:gap-16">
          {/* Left: Code Block */}
          <div className="w-full md:w-1/2">
            <div className="inline-block mb-4 px-3 py-1 rounded-md border border-teal-500 text-sm text-teal-600 bg-teal-50">
              button
            </div>
            <div className="bg-gray-100 text-sm p-4 rounded-lg border border-gray-300 font-mono relative">
              <pre className="whitespace-pre-wrap text-gray-800">
                {`code
                
                
                
                
                
                
                                
code`}
              </pre>
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() =>
                  navigator.clipboard.writeText(`await prisma.user.findMany({
  where: { published: true },
  cacheStrategy: {
    ttl: 60,
    swr: 60
  }
});`)
                }
              >
                📋
              </button>
            </div>
          </div>

          {/* Center Divider */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="text-teal-600 bg-teal-100 p-2 rounded-full shadow-md">
              <FiZap size={20} />
            </div>
            <div className="w-px h-32 bg-gradient-to-b from-teal-500 to-transparent mt-1" />
          </div>

          {/* Right: Text Content */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nam?
            </p>
            <p className="text-gray-700">
              <a
                href="#"
                className="text-teal-600 underline hover:text-teal-800"
              >
                Lorem, ipsum.
              </a>{" "}
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, beatae!
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-900 py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10 md:gap-16">
          {/* Right: Text Content */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
Lorem ipsum dolor sit amet.            </h2>
            <p className="text-gray-700">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, unde?
            </p>
            <p className="text-gray-700">
              <a
                href="#"
                className="text-teal-600 underline hover:text-teal-800"
              >
               Lorem, ipsum.
              </a>{" "}
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, eos.
            </p>
          </div>

          {/* Center Divider */}

          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="text-teal-600 bg-teal-100 p-2 rounded-full shadow-md">
              <FiZap size={20} />
            </div>
            <div className="w-px h-32 bg-gradient-to-b from-teal-500 to-transparent mt-1" />
          </div>

          {/* Left: Code Block */}
          <div className="w-full md:w-1/2">
            <div className="inline-block mb-4 px-3 py-1 rounded-md border border-teal-500 text-sm text-teal-600 bg-teal-50">
button            </div>
            <div className="bg-gray-100 text-sm p-4 rounded-lg border border-gray-300 font-mono relative">
              <pre className="whitespace-pre-wrap text-gray-800">
                {`<code>
                
                
                
                
</code>`}
              </pre>
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() =>
                  navigator.clipboard.writeText(`await prisma.user.findMany({
  where: { published: true },
  cacheStrategy: {
    ttl: 60,
    swr: 60
  }
});`)
                }
              >
                📋
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white py-6 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-16">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.name}
              className="h-20  opacity-85 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
      <Testimonals />
      <footer className="bg-gray-100 text-gray-800 px-6 py-12 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Top Call to Action */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Ready to try It ?</h2>
            <p className="text-gray-600">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, minus.            </p>
            <button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium transition">
              Get Started now →
            </button>
          </div>

          {/* Links Grid */}
          <div className="flex flex-col md:flex-row justify-between mt-12 gap-10 text-sm text-gray-600">
            <div className="flex flex-col gap-4">
              <h4 className="text-gray-900 font-semibold">PRODUCT</h4>
     
              <a href="#">Optimize</a>
     
              <a href="#">Pricing</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-gray-900 font-semibold">RESOURCES</h4>
              <a href="#">Docs</a>

              <a href="#">Customer stories</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-gray-900 font-semibold">CONTACT US</h4>
              <a href="#">Community</a>
              <a href="#">Support</a>
              <a href="#">Enterprise</a>
              <a href="#">Partners</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-gray-900 font-semibold">COMPANY</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Data DX ↗</a>
              <a href="#">Careers</a>
              <a href="#">Security & Compliance ↗</a>
              <a href="#">Legal</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-12 flex items-center justify-center gap-6 text-xl text-gray-600">
            <FaDiscord />
            <FaXTwitter />
            <FaYoutube />
            <FaWhatsapp />
            <FaGithub />
          </div>

          {/* Copyright */}
          <p className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} – All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
          <div className="bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter project name"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Create
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
