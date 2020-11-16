import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import KintaiApplyModal from '../components/KintaiApplyModal';
import { InjectStoreState  } from 'pullstate';
import { KintaiCalendarStore } from '../store/KintaiCalendarStore';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import format from 'date-fns/format';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths'; 
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';

function fetchCalendar(currentDate: Date) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const dates = eachDayOfInterval({ start, end });
  const dateArray = dates.map(date => {
    return {
      date,
      year: format(date, 'yyyy'),
      month: format(date, 'MM'),
      day: format(date, 'dd'),
      week: format(date, 'EEEEEE'),
      dateString: format(date,'yyyy-MM-dd'),
    };
  });
  return dateArray;
}

function Works(){
  const [ targetDate, setTargetDate ] = useState(new Date());
  let calendars = fetchCalendar(targetDate);

  const [ showBackButton, setShowBackButton ] = useState(false);
  const [ showNextButton, setShowNextButton ] = useState(true);

  const goBackMonth = () => {
    setTargetDate(currentDate => subMonths(currentDate, 1));
  }

  const goNextMonth = () => {
    setTargetDate(currentDate => addMonths(currentDate, 1));
  }

  const [ modalShow, setModalShow ] = useState(false);
  const [ selectDate, setSelectDate ] = useState({
    date: null,
    year: '',
    month: '',
    day: '',
    week: '',
    dateString: ''
  });

  const openModal = (date:any) => {
    setSelectDate(date);
    setModalShow(true);
  }

  const tableToExcel = () => {
    const tableName = 'kintaitable';
    const tableElement = document.getElementById(tableName);
    const wb = XLSX.utils.table_to_book(tableElement);
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== wbout.length; ++i) {
      view[i] = wbout.charCodeAt(i) & 0xFF;
    }
    const fileName = format(targetDate, 'y年M月度勤怠');
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
  }
  
  useEffect(() => {
    if(!targetDate) return;
    calendars = fetchCalendar(targetDate);
    
    const difference = differenceInCalendarMonths(targetDate, new Date());
    if (difference < 0) {
      setShowBackButton(false);
    } else {
      setShowBackButton(true);
    }

    if (difference > 0) {
      setShowNextButton(false);
    } else {
      setShowNextButton(true);
    }
  });

  return(
    <>
      <Row style={{ marginTop: '2rem' }} className="text-right">
        <Col><Button variant="primary" onClick={tableToExcel}>ダウンロード</Button></Col>
      </Row>
      <Row style={{ marginTop: '2rem' }} className="text-center">
        <Col>{showBackButton ? <Button variant="light" onClick={goBackMonth} block>前月へ</Button> : null}</Col>
        <Col><h4>{format(targetDate, 'y年M月度')}</h4></Col>
        <Col>{showNextButton ? <Button variant="light" onClick={goNextMonth} block>翌月へ</Button> : null}</Col>
      </Row>
      <Row style={{ marginTop: '2rem' }}>
        <Col>
          <Table bordered id="kintaitable">
            <thead className="text-center">
              <tr>
                <th>{format(targetDate, 'y年M月度')}</th>
                <th>勤務区分</th>
                <th>出勤時刻</th>
                <th>退勤時刻</th>
                <th>稼働時間</th>
                <th>休憩時間</th>
                <th>承認申請</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {calendars.map((date) => (
              <tr key={date.dateString}>
                <td><p style={{color: (date.week === 'Sa' ? 'blue': '') || (date.week === 'Su' ? 'red': '')}}>{date.day}</p><p style={{color: (date.week === 'Sa' ? 'blue': '') || (date.week === 'Su' ? 'red': '')}}>{date.week}</p></td>
                <td>{date.week === 'Sa' || date.week === 'Su' ?　'休日'　: '稼働' }</td>
                <td>
                  <InjectStoreState store={KintaiCalendarStore} on={s => s[date.dateString].startString}>{startString => <span>{startString}</span>}</InjectStoreState>
                </td>
                <td>
                  <InjectStoreState store={KintaiCalendarStore} on={s => s[date.dateString].endString}>{endString => <span>{endString}</span>}</InjectStoreState>
                </td>
                <td>
                  <InjectStoreState store={KintaiCalendarStore} on={s => s[date.dateString].duration}>{duration => <span>{duration.hours}:{duration.minutes?.toString().padStart(2,'0')}</span>}</InjectStoreState>
                </td>
                <td>{date.week === 'Sa' || date.week === 'Su' ? '0:00' : '1:00' }</td>
                <td>
                  <InjectStoreState store={KintaiCalendarStore} on={s => s[date.dateString].status}>{status => <span>{status === 'applying' ? '申請中' : <Button size="sm" variant="primary" onClick={() => openModal(date)}>申請</Button>}</span>}</InjectStoreState>
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <KintaiApplyModal
        selectdate={selectDate}
        show={modalShow}
        onHide={()=>setModalShow(false)}
      />
    </>
  )
}

export default Works;