import { NextFunction, Request, Response } from 'express'
import CustomError from '../utils/error-handling/custom-error'
import statusCodes from 'http-status-codes'

export default class ValidateReadFilteredByDate {
  static validate (req: Request, _res: Response, next: NextFunction): void {
    const { startDate, endDate, type } = req.query

    if (type !== undefined && type !== 'cash-in' && type !== 'cash-out') {
      throw new CustomError(statusCodes.BAD_REQUEST, 'Invalid type. Type must be \'cash-in\' or \'cash-out\'')
    }

    if (startDate === '' && endDate === '') {
      return next()
    }

    if ((startDate !== '' && endDate === '') || (startDate === '' && endDate !== '')) {
      throw new CustomError(statusCodes.BAD_REQUEST, 'Both startDate and endDate must be informed if filtering by date')
    }

    if (!this._isIsoDate(startDate as string) || !this._isIsoDate(endDate as string)) {
      throw new CustomError(statusCodes.BAD_REQUEST, 'Invalid date format. Should be ISO 8601')
    }

    const startDateTimestamp = new Date(startDate as string).getTime()
    const endDateTimestamp = new Date(endDate as string).getTime()

    if (startDateTimestamp > endDateTimestamp) {
      throw new CustomError(statusCodes.BAD_REQUEST, 'Invalid date range')
    }

    next()
  }

  private static _isIsoDate (date: string): boolean {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) return false
    const d = new Date(date)
    return d instanceof Date && d.toISOString() === date
  }
}
