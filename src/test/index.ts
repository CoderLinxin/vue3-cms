// 用来描述类类型
interface ClockConstructor {
  new(hour: number, minute: number): any

  contextType: any; // 新增个成员变量
}

function Clock(clockConstructor: ClockConstructor) {
  // new 一个 ClockConstructor 类型的实例
  return new clockConstructor(20, 30)
}

class DigitalClock {
  static contextType: any

  //这边实现的接口不能是直接的构造器
  constructor(hour: number, minute: number) {
    this.hour = hour
    this.minute = minute
  }

  hour: number
  minute: number
}

// 传入 DigitalClock 类作为参数
const clock = Clock(DigitalClock)
console.log(clock) // DigitalClock {hour: 20, minute: 30}，clock 是一个对象
type ClockType = InstanceType<typeof clock> // 不会报错










