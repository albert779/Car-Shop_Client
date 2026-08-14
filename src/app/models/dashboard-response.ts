export interface DashboardResponse {
  success: boolean;
  message?: string;
  data: {
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
  };
}