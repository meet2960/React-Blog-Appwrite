import conf from '@/conf/conf'
import { applicationModeObj } from '@/entites/ApplicationMode'
export default class LogHelper {
  private static isLoggingEnabled = conf.applicationMode === applicationModeObj.DEVLOPEMENT

  static log(description: string, data?: any) {
    if (this.isLoggingEnabled) {
      console.log(description, data)
    }
  }

  static info(description: string, data?: any) {
    if (this.isLoggingEnabled) {
      console.info(description, data)
    }
  }

  static warn(description: string, data?: any) {
    if (this.isLoggingEnabled) {
      console.warn(description, data)
    }
  }

  static error(description: string, data?: any) {
    if (this.isLoggingEnabled) {
      console.error(description, data)
    }
  }

  static debug(description: string, data?: any) {
    if (this.isLoggingEnabled) {
      console.debug(description, data)
    }
  }

  static table(description: string, data?: any) {
    if (this.isLoggingEnabled) {
      console.log(description)
      console.table(data)
    }
  }
}
