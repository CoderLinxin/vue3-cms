// 使用到列表数据的页面名称
export type PageNameType = 'users' | 'role'

// 列表数据接口（与 PageNameType 一一对应）
export type ListUrl = '/users/list' | '/role/list' | undefined

// 请求（用户/角色）列表数据应携带的 payload
export interface IPageListPayload {
  pageName: PageNameType, // 根据 pageName 可以生成对应的 url
  queryInfo: any
}

// 用户数据模型
export interface IUserList {
  id: number;
  name: string;
  realname: string;
  cellphone: any;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: Date;
  updateAt: Date;
}

// 用户列表接口返回的数据类型
export interface IUserListType {
  list: IUserList[];
  totalCount: number;
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

export interface MenuList {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: Child[];
}

// 角色数据模型
export interface IRole {
  id: number;
  name: string;
  intro: string;
  createAt: Date;
  updateAt: Date;
  menuList: MenuList[];
}

// 角色列表接口返回的数据类型
export interface IRoleList {
  list: IRole[];
  totalCount: number;
}


