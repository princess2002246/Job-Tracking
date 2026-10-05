import type { Job } from "../types/Job";

const API_URL = "http://localhost:3000";

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(`${API_URL}/jobs`);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
}