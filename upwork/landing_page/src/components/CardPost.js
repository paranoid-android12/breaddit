import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";

function CardPost(){
    return(
        <Container>
            <h1>Browse talent by category</h1>
            <p>Looking for work? Browse jobs</p>
            <Row xs={1} sm={2} lg={4} className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>AI Services</Card.Title>
                            <Card.Text style={{ marginRight: '10px' }}>RATINGS</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>AI Services</Card.Title>
                            <Card.Text style={{ marginRight: '10px' }}>RATINGS</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>AI Services</Card.Title>
                            <Card.Text style={{ marginRight: '10px' }}>RATINGS</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>AI Services</Card.Title>
                            <Card.Text style={{ marginRight: '10px' }}>RATINGS</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CardPost;