import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [insights, setInsights] = useState([]);

  const uploadResume = async () => {
    const res = await api.post("/resumes", { resumeText });
    setResumeId(res.data.resume._id);
  };

  const createJob = async () => {
    const res = await api.post("/jobs", { jobText });
    setJobId(res.data.job._id);
  };

  const analyzeMatch = async () => {
    const res = await api.post("/analyze", {
      resumeId,
      jobId
    });
    setAnalysis(res.data.analysis);
    fetchInsights();
  };

  const fetchInsights = async () => {
    const res = await api.get("/insights");
    setInsights(res.data);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>AI Job Application Intelligence</h2>

      {/* Resume Section */}
      <section>
        <h3>Resume</h3>
        <textarea
          rows={5}
          value={resumeText}
          onChange={e => setResumeText(e.target.value)}
        />
        <br />
        <button onClick={uploadResume}>Upload Resume</button>
      </section>

      <hr />

      {/* Job Section */}
      <section>
        <h3>Job Description</h3>
        <textarea
          rows={5}
          value={jobText}
          onChange={e => setJobText(e.target.value)}
        />
        <br />
        <button onClick={createJob}>Add Job</button>
      </section>

      <hr />

      {/* Analyze */}
      <button
        onClick={analyzeMatch}
        disabled={!resumeId || !jobId}
      >
        Analyze Match
      </button>

      {/* Analysis Result */}
      {analysis && (
        <section>
          <h3>Result</h3>
          <p><b>Score:</b> {analysis.matchScore}%</p>
          <p><b>Status:</b> {analysis.verdict}</p>
          <p>{analysis.explanation}</p>

          <h4>Missing Skills</h4>
          <ul>
            {analysis.missingSkills.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      <hr />

      {/* Insights */}
      <section>
        <h3>Insights</h3>
        <ul>
          {insights.map(i => (
            <li key={i._id}>
              {i.skill} — mentioned {i.frequency} times
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
