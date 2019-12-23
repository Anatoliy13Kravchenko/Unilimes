import React from 'react';
import { Link, match, withRouter } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { History } from 'history';

interface Props {
    history: History
    match: match<any>;
}

const Header = ({ history }: Props) => {

    const handleHistory = (color: string) => {
        history.push({ search: color });
    };

    const backgroundColors = ['Violet', 'Green', 'Blue'];

        return (
            <header>
                    <Nav className="justify-content-center" defaultActiveKey="/" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link><Link to='/' style={{color: '#32325D'}}>Home</Link></Nav.Link>
                        </Nav.Item>
                        {
                            backgroundColors.map((color: string, i: number) => (
                                <Nav.Item as="li" key={i}>
                                    <Nav.Link><Link to={`/container/${color.toLowerCase()}`} style={{color}} onClick={() => handleHistory(color.toLowerCase())}>{color}</Link></Nav.Link>
                                </Nav.Item>
                             ))
                        }
                    </Nav>
            </header>
        );
};

export default withRouter<any, any>(Header)
