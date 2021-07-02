import chalk from 'chalk'

const outType = {
  info: chalk.blue('ℹ'),
  success: chalk.green('✔'),
  warning: chalk.yellow('⚠'),
  error: chalk.red('✖')
}

const WARNING = (text: string) => {
  console.log(chalk.yellowBright(`${outType['warning']} [WARN] ${text}`));
}

const ERROR = (text: string) => {
  console.log(chalk.redBright(`${outType['error']} [ERROR] ${text}`));
  process.exit(0)
}

const SUCESS = (text: string) => {
  console.log(chalk.greenBright(`${outType['success']} [SUCESS] ${text}`));
}

export { WARNING, ERROR, SUCESS }