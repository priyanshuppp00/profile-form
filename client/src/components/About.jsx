import React from "react";

export default function About() {
  return (
    <div className="min-h-screen px-6 py-12 text-gray-800 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold text-indigo-700">About Me</h2>

        <p className="mb-6 text-lg leading-relaxed">
          Hi, I'm <span className="font-semibold">Priyanshu Kumar Gangwar</span>{" "}
          from Bareilly. I hold a Master's degree in Computer Applications from
          Galgotias University and a Bachelor's degree from Bareilly College.
        </p>

        <p className="mb-6 text-lg leading-relaxed">
          I’m passionate about{" "}
          <span className="font-medium text-indigo-700">
            full-stack web development
          </span>{" "}
          and have hands-on experience in building projects using{" "}
          <span className="font-medium">
            React (Vite), Tailwind CSS, Node.js, and MongoDB
          </span>
          . I’ve worked on several projects, including:
        </p>

        <div className="mb-8 space-y-4 text-left">
          <div>
            <h3 className="text-xl font-semibold text-indigo-600">
              EMS-Kitchen 🍽️
            </h3>
            <p>A food delivery web app with real-time order tracking.</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a
                href="https://ems-kitchin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Live Demo
              </a>
              <a
                href="https://github.com/priyanshuppp00/ems-kitchin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-600 rounded hover:bg-indigo-100"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <p className="mb-6 text-lg leading-relaxed">
          In my free time, I enjoy watching movies, playing cricket, going on
          adventure trips, and learning new things. I aspire to become a skilled
          software developer and contribute to meaningful products.
        </p>

        <p className="text-lg font-semibold text-indigo-600">
          Let’s build something amazing together!
        </p>

        <div className="mt-6">
          <a
            href="http://priyanshuppp00.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 mt-4 text-white transition bg-indigo-700 rounded-lg hover:bg-indigo-800"
          >
            Visit My Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
