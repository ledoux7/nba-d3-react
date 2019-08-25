import React from 'react'
import { ButtonToolbar, Button, ToggleButtonGroup, ToggleButton, Navbar,NavItem, Nav,NavDropdown } from 'react-bootstrap'
import { Link,NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'



class Navigation extends React.Component {
    render() {
        return (
            // <div>
                
                // <Container>
                <div className="header-bar">
                    {/* <Navbar bg="#495464"  fixed="top" expand="xl"> */}
                    <Navbar bg="dark" variant="dark" fixed="top" expand="xl">
                        
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto hidden-sm-up float-xs-left" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" fill="true" variant="pills">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href='/filter'>Filter</Nav.Link>
                            <Nav.Link href='/table'>Table</Nav.Link>
                            <Nav.Link href='/bar'>Bar</Nav.Link>
                            <Nav.Link href='/test'>test</Nav.Link>
                            <Nav.Link href='/sibs'>sibs</Nav.Link>
                            <Nav.Link href='/scatter'>Scatter</Nav.Link>
                            <Nav.Link href='/shotchart'>Shotchart</Nav.Link>
                            <Nav.Link href='/my'>My Shotchart</Nav.Link>
                            <Nav.Link href='/grid'>Grid</Nav.Link>






                            

                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/test">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            // </Container>
            // </div>
        )
    }
}

export default Navigation;