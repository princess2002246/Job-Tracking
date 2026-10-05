import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddJob() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [jobDuties, setJobDuties] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    const newJob = {
      companyName,
      role,
      status,
      dateApplied,
      jobDuties,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      alert("Job application added successfully!");

      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

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
          <Link to="/home" className="back-link">
            ← Back to applications
          </Link>

          <h1>Add Job Application</h1>

          <p>
            Add a new job application to keep track of your job search.
          </p>
        </div>

        <form className="job-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Application Details</h2>

            <p className="form-section-description">
              Enter the basic information about the position you applied for.
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
                  placeholder="e.g. Capitec"
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
                  placeholder="e.g. IT Technician"
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
                    setStatus(event.target.value)
                  }
                >
                  <option value="Applied">Applied</option>

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
              Add the main duties or responsibilities mentioned in the job
              description.
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
                placeholder="Enter the main job duties..."
                rows={6}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Add Job Application
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddJob;