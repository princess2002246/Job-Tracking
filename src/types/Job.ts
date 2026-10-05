export type JobStatus = "Applied" | "Interviewed" | "Rejected";

export interface Job {
  id: string;
  companyName: string;
  role: string;
  status: JobStatus;
  dateApplied: string;
  jobDuties: string;
}