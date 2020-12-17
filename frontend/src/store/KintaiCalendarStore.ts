import { Store } from 'pullstate';
import format from 'date-fns/format';
import startOfMonth from 'date-fns/startOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';

export interface IKintaiCalendar {
  date:Date,
  dateString: string,
  year: string,
  month: string,
  day: string,
  week: string,
  startString: string;
  endString: string;
  status: string;
  startAt: Date|null;
  endAt: Date|null;
  duration: Duration;
}

interface IKintaiCalendarStore {
  [key:string]: IKintaiCalendar
}

const createCalender = (currentDate: Date) => {
  const start = new Date(startOfMonth(subMonths(currentDate, 1)));
  const end = new Date(endOfMonth(addMonths(currentDate, 1)));
  const dateArray: IKintaiCalendar[] = eachDayOfInterval({ start, end }).map(date => {
    return {
      date,
      dateString: format(date,'yyyy-MM-dd'),
      year: format(date, 'yyyy'),
      month: format(date, 'MM'),
      day: format(date, 'dd'),
      week: format(date, 'EEEEEE'),
      startString:'',
      endString: '',
      status: '',
      startAt: null,
      endAt: null,
      duration: {
        days: 0,
        hours: 0,
        minutes: 0,
        months: 0,
        seconds: 0,
        years: 0
      }
    };
  });
  return dateArray;
}

const convertArrayToObject = (arr:IKintaiCalendar[]) => {
  const obj = arr.reduce((result:any, current) => {
    result[current.dateString] = current;
    return result;
  }, {});
  return obj;
}

const dateArray = createCalender(new Date());
const dateObj = convertArrayToObject(dateArray);

export const KintaiCalendarStore = new Store<IKintaiCalendarStore>(dateObj);
