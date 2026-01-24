import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [insights, setInsights] = useState([]);

  // ---------------- RESUME (TEXT) ----------------
  const uploadResume = async () => {
    try {
      const res = await api.post("/resumes", { resumeText });
      setResumeId(res.data.resume._id);
      alert("Resume text uploaded successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Resume upload failed");
    }
  };

  // ---------------- RESUME (PDF) ----------------
  const uploadResumePdf = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.post("/resumes/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResumeId(res.data.resume._id);
      alert("PDF resume uploaded successfully");
    } catch (err) {
      alert(err.response?.data?.message || "PDF upload failed");
    }
  };

  // ---------------- JOB ----------------
  const createJob = async () => {
    try {
      const res = await api.post("/jobs", { jobText });
      setJobId(res.data.job._id);
      alert("Job created successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Job creation failed");
    }
  };

  // ---------------- ANALYSIS ----------------
  const analyzeMatch = async () => {
    try {
      const res = await api.post("/analysis", {
        resumeId,
        jobId
      });
      setAnalysis(res.data.analysis);
      fetchInsights();
    } catch (err) {
      alert(err.response?.data?.message || "Analysis failed");
    }
  };

  // ---------------- INSIGHTS ----------------
  const fetchInsights = async () => {
    try {
      const res = await api.get("/insights");
      setInsights(res.data);
    } catch {
      // silent fail
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>AI Job Application Intelligence</h2>

      {/* -------- RESUME -------- */}
      <section>
        <h3>Resume</h3>

        <textarea
          rows={5}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste resume text here"
          style={{ width: "100%" }}
        />

        <br /><br />

        <button onClick={uploadResume}>Upload Resume (Text)</button>

        <br /><br />

        <input type="file" accept=".pdf" onChange={uploadResumePdf} />
      </section>

      <hr />

      {/* -------- JOB -------- */}
      <section>
        <h3>Job Description</h3>

        <textarea
          rows={5}
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder="Paste job description here"
          style={{ width: "100%" }}
        />

        <br /><br />

        <button onClick={createJob}>Add Job</button>
      </section>

      <hr />

      {/* -------- ANALYZE -------- */}
      <button
        onClick={analyzeMatch}
        disabled={!resumeId || !jobId}
      >
        Analyze Match
      </button>

      {/* -------- RESULT -------- */}
      {analysis && (
        <section>
          <hr />
          <h3>Result</h3>

          <p><b>Score:</b> {analysis.matchScore}%</p>
          <p><b>Status:</b> {analysis.verdict}</p>
          <p>{analysis.explanation}</p>

          <h4>Missing Skills</h4>
          <ul>
            {analysis.missingSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      <hr />

      {/* -------- INSIGHTS -------- */}
      <section>
        <h3>Insights</h3>

        <ul>
          {insights.map((i) => (
            <li key={i._id}>
              {i.skill} — mentioned {i.frequency} times
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
