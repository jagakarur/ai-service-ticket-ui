import React from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
class Transactional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: null,
            resultData: null,
            showResult: false

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ textValue: event.target.value,
            showResult: false});
        console.warn(this.state)
    }

    handleSubmit(event) {

        const data = { data: this.state.textValue };

        fetch('/api/transactional/doTransactions', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.message) {
                    this.setState({ resultData: data.message.substr(181),
                    showResult: true })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        event.preventDefault();
    }

    render() {
        return (
            <>
                <Container fluid="md m-2">
                    <Row>
                        <Col>
                            <Card
                                bg="light"
                                style={{ width: '50rem' }}>
                                <Card.Header>Output labels for BERT text classify</Card.Header>
                                <Card.Body>
                                    <Card.Text>1.Banking Services, 2.Card Services, 3.Credit Reporting, 4.Debt Collection, 5.Loans, 6.Mortgage
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br></br>
                    <Row md={1}>
                        <Col> <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                {/* <Form.Label><h3>Enter the text:</h3></Form.Label> */}

                                <Row md={2}><Col>
                                    <Form.Control name="textValue" as="textarea" rows={3} onChange={this.handleChange} placeholder='Enter text for BERT classify' />
                                </Col>
                                    <Col>
                                <Form.Control name="textValue2" as="textarea" rows={3} placeholder='Please Enter what you through' />
                               </Col>
                                </Row>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Col>
                    </Row>
                </Container>
                {this.state.showResult &&

                    <Container fluid="md m-2">
                        <Row>
                            <Col>
                                <Card
                                    border="primary"
                                    style={{ width: '50rem' }}>
                                    <Card.Header>BERT model classification for your input as</Card.Header>
                                    <Card.Body>
                                        <Card.Text> {this.state.resultData}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                }
            </>
        );
    }
}


export default Transactional;