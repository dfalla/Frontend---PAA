import { Link, NavLink } from 'react-router-dom'; 
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { useAuthStore } from '../hooks';

export const Navigation = () => {
  const { startLogout, user } = useAuthStore();

  const logout = () => startLogout();

  
  return(   
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <Container>
                
                <Navbar.Brand as={NavLink} to="/">
                
                { user.name }
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to="/">Dashboard</Nav.Link>
                        <NavDropdown title="Alumnos" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/alumnos">
                              
                                Alumnos
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/alumnos/crear-alumno">
                                Crear Alumno
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={NavLink} to="/calendario">
                            <i className="fa-solid fa-calendar-days"></i>
                            &nbsp;
                            Calendario de ensayo
                        </Nav.Link>
                    </Nav>
                           
                    <Nav>
                        
                        <NavDropdown title="Cuenta" id="basic-nav-dropdown">
                            <NavDropdown.Item
                                onClick={ logout }
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                &nbsp;
                                <span>Cerrar sesión</span>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


