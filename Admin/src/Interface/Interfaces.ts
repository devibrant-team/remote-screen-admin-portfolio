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
export interface CustomPlan {
  id: number;
  type: string;
  price: number;
  quantity: number;
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

export interface AdsFormData {
  media: File;
  media_type:string
  description: string;
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

export interface DashboardOverView {
  Total_users: number;
  Total_Screens: number;
  Total_Income: string;
  Total_storage: string;
}

export interface ScreensOverview {
  success: boolean;
  data: {
    name: string;
    value: number;
  }[];
}

export interface ScreenStatusoverview {
  active: number;
  not_active: number;
}
export interface SinglePlan {
  id: number;
  name: string;
  user_count: number;
}

export interface PlanOverview {
  plans: SinglePlan[];
}
export interface IncomebyPlan {
  id: number;
  name: string;
  user_count: number;
  total_income: number;
}
export interface PlanFilter {
  id: number;
  name: string;
}