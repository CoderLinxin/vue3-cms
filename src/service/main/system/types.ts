// 使用到列表数据的页面名称
export type PageNameType = 'users' | 'role' | 'goods' | 'menu'

// 列表数据接口（与 PageNameType 一一对应）
export type ListUrl = '/users/list' | '/role/list' | '/goods/list' | '/menu/list' | undefined

// 请求（用户/角色）列表数据应携带的 payload
export interface IPageListPayload {
  pageName: PageNameType, // 根据 pageName 可以生成对应的 url
  queryInfo: any
}

// 用户数据模型
export interface IUser {
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
  list: IUser[];
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

// 商品数据模型
export interface IGoods {
  id: number;
  name: string;
  oldPrice: string;
  newPrice: string;
  desc: string;
  status: number;
  imgUrl: string;
  inventoryCount: number;
  saleCount: number;
  favorCount: number;
  address: string;
  categoryId: number;
  createAt: Date;
  updateAt: Date;
}

export interface IGoodsList {
  list: IGoods[];
  totalCount: number;
}


export interface IMenuChild2 {
  id: number;
  url?: any;
  name: string;
  sort?: any;
  type: number;
  createAt: string;
  parentId: number;
  updateAt: string;
  permission: string;
}

export interface IMenuChild {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children: IMenuChild2[];
  createAt: string;
  parentId: number;
  updateAt: string;
}

// 菜单数据模型
export interface IMenu {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  createAt: Date;
  updateAt: Date;
  children: IMenuChild[];
}

// 菜单接口返回的数据类型
export interface IMenuList {
  list: IMenu[],
  totalCount: number
}






