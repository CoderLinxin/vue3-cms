// 一般请求返回的数据类型
export interface IDataType<T = any> {
  code: number,
  data: T
}

// 部门数据模型
export interface IDepartment {
  id: number;
  name: string;
  parentId?: number;
  createAt: Date;
  updateAt: Date;
  leader: string;
}

// 部分接口返回的数据类型
export interface IDepartmentType {
  list: IDepartment[];
  totalCount: number;
}


