// 登录返回的数据类型
export interface ILoginResult {
  id: number,
  name: string,
  token: string
}

// 用户登录接口返回的数据类型
export interface ILoginResult {
  id: number,
  name: string,
  token: string,
}

export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: Date;
  updateAt: Date;
}

export interface Department {
  id: number;
  name: string;
  parentId?: any;
  createAt: Date;
  updateAt: Date;
  leader: string;
}

// 用户信息类型
export interface IUserInfo {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: Date;
  updateAt: Date;
  role: Role;
  department: Department;
}

export interface Child2 {
  id: number;
  url?: any;
  name: string;
  sort?: any;
  type: number;
  parentId: number;
  permission: string;
}

export interface Child {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children: Child2[];
  parentId: number;
}

export interface IUserMenu {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: Child[];
}

// 用户菜单类型
export type UserMenusType = IUserMenu[]

