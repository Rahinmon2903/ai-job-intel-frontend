import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import ScoreTrendChart from "../components/ScoreTrendChart";

export default function AnalysisHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/analysis/history");
        setHistory(res.data || []);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white w-full">
      <header className="px-10 py-10 border-b border-neutral-800">
        <p className="text-xs tracking-[0.35em] text-neutral-500 uppercase">
          Resume Intelligence
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          Analysis History
        </h1>
      </header>

      <main className="px-10 py-14 max-w-5xl">
        {loading && (
          <p className="text-sm text-neutral-500">Loading analysis history…</p>
        )}

        {!loading && history.length === 0 && (
          <p className="text-sm text-neutral-500 mt-16">
            No analysis history yet.
          </p>
        )}

        {history.length > 1 && (
          <div className="mb-16 max-w-4xl">
            <ScoreTrendChart data={history} />
          </div>
        )}

        {!loading && history.length > 0 && (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/history/${item._id}`)}
                className="border border-neutral-800 px-6 py-5 flex items-center justify-between
                           cursor-pointer hover:border-neutral-600 transition"
              >
                {/* LEFT */}
                <div>
                  <p className="text-sm font-medium">Resume vs Job Match</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Score</p>
                    <p className="text-2xl font-medium">{item.matchScore}%</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Status</p>
                    <p className="text-sm">{item.verdict}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
