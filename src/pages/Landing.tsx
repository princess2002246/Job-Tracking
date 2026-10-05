import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function Landing() {
  return (
    <div className="landing-page">
      <Navbar />

      <main className="landing-content">
        <section className="landing-hero">
          <div className="landing-text">
            <p className="landing-eyebrow">SMART JOB APPLICATION TRACKING</p>

            <h1>
              Take control of your
              <span> job search.</span>
            </h1>

            <p className="landing-description">
              JobTrack helps you keep track of your job applications,
              interviews, statuses and important application details
              all in one simple place.
            </p>

            <div className="landing-actions">
              <Link to="/register" className="landing-primary-button">
                Get Started
              </Link>

              <Link to="/login" className="landing-secondary-button">
                Login
              </Link>
            </div>
          </div>

          <div className="landing-card">
            <div className="landing-card-header">
              <div>
                <p>Application Overview</p>
                <h2>My Applications</h2>
              </div>

              <span className="landing-card-icon">JT</span>
            </div>

            <div className="landing-stat">
              <div>
                <span className="landing-stat-label">Applications</span>
                <strong>12</strong>
              </div>

              <span className="status-badge status-applied">
                Applied
              </span>
            </div>

            <div className="landing-stat">
              <div>
                <span className="landing-stat-label">Interviews</span>
                <strong>3</strong>
              </div>

              <span className="status-badge status-interviewed">
                Interviewed
              </span>
            </div>

            <div className="landing-stat">
              <div>
                <span className="landing-stat-label">Rejected</span>
                <strong>2</strong>
              </div>

              <span className="status-badge status-rejected">
                Rejected
              </span>
            </div>
          </div>
        </section>

        <section className="landing-features">
          <div className="feature-item">
            <h3>Track Applications</h3>
            <p>
              Keep all your job applications organised and easy to find.
            </p>
          </div>

          <div className="feature-item">
            <h3>Monitor Progress</h3>
            <p>
              See whether an application is applied, interviewed or rejected.
            </p>
          </div>

          <div className="feature-item">
            <h3>Stay Organised</h3>
            <p>
              Store important job details and duties in one convenient place.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;