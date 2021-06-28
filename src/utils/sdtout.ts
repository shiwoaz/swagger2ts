import chalk from 'chalk'

enum outType {
  error = "📕",
  warning = "⚠",
  ok = "📗",
}

const WARNING = (text: string) => {
  console.log(chalk.yellowBright(`${outType['warning']} [WARN] ${text}`));
}

const ERROR = (text: string) => {
  console.log(chalk.redBright(`${outType['error']} [ERROR] ${text}`));
  process.exit(0)
}

export { WARNING, ERROR }