import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

function Navigation() {
  return(
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>勤怠くん</Navbar.Brand>
        <Nav>
          <MemoryRouter>
            <Link style={{ marginLeft: '1rem', color: 'white' }} to="/timestamp">打刻</Link>
            <Link style={{ marginLeft: '1rem', color: 'white' }} to="/works">一覧</Link>
          </MemoryRouter>
        </Nav>
      </Navbar>
    </>
  )
}
export default Navigation;