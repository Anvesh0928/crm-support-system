import { Socket } from 'socket.io';

export interface AuthenticatedSocketUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'AGENT' | 'SUPERVISOR';
}

export interface AuthenticatedSocket extends Socket {
  user?: AuthenticatedSocketUser;
}
