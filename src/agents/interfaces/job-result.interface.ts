export interface JobResult {
  success: boolean;
  message?: string;
  data?: any;
  errorDetails?: string;
  anomalies?: string[];
}
