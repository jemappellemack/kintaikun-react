import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { KintaiCalendarStore } from '../store/KintaiCalendarStore';

type KintaiApplyModalProps = {
  selectdate: {
    date: Date;
    year: string;
    month: string;
    day: string;
    week: string;
    dateString: string;
  };
  show: boolean;
  onHide: () => void;
};

const onClickApply = (dateString: string, onHide: () => void): void => {
  KintaiCalendarStore.update((s) => {
    s[dateString].status = 'applying';
  });
  return onHide();
};

const KintaiApplyModal: FC<KintaiApplyModalProps> = ({
  selectdate,
  show,
  onHide,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">承認申請</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>承認申請しますか？</h4>
        <p>{selectdate.dateString}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onHide}>
          キャンセル
        </Button>
        <Button
          variant="success"
          onClick={() => onClickApply(selectdate.dateString, onHide)}>
          申請する
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KintaiApplyModal;
