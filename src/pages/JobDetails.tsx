import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Job } from "../types/Job";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJob() {
      try {
        const response = await fetch(
          `http://localhost:3000/jobs/${id}`
        );

        if (!response.ok) {
          throw new Error("Job not found");
        }

        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Failed to load job:", error);
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/jobs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      alert("Job application deleted successfully.");

      window.location.href = "/home";
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const getStatusClass = (status: string) => {
    if (status === "Rejected") {
      return "status-badge status-rejected";
    }

    if (status === "Interviewed") {
      return "status-badge status-interviewed";
    }

    return "status-badge status-applied";
  };

  if (loading) {
    return (
      <div className="form-page">
        <header className="app-header">
          <Link to="/home" className="app-logo">
            Job<span>Tracker</span>
          </Link>

          <Link to="/home" className="header-link">
            Applications
          </Link>
        </header>

        <main className="details-content">
          <div className="loading-message">
            Loading job details...
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="form-page">
        <header className="app-header">
          <Link to="/home" className="app-logo">
            Job<span>Tracker</span>
          </Link>

          <Link to="/home" className="header-link">
            Applications
          </Link>
        </header>

        <main className="details-content">
          <div className="not-found-card">
            <h1>Job Not Found</h1>

            <p>
              We could not find this job application.
            </p>

            <Link to="/home" className="primary-button">
              Back to Applications
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="form-page">
      <header className="app-header">
        <Link to="/home" className="app-logo">
          Job<span>Tracker</span>
        </Link>

        <Link to="/home" className="header-link">
          Applications
        </Link>
      </header>

      <main className="details-content">
        <div className="details-heading">
          <Link to="/home" className="back-link">
            ← Back to applications
          </Link>

          <h1>Job Application Details</h1>

          <p>
            View the information and current status of this application.
          </p>
        </div>

        <section className="details-card">
          <div className="details-card-header">
            <div>
              <h2>{job.companyName}</h2>
              <p>{job.role}</p>
            </div>

            <span className={getStatusClass(job.status)}>
              {job.status}
            </span>
          </div>

          <div className="details-divider" />

          <div className="details-grid">
            <div className="details-item">
              <span className="details-label">
                Company Name
              </span>

              <strong>{job.companyName}</strong>
            </div>

            <div className="details-item">
              <span className="details-label">
                Job Role
              </span>

              <strong>{job.role}</strong>
            </div>

            <div className="details-item">
              <span className="details-label">
                Application Status
              </span>

              <span className={getStatusClass(job.status)}>
                {job.status}
              </span>
            </div>

            <div className="details-item">
              <span className="details-label">
                Date Applied
              </span>

              <strong>{job.dateApplied}</strong>
            </div>
          </div>

          <div className="details-divider" />

          <div className="duties-section">
            <h3>Job Duties</h3>

            <p>{job.jobDuties}</p>
          </div>

          <div className="details-actions">
            <Link
              to={`/jobs/${id}/edit`}
              className="primary-button"
            >
              Edit Job
            </Link>

            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete Job
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default JobDetails;