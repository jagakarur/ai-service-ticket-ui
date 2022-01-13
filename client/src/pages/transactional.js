import React from 'react';
import { Button, Form, Container, Row, Col, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
class Transactional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: null,
            resultData: null,
            showResult: false,
            firstSubmitButtonFlag: true,
            showCategoryLlistFlag: false,
            userSelectedClaasified: null,
            otherCategoryFlag: false,
            otherCategoryTextValue: null,
            successfulTicketSaveData: null,
            successfulTicketSaveFlag: false,
            issueTypeList: [
                {
                    label: "Banking Services",
                    value: "Banking Services",
                },
                {
                    label: "Card Services",
                    value: "Card Services",
                },
                {
                    label: "Credit Reporting",
                    value: "Credit Reporting",
                },
                {
                    label: "Debt Collection",
                    value: "Debt Collection",
                },
                {
                    label: "Loans",
                    value: "Loans",
                },
                {
                    label: "Mortgage",
                    value: "Mortgage",
                },
                // {
                //     label: "Other",
                //     value: "Other",
                // }
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        //this.onmycage = this.onmycage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    //final save buuton
    handleClick() {
        const data = {
            user_input_txt: this.state.textValue,
            bert_classified: this.state.resultData,
            accepted_flag: false,
            user_classified: this.state.userSelectedClaasified === "Other" ? this.state.otherCategoryTextValue : this.state.userSelectedClaasified
        };
        console.log(data);
        fetch('/api/transactional/doTransactionsStage2', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.message) {
                    this.setState({
                        successfulTicketSaveData: data.message,
                        successfulTicketSaveFlag: true
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    handleChange(event) {
        console.log(event.target.name);

        this.setState({
            textValue: event.target.value,
            showResult: false,
            firstSubmitButtonFlag: true
        });

        // console.warn(this.state)
    }

    onmycage(event) {
        console.log(event.target.name);
        if (event.target.name === 'otherCategoryTextValue') {
            this.setState({
                otherCategoryTextValue: event.target.value,
                showResult: false
            });

        }
        // console.warn(this.state)
    }
    handleSubmit(event) {
        const data = { data: this.state.textValue };
        fetch('/api/transactional/doTransactionsStage1', {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.message) {
                    this.setState({
                        resultData: data.message.substr(182),
                        showResult: true,
                        firstSubmitButtonFlag: false
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        event.preventDefault();
    }

    handleCheckboxChange(event) {
        if (event.target.value === 'Yes') {

            const data = {
                user_input_txt: this.state.textValue,
                bert_classified: this.state.resultData,
                accepted_flag: true
            };
            console.log(data);
            fetch('/api/transactional/doTransactionsStage2', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.message) {
                        this.setState({
                            successfulTicketSaveData: data.message,
                            successfulTicketSaveFlag: true
                        })
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            this.setState({ showCategoryLlistFlag: true });
        }

        // this.setState({showCategoryLlistFlag: event.target.value})
    }
    onChangeSelect(event) {
        if (event.target.value !== "Other") {
            this.setState({
                userSelectedClaasified: event.target.value,
                otherCategoryFlag: false
            });
        } else {
            this.setState({
                userSelectedClaasified: null,
                otherCategoryFlag: true
            });
        }
    }


    render() {
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Please enter your issue in detail
            </Tooltip>
        );


        return (
            <>
                <Container fluid="md m-2">
                    <Row md={1}>
                        <Col> <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label><h3>Please enter your issue here:</h3></Form.Label>
                                <Row md={2}><Col>
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip}
                                    >
                                        <Form.Control name="textValue" as="textarea" rows={3} onChange={this.handleChange} placeholder='Type your issue here' />
                                    </OverlayTrigger>
                                </Col>
                                    {/* <Col>
                                        <Form.Control name="textValue2" as="textarea" rows={3} placeholder='Please Enter what you through' />
                                    </Col> */}
                                </Row>
                            </Form.Group>
                            {this.state.firstSubmitButtonFlag && <Button variant="primary" type="submit">
                                Click Here
                            </Button>}
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
                                    <Card.Body>
                                        <Card.Text>As per your issue, Is it related to <b>{this.state.resultData}</b>? </Card.Text>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type="radio"
                                            value="Yes"
                                            id={`inline-radio-1`}
                                            onChange={this.handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type="radio"
                                            value="No"
                                            id={`inline-radio-2`}
                                            onChange={this.handleCheckboxChange}
                                        />

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        {this.state.showCategoryLlistFlag &&
                            <Row style={{ paddingTop: 3, paddingRight: 0 }}>
                                <Col>
                                    <Card
                                        border="primary"
                                        style={{ width: '50rem' }}>
                                        <Card.Body>
                                            <Row style={{ paddingTop: 3, paddingRight: 0 }}>
                                                <Col>
                                                    <Form.Select aria-label="Please select issue category" custom onChange={this.onChangeSelect.bind(this)}>
                                                        <option value="">Please select issue category</option>
                                                        {this.state.issueTypeList.map((option) => (
                                                            <option value={option.value}>{option.label}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingTop: 5, paddingRight: 0 }}>
                                                <Col>
                                                    {this.state.otherCategoryFlag &&
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                                                            <Form.Control name="otherCategoryTextValue" as="textarea" rows={3} custom onChange={this.onmycage.bind(this)} placeholder='Please enter other details' />
                                                        </Form.Group>}
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingTop: 6, paddingRight: 0 }}>
                                                <Col>
                                                    <Button variant="primary" type="button" onClick={this.handleClick}>
                                                        Submit Ticket
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        }
                        {this.state.successfulTicketSaveFlag &&

                            <Row style={{ paddingTop: 3, paddingRight: 0 }}>
                                <Col>
                                    <Card
                                        border="primary"
                                        style={{ width: '50rem' }}>
                                        <Card.Body>
                                            <Card.Text>Thank you! Your ticket was created successfully. Ticket Number: <b>{this.state.successfulTicketSaveData}</b>. </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                        }
                    </Container>
                }
            </>
        );
    }
}


export default Transactional;