import { useEffect, useState } from "react";
import api from "../api/api";

export default function SkillGapOverview() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/insights");
        setSkills(res.data || []);
      } catch {
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* HEADER */}
      <header className="px-10 py-10 border-b border-neutral-800">
        <p className="text-xs tracking-[0.35em] text-neutral-500 uppercase">
          Resume Intelligence
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          Skill Gap Overview
        </h1>
        <p className="mt-2 text-sm text-neutral-400 max-w-xl">
          Identify the skills that most frequently block your resume
          from matching target job descriptions.
        </p>
      </header>

      {/* CONTENT */}
      <main className="px-10 py-14 max-w-6xl">
        {loading && (
          <p className="text-sm text-neutral-500">
            Analyzing recurring skill gaps…
          </p>
        )}

        {!loading && skills.length === 0 && (
          <div className="mt-20 text-sm text-neutral-500 max-w-md">
            No skill gaps identified yet.  
            Run multiple job analyses to surface recurring gaps.
          </div>
        )}

        {!loading && skills.length > 0 && (
          <>
            {/* SUMMARY */}
            <div className="mb-14">
              <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                Summary
              </p>
              <p className="mt-3 text-lg">
                {skills.length} recurring skill gaps detected
              </p>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-12 gap-6 pb-4 border-b border-neutral-800 text-xs text-neutral-500 uppercase">
              <div className="col-span-6">Skill</div>
              <div className="col-span-3">Frequency</div>
              <div className="col-span-3">Priority</div>
            </div>

            {/* ROWS */}
            <div className="divide-y divide-neutral-800">
              {skills.map((skill, index) => {
                const priority =
                  skill.frequency >= 5
                    ? "Critical"
                    : skill.frequency >= 3
                    ? "High"
                    : "Medium";

                return (
                  <div
                    key={skill._id}
                    className="grid grid-cols-12 gap-6 py-6 items-center"
                  >
                    {/* SKILL */}
                    <div className="col-span-6">
                      <p className="text-sm font-medium">
                        {skill.skill}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Appears across multiple job requirements
                      </p>
                    </div>

                    {/* FREQUENCY */}
                    <div className="col-span-3">
                      <p className="text-sm">
                        {skill.frequency} times
                      </p>
                    </div>

                    {/* PRIORITY */}
                    <div className="col-span-3">
                      <span
                        className={`inline-block text-xs px-3 py-1 border ${
                          priority === "Critical"
                            ? "border-red-500/40 text-red-400"
                            : priority === "High"
                            ? "border-yellow-500/40 text-yellow-400"
                            : "border-neutral-600 text-neutral-300"
                        }`}
                      >
                        {priority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
