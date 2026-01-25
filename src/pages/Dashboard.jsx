import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  //  RESUME (TEXT) 
  const uploadResume = async () => {
    try {
      const res = await api.post("/resumes", { resumeText });
      setResumeId(res.data.resume._id);
      alert("Resume uploaded");
    } catch {
      alert("Resume upload failed");
    }
  };

  //RESUME (PDF) 
  const uploadResumePdf = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.post("/resumes/pdf", formData);
      setResumeId(res.data.resume._id);
      alert("PDF uploaded");
    } catch {
      alert("PDF upload failed");
    }
  };

  // JOB 
  const createJob = async () => {
    try {
      const res = await api.post("/jobs", { jobText });
      setJobId(res.data.job._id);
      alert("Job added");
    } catch {
      alert("Job creation failed");
    }
  };

  // -------- ANALYSIS --------
  const analyzeMatch = async () => {
    try {
      const res = await api.post("/analysis", { resumeId, jobId });
      setAnalysis(res.data.analysis);
    } catch {
      alert("Analysis failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* HEADER */}
      <header className="px-10 py-10 border-b border-neutral-800">
        <p className="text-xs tracking-[0.35em] text-neutral-500 uppercase">
          Resume Intelligence
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          Match Dashboard
        </h1>
      </header>

      {/* MAIN */}
      <main className="grid grid-cols-1 xl:grid-cols-3 gap-14 px-10 py-14">
        {/* LEFT — INPUTS */}
        <section className="xl:col-span-2 space-y-14">
          {/* RESUME */}
          <div>
            <h2 className="text-sm font-medium text-neutral-400 mb-3">
              Resume
            </h2>

            <textarea
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste resume text here"
              className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm
                         focus:outline-none focus:border-white"
            />

            <div className="mt-4 flex items-center gap-6">
              <button
                onClick={uploadResume}
                disabled={!resumeText.trim()}
                className="text-sm underline underline-offset-4 hover:text-neutral-300
                           disabled:opacity-40"
              >
                Upload text
              </button>

              <input
                type="file"
                accept=".pdf"
                onChange={uploadResumePdf}
                className="text-sm text-neutral-500"
              />
            </div>
          </div>

          {/* JOB */}
          <div>
            <h2 className="text-sm font-medium text-neutral-400 mb-3">
              Job Description
            </h2>

            <textarea
              rows={6}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste job description here"
              className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm
                         focus:outline-none focus:border-white"
            />

            <button
              onClick={createJob}
              disabled={!jobText.trim()}
              className="mt-4 text-sm underline underline-offset-4 hover:text-neutral-300
                         disabled:opacity-40"
            >
              Add job
            </button>
          </div>

          {/* ANALYZE */}
          <button
            onClick={analyzeMatch}
            disabled={!resumeId || !jobId}
            className="border border-white px-8 py-3 text-sm
                       hover:bg-white hover:text-black transition
                       disabled:opacity-40"
          >
            Analyze match
          </button>
        </section>

        {/* RIGHT — RESULTS */}
        <aside className="space-y-16 xl:sticky xl:top-10 self-start">
          {/* EMPTY STATE */}
          {!analysis && (
            <div className="text-sm text-neutral-500 leading-relaxed">
              Upload a resume and job description to see how well you match
              before applying.
            </div>
          )}

          {/* RESULT */}
          {analysis && (
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                Result
              </p>

              <h2 className="mt-3 text-5xl font-medium">
                {analysis.matchScore}%
              </h2>

              {/* PROGRESS BAR */}
              <div className="mt-4 h-1 w-full bg-neutral-800">
                <div
                  className="h-1 bg-white transition-all"
                  style={{ width: `${analysis.matchScore}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-neutral-400">
                {analysis.verdict}
              </p>

              <div className="mt-8 border-t border-neutral-800 pt-6">
                <h3 className="text-sm font-medium text-neutral-400 mb-4">
                  Missing skills for this job
                </h3>

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

              {/* LINK TO STRATEGIC VIEW */}
              <div className="mt-6">
                <Link
                  to="/skills"
                  className="text-sm text-neutral-500 hover:text-neutral-300 underline underline-offset-4"
                >
                  View long-term skill gaps →
                </Link>
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
