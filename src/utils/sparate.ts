import { separateFunc } from "../type"

const separate: separateFunc = (s) => {
  return s.split('=')
}

export default separate