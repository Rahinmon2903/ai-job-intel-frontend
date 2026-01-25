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
        <p className="mt-3 text-sm text-neutral-400 max-w-2xl">
          A strategic view of the skills most frequently preventing your resume
          from matching target job descriptions.
        </p>
      </header>

      {/* CONTENT */}
      <main className="px-10 py-16 max-w-7xl">
        {loading && (
          <p className="text-sm text-neutral-500">
            Analyzing recurring skill gaps…
          </p>
        )}

        {!loading && skills.length === 0 && (
          <div className="mt-24 text-sm text-neutral-500 max-w-md">
            No recurring skill gaps identified yet.  
            Run multiple job analyses to surface patterns.
          </div>
        )}

        {!loading && skills.length > 0 && (
          <>
            {/* METRICS */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="border border-neutral-800 rounded-xl p-6">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">
                  Total Gaps
                </p>
                <p className="mt-4 text-3xl font-medium">
                  {skills.length}
                </p>
              </div>

              <div className="border border-neutral-800 rounded-xl p-6">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">
                  Critical Gaps
                </p>
                <p className="mt-4 text-3xl font-medium">
                  {skills.filter(s => s.frequency >= 5).length}
                </p>
              </div>

              <div className="border border-neutral-800 rounded-xl p-6">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">
                  Focus Level
                </p>
                <p className="mt-4 text-sm text-neutral-300">
                  Prioritize high-frequency skills first
                </p>
              </div>
            </section>

            {/* LIST */}
            <section className="space-y-4">
              {skills.map((skill) => {
                const priority =
                  skill.frequency >= 5
                    ? "Critical"
                    : skill.frequency >= 3
                    ? "High"
                    : "Medium";

                return (
                  <div
                    key={skill._id}
                    className="border border-neutral-800 rounded-xl p-6
                               flex items-center justify-between
                               hover:border-neutral-600 transition"
                  >
                    {/* LEFT */}
                    <div>
                      <p className="text-sm font-medium">
                        {skill.skill}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Appears across multiple job requirements
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-xs text-neutral-500">Frequency</p>
                        <p className="text-lg font-medium">
                          {skill.frequency}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-4 py-2 rounded-md border ${
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
            </section>
          </>
        )}
      </main>
    </div>
  );
}

