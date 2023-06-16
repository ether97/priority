export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export interface Deadline {
  userId: string;
  title: string;
  description?: string;
  priority: Priority;
  date: string;
}
