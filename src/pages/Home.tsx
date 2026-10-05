import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getJobs } from "../services/api";
import type { Job } from "../types/Job";

function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "All";
  const sortOrder = searchParams.get("sort") || "desc";

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }

    setSearchParams(newParams);
  };

  const handleStatusFilter = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "All") {
      newParams.delete("status");
    } else {
      newParams.set("status", value);
    }

    setSearchParams(newParams);
  };

  const handleSort = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "desc") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", value);
    }

    setSearchParams(newParams);
  };

  const filteredJobs = jobs
    .filter((job) => {
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        job.companyName.toLowerCase().includes(search) ||
        job.role.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();

      if (sortOrder === "asc") {
        return dateA - dateB;
      }

      return dateB - dateA;
    });

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
      <div className="home-container">
        <main className="home-content">
          <div className="loading-message">
            Loading applications...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="app-header">
        <div className="app-logo">
          Job<span>Tracker</span>
        </div>

        <nav className="header-actions">
          <Link to="/home" className="header-link">
            Applications
          </Link>

          <Link to="/jobs/add" className="header-link">
            Add Job
          </Link>

          <button
            type="button"
            className="logout-button"
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to logout?"
              );

              if (!confirmed) {
                return;
              }

              localStorage.removeItem("isAuthenticated");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="home-content">
        <div className="page-heading">
          <h1>My Job Applications</h1>

          <p>
            Keep track of your applications, interviews and job opportunities.
          </p>
        </div>

        <Link to="/jobs/add" className="add-job-button">
          + Add Job Application
        </Link>

        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="search">
              Search applications
            </label>

            <input
              type="text"
              id="search"
              className="search-input"
              value={searchQuery}
              onChange={(event) =>
                handleSearch(event.target.value)
              }
              placeholder="Search by company or role..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="status">
              Filter by status
            </label>

            <select
              id="status"
              className="filter-select"
              value={statusFilter}
              onChange={(event) =>
                handleStatusFilter(event.target.value)
              }
            >
              <option value="All">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">
              Sort by date
            </label>

            <select
              id="sort"
              className="filter-select"
              value={sortOrder}
              onChange={(event) =>
                handleSort(event.target.value)
              }
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="empty-message">
            No matching job applications found.
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-card-header">
                  <div>
                    <h2 className="company-name">
                      {job.companyName}
                    </h2>

                    <p className="job-role">
                      {job.role}
                    </p>
                  </div>

                  <span className={getStatusClass(job.status)}>
                    {job.status}
                  </span>
                </div>

                <div className="job-info">
                  <p>
                    <strong>Date Applied:</strong>{" "}
                    {job.dateApplied}
                  </p>
                </div>

                <Link
                  to={`/jobs/${job.id}`}
                  className="view-details"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;