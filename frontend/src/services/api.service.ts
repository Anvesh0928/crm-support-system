const API_BASE = 'http://localhost:5000/api/v1';

export class ApiService {
  private static getToken(): string | null {
    return localStorage.getItem('token');
  }

  private static getHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  }

  static async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  }

  static async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: this.getHeaders() });
    return res.json();
  }

  static async getLiveAgents() {
    const res = await fetch(`${API_BASE}/agents/live`, { headers: this.getHeaders() });
    return res.json();
  }

  static async updateAgentStatus(status: string, activeCallSid?: string) {
    const res = await fetch(`${API_BASE}/agents/status`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ status, activeCallSid }),
    });
    return res.json();
  }

  static async getCalls(page = 1) {
    const res = await fetch(`${API_BASE}/calls?page=${page}`, { headers: this.getHeaders() });
    return res.json();
  }

  static async handoverCall(exotelCallSid: string) {
    const res = await fetch(`${API_BASE}/calls/handover`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ exotelCallSid }),
    });
    return res.json();
  }

  static async getTickets(status?: string) {
    const url = status ? `${API_BASE}/tickets?status=${status}` : `${API_BASE}/tickets`;
    const res = await fetch(url, { headers: this.getHeaders() });
    return res.json();
  }

  static async createTicket(data: any) {
    const res = await fetch(`${API_BASE}/tickets`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  static async getCustomers() {
    const res = await fetch(`${API_BASE}/customers`, { headers: this.getHeaders() });
    return res.json();
  }
}
