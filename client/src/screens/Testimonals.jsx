import React from "react";
import { motion } from "framer-motion";

// Dummy testimonials
const testimonials = [
  {
    text: "We adopted Prisma conventions as our standard, and it saves lots of time having from reinventing things ourselves.",
    name: "Yuval Hazaz",
    title: "CEO",
    company: "Amplication",
  },
  {
    text: "The DX of Prisma is just unbeaten. It became my #1 choice for ORM.",
    name: "Jonathan Wilke",
    title: "Frontend Dev",
    company: "Juniqe",
  },
  {
    text: "Prisma helps unify data access from multiple enterprise systems into a single API.",
    name: "Tom Hutchinson",
    title: "Head of Mobile",
    company: "Rapha",
  },
  {
    text: "Prisma Accelerate handled 670,000+ webhooks with zero downtime. Impressive!",
    name: "Harshdeep Singh Hura",
    title: "Shopify App Developer",
    company: "@kinngh",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white py-16 overflow-hidden relative">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What developers say about Us 
      </h2>

      {/* Animation wrapper */}
      <div className="h-[400px] overflow-hidden relative">
        <motion.div
          className="flex flex-col gap-6 animate-slideUp"
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md w-[90%] md:w-[60%] mx-auto"
            >
              <p className="text-gray-700 mb-4 font-medium">“{t.text}”</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-500">
                    {t.title} / {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
