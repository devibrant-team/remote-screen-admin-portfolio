export interface Plan {
  id: number;
  name: string;
  screen_number: number;
  storage: string;
  price: string;
  offer: string;
  plan_time: number;
  is_recommended: number;
  access_num: number;
  created_at: string | null;
  updated_at: string | null;
}
export interface PlanFormData {
  name: string;
  screen_number: number;
  plan_time: number;
  storage: number;
  price: number;
  is_recommended?: boolean;
  offer?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  plan_name: string;
  joined: string;
  screens: Screen[];
}
export interface Screen {
  id: string;
  type: string;
  ratio: string;
  isExtra: boolean;
}

export interface FilterUsersParams {
  plan_id?: string;
  join?: string | null;
  page?: number;
}

export interface FilterUsersResponse {
  users: User[];
  last_page: number;
}
