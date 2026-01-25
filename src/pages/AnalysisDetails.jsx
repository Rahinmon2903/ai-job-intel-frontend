import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function AnalysisDetail() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await api.get(`/analysis/${id}`);
        setAnalysis(res.data);
      } catch {
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-sm text-neutral-500">Loading analysis…</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-sm text-neutral-500">Analysis not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* HEADER */}
      <header className="px-10 py-10 border-b border-neutral-800">
        <p className="text-xs tracking-[0.35em] text-neutral-500 uppercase">
          Analysis Report
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          Resume ↔ Job Match
        </h1>
      </header>

      {/* CONTENT */}
      <main className="px-10 py-16 max-w-6xl">
        {/* SCORE BLOCK */}
        <section className="border border-neutral-800 rounded-xl p-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                Match Score
              </p>
              <h2 className="mt-4 text-7xl font-medium">
                {analysis.matchScore}%
              </h2>
              <p className="mt-3 text-sm text-neutral-400">
                {analysis.verdict}
              </p>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full lg:w-1/2">
              <div className="h-1 w-full bg-neutral-800">
                <div
                  className="h-1 bg-white transition-all"
                  style={{ width: `${analysis.matchScore}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* MISSING SKILLS */}
        <section className="mt-16">
          <h3 className="text-sm font-medium text-neutral-400 mb-6">
            Missing Skills
          </h3>

          {analysis.missingSkills.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No critical skill gaps detected for this role.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {analysis.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm border border-neutral-700 rounded-md
                             hover:border-neutral-500 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

