import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

function Home() {
  const menuList = [
    {
      id: '001',
      title: '打刻',
      linkTo:'/timestamp'
    },
    {
      id: '002',
      title: '一覧',
      linkTo:'/works'
    }
  ];

  return (
    <>
      <Row style={{ marginTop: '2rem' }}>
       {menuList.map((menu) => (
        <Col style={{ marginBottom: '1rem' }}>
          <Card style={{ width: '18rem' }}>
            <Card.Body key={menu.id}>
             <Card.Title>{menu.title}</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary" href={menu.linkTo}>選択</Button>
            </Card.Body>
          </Card>
        </Col>
       ))}
      </Row>
    </>
  )
}

export default Home;