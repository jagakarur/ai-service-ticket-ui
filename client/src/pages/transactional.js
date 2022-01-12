import React from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
class Transactional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: null,
            resultData: null

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ textValue: event.target.value });
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
                this.setState({ resultData: data.message })
            })
            .catch((error) => {

                console.error('Error:', error);
            });


        // fetch("/api/transactional")
        //     .then((res) => res.json())
        //     .then((data) => {this.setState({ resultData: data.message})});






        // alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <>
                <Container fluid="md m-2">
                    <Row>
                        <Col>
                            <Card bg={'light'}>
                                <Card.Body>
                                    <h3>Mapping description for Output labels</h3>
                                    <p>1.Banking Services, 2.Card Services, 3.Credit Reporting, 4.Debt Collection, 5.Loans, 6.Mortgage </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row md={1}>
                        <Col> <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                {/* <Form.Label><h3>Enter the text:</h3></Form.Label> */}
                                <Form.Control name="textValue" as="textarea" rows={3} onChange={this.handleChange} placeholder='Enter text for transformer' />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                        </Col>

                    </Row>
                </Container>
                <Container fluid="md m-2">
                    <Row>
                        <Col>
                            <p>{this.state.resultData}</p>
                        </Col>
                    </Row>
                </Container>


            </>
        );
    }
}


export default Transactional;