import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { JobStatus } from "../types/Job";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [jobDuties, setJobDuties] = useState("");
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

        const job = await response.json();

        setCompanyName(job.companyName);
        setRole(job.role);
        setStatus(job.status);
        setDateApplied(job.dateApplied);
        setJobDuties(job.jobDuties);
      } catch (error) {
        console.error("Failed to load job:", error);
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !companyName ||
      !role ||
      !status ||
      !dateApplied ||
      !jobDuties
    ) {
      alert("Please complete all fields.");
      return;
    }

    const updatedJob = {
      companyName,
      role,
      status,
      dateApplied,
      jobDuties,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/jobs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedJob),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      alert("Job application updated successfully.");

      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error("Failed to update job:", error);
      alert("Something went wrong. Please try again.");
    }
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

        <main className="form-content">
          <div className="loading-message">
            Loading job...
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

      <main className="form-content">
        <div className="form-heading">
          <Link
            to={`/jobs/${id}`}
            className="back-link"
          >
            ← Back to job details
          </Link>

          <h1>Edit Job Application</h1>

          <p>
            Update the information for this job application.
          </p>
        </div>

        <form className="job-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Application Details</h2>

            <p className="form-section-description">
              Update the company, position, status and application date.
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="companyName">
                  Company Name
                </label>

                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(event) =>
                    setCompanyName(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">
                  Job Role
                </label>

                <input
                  type="text"
                  id="role"
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  Application Status
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as JobStatus
                    )
                  }
                >
                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Interviewed">
                    Interviewed
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dateApplied">
                  Date Applied
                </label>

                <input
                  type="date"
                  id="dateApplied"
                  value={dateApplied}
                  onChange={(event) =>
                    setDateApplied(event.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Job Duties</h2>

            <p className="form-section-description">
              Update the main duties or responsibilities for the position.
            </p>

            <div className="form-group">
              <label htmlFor="jobDuties">
                Job Duties
              </label>

              <textarea
                id="jobDuties"
                value={jobDuties}
                onChange={(event) =>
                  setJobDuties(event.target.value)
                }
                rows={6}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate(`/jobs/${id}`)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditJob;