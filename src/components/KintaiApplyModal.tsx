import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { KintaiCalendarStore } from '../store/KintaiCalendarStore';

const onClickApply = (props: any) : void => {
  KintaiCalendarStore.update(s => {
    s[props.selectdate.dateString].status = 'applying';
  });
  return props.onHide();
};

function KintaiApplyModal(props:any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          承認申請
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>承認申請しますか？</h4>
        <p>
          {props.selectdate.dateString}
        </p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="light" onClick={props.onHide}>キャンセル</Button>
      <Button variant="success" onClick={() => onClickApply(props)}>申請する</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default KintaiApplyModal;