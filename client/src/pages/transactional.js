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
            otherCategoryTextValue: "",
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
                {
                    label: "Other",
                    value: "Other",
                }
            ]
        };      
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);        
    }

    onSaveButton = event => {
        console.log(this.state);
        const data = {
            user_input_txt: this.state.textValue,
            bert_classified: this.state.resultData,
            accepted_flag: false,
            user_classified: this.state.userSelectedClaasified,
            user_classified_other: this.state.otherCategoryTextValue
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
    //handle change
    handleChange = event => {
        this.setState({
            textValue: event.target.value,
            showResult: false,
            firstSubmitButtonFlag: true
        });
    }

    handleChangeOtherTextValue = event => {
        this.setState({
            otherCategoryTextValue: event.target.value,
        });
    }
    //handleSubmit(event) {
    handleSubmit = event => {
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
                userSelectedClaasified: event.target.value,
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
                                <Form.Label>Please enter your issue here</Form.Label>
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
                                                    <Form.Label>Please select your issue related category from the following list</Form.Label>
                                                    <Form.Select aria-label="Please select issue category" onChange={this.onChangeSelect.bind(this)}>
                                                        <option key="0">Select issue category</option>
                                                        {this.state.issueTypeList.map((option) => (
                                                            <option key={option.value}>{option.label}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                </Row>
                                                <Row style={{ paddingTop: 6, paddingRight: 0 }}>
                                                <Col>
                                                    {this.state.otherCategoryFlag &&
                                                        //  <input type="text" value={this.state.otherCategoryTextValue} />
                                                        <Form.Control as="input" value={this.state.otherCategoryTextValue}
                                                            name="otherCategoryText" onChange={this.handleChangeOtherTextValue} placeholder="Enter other detail" />
                                                    }
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingTop: 6, paddingRight: 0 }}>
                                                <Col>
                                                    <Button variant="primary" type="button" onClick={this.onSaveButton}>
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