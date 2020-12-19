import React, { FC, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Clock from '../components/Clock';
import { KintaiCalendarStore } from '../store/KintaiCalendarStore';
import format from 'date-fns/format';
import intervalToDuration from 'date-fns/intervalToDuration';

const Timestamp: FC = () => {
  const today: string = format(new Date(), 'yyyy-MM-dd');
  const { startAt, endAt, duration } = KintaiCalendarStore.useState(
    (s) => s[today],
    [today]
  );

  const onClickStartTime = (): void => {
    KintaiCalendarStore.update((s) => {
      s[today].startAt = new Date();
      s[today].startString = format(new Date(), 'H:mm');
    });
  };

  const onClickEndTime = (): void => {
    KintaiCalendarStore.update((s) => {
      s[today].endAt = new Date();
      s[today].endString = format(new Date(), 'H:mm');
    });
  };

  useEffect(() => {
    if (!startAt || !endAt) return;
    KintaiCalendarStore.update((s) => {
      s[today].duration = intervalToDuration({ start: startAt, end: endAt });
    });
  });

  return (
    <>
      <Row>
        <Col></Col>
        <Col style={{ marginTop: '4rem' }}>
          <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title style={{ marginBottom: '1rem' }}>
                {format(new Date(), 'y年M月dd日')}
              </Card.Title>
              <h1 style={{ marginBottom: '2rem' }}>
                <Clock />
              </h1>
              <Card.Text
                hidden={startAt ? false : true}
                style={{ marginBottom: '1rem' }}>
                出 勤 {startAt ? format(startAt, 'H:mm') : null}
              </Card.Text>
              <Card.Text
                hidden={endAt ? false : true}
                style={{ marginBottom: '1rem' }}>
                退 勤 {endAt ? format(endAt, 'H:mm') : null}
              </Card.Text>
              <Card.Text
                hidden={endAt ? false : true}
                style={{ marginBottom: '3rem' }}>
                時 間{' '}
                {`${duration.hours}:${duration.minutes
                  ?.toString()
                  .padStart(2, '0')}`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={onClickStartTime}
                disabled={startAt ? true : false}>
                出勤
              </Button>
              <Button
                variant="primary"
                style={{ marginLeft: '1rem' }}
                onClick={onClickEndTime}
                disabled={(startAt ? false : true) || (endAt ? true : false)}>
                退勤
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Timestamp;
