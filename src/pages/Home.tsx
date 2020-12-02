import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        <Col key={menu.id} style={{ marginBottom: '1rem' }}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
             <Card.Title>{menu.title}</Card.Title>
              <Card.Text></Card.Text>
              <Link className="btn btn-primary" to={menu.linkTo}>選択</Link>
            </Card.Body>
          </Card>
        </Col>
       ))}
      </Row>
    </>
  )
}

export default Home;