import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const FORMAT_STRING = 'YYYY-MM-DD hh:mm:ss'

// 格式化 UTC 时间
export const formatUTCString = (
  utcString: string,
  formatString: string = FORMAT_STRING,
) => dayjs.utc(utcString).format(formatString)
