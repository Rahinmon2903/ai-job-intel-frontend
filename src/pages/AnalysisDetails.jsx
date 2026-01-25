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
      <div className="min-h-screen bg-black text-white px-10 py-20">
        <p className="text-sm text-neutral-500">Loading analysis…</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-black text-white px-10 py-20">
        <p className="text-sm text-neutral-500">Analysis not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-10 py-14 max-w-4xl">
      <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
        Analysis Detail
      </p>

      <h1 className="mt-4 text-4xl font-medium">
        {analysis.matchScore}% Match
      </h1>

      <p className="mt-2 text-sm text-neutral-400">
        {analysis.verdict}
      </p>

      <div className="mt-10 border-t border-neutral-800 pt-6">
        <h2 className="text-sm font-medium text-neutral-400 mb-4">
          Missing Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {analysis.missingSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm border border-neutral-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
