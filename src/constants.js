import moment from "moment"
import { range } from "./functions";

moment.locale('en')

const current_year = new Date().getFullYear()

export const base_address = 'http://localhost:5000'

export const months = moment.monthsShort()
export const max_days = [
    31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
]
export const years = range(current_year-120 , current_year).reverse()

export const check_list_text = [
    'Contains an uppercase character',
    'Contains a lowercase character',
    'Contains a number',
    'Contains a special character',
    'Minimum length of 8'
]