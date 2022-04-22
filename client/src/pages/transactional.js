import React from 'react';
import { Button, Form, Container, Row, Col, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import BarChart from './BarChart';
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
            finalSaveButtonFlag: false,
            explainabilityData: null,
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
        const data = {
            user_input_txt: this.state.textValue,
            bert_classified: this.state.resultData,
            accepted_flag: false,
            user_classified: this.state.userSelectedClaasified,
            user_classified_other: this.state.otherCategoryTextValue
        };
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
        event.preventDefault();
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
        fetch('/api/transactional/doExplainabilityStage1', {
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
                        resultData: data.message,
                        explainabilityData: data.word_attribute,
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
            this.setState({
                showCategoryLlistFlag: false,
                userSelectedClaasified: null,
                otherCategoryFlag: false,
                otherCategoryTextValue: "",
                successfulTicketSaveData: null,
                successfulTicketSaveFlag: false,
                finalSaveButtonFlag: false

            });
            const data = {
                user_input_txt: this.state.textValue,
                bert_classified: this.state.resultData,
                accepted_flag: true
            };
            // console.log(data);
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
                            successfulTicketSaveFlag: true,
                            finalSaveButtonFlag: false
                        })
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            this.setState({
                showCategoryLlistFlag: true,
                otherCategoryFlag: false,
                otherCategoryTextValue: "",
                finalSaveButtonFlag: false,
                successfulTicketSaveData: null,
                successfulTicketSaveFlag: false
            });
        }

        // this.setState({showCategoryLlistFlag: event.target.value})
    }
    onChangeSelect(event) {
        // console.log(event.target.key);
        // console.log(event.target.value);
        this.setState({
            // showCategoryLlistFlag: true,
            // otherCategoryFlag: false,
            // otherCategoryTextValue: "",
            // finalSaveButtonFlag: false,
            successfulTicketSaveData: null,
            successfulTicketSaveFlag: false
        });

        if (event.target.value === "Select issue category") {
            this.setState({
                finalSaveButtonFlag: false,
                otherCategoryFlag: false
            });
        } else if (event.target.value !== "Other") {
            this.setState({
                userSelectedClaasified: event.target.value,
                otherCategoryFlag: false,
                finalSaveButtonFlag: true
            });
        } else {
            this.setState({
                userSelectedClaasified: event.target.value,
                otherCategoryFlag: true,
                finalSaveButtonFlag: true
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
                <Container fluid>
                    <Row style={{ paddingTop: 3, paddingLeft: 10 }}>
                        <Col md="10">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">BERT-Text-Classification(Banking)</Card.Title>
                                </Card.Header>
                                <Card.Body>

                                    <Form onSubmit={this.handleSubmit}>
                                        <Card
                                            border="light">
                                            <Card.Body>
                                                <Row>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Please enter your issue here</Form.Label>
                                                            <Row><Col>
                                                                <OverlayTrigger
                                                                    placement="right"
                                                                    delay={{ show: 250, hide: 400 }}
                                                                    overlay={renderTooltip}>
                                                                    <Form.Control name="textValue" as="textarea" rows={3} required onChange={this.handleChange} placeholder='Type your issue here' />
                                                                </OverlayTrigger>
                                                            </Col>
                                                            </Row>

                                                            {this.state.firstSubmitButtonFlag &&
                                                                <Row style={{ paddingTop: 5, paddingRight: 0 }}><Col>
                                                                    <Button variant="primary float-end" type="submit">
                                                                        Click Here
                                                                    </Button>
                                                                </Col></Row>
                                                            }
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Form>

                                    <Row><Col>


                                        {this.state.showResult &&
                                            <div>
                                                <Row style={{ paddingTop: 0, paddingRight: 0 }}>
                                                    <Col>
                                                    <Card
                                                                border="light">
                                                                <Card.Body>                                                                
                                                                        <Card.Text>Explainability</Card.Text>                                                                   
                                                                    <BarChart data={this.state.explainabilityData} />
                                                                </Card.Body>

                                                            </Card>
                                                        <Card
                                                            border="light">
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
                                                <Form onSubmit={this.onSaveButton}>
                                                    {this.state.showCategoryLlistFlag &&
                                                        <Row style={{ paddingTop: 3, paddingRight: 0 }}>
                                                            <Col>
                                                                <Card
                                                                    border="light">
                                                                    <Card.Body>
                                                                        <Row style={{ paddingTop: 3, paddingRight: 0 }}>
                                                                            <Col className="col-6">
                                                                                <Form.Label>Please select your issue related category from the following list</Form.Label>
                                                                                <Form.Select aria-label="Please select issue category"
                                                                                    onChange={this.onChangeSelect.bind(this)}>
                                                                                    <option key="0">Select issue category</option>
                                                                                    {this.state.issueTypeList.map((option) => (
                                                                                        <option key={option.value}>{option.label}</option>
                                                                                    ))}
                                                                                </Form.Select>
                                                                            </Col>
                                                                            {/* </Row>
                                                                        <Row style={{ paddingTop: 6, paddingRight: 0 }}> */}
                                                                            <Col className="col-5">
                                                                                {this.state.otherCategoryFlag &&
                                                                                    <>
                                                                                        <Form.Label>Please enter other value</Form.Label>
                                                                                        <Form.Control as="input" value={this.state.otherCategoryTextValue}
                                                                                            name="otherCategoryText" onChange={this.handleChangeOtherTextValue} required placeholder="Enter other detail" />
                                                                                    </>
                                                                                }
                                                                            </Col>
                                                                        </Row>
                                                                        {this.state.finalSaveButtonFlag &&
                                                                            <Row style={{ paddingTop: 6, paddingRight: 0 }}>
                                                                                <Col>
                                                                                    <Button variant="primary" type="submit">
                                                                                        Submit Ticket
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>
                                                                        }
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        </Row>

                                                    }
                                                </Form>
                                                {this.state.successfulTicketSaveFlag &&

                                                    <Row style={{ paddingTop: 3, paddingRight: 0 }}>
                                                        <Col>
                                                           
                                                            <Card
                                                                border="light">
                                                                <Card.Body>
                                                                    <Card.Text>Thank you! Your ticket was created successfully. Ticket Number: <b>{this.state.successfulTicketSaveData}</b>. </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>

                                                }

                                            </div>
                                        }
                                    </Col></Row>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>



            </>
        );
    }
}


export default Transactional;