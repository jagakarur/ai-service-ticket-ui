
import React from "react";
import { Card, Figure } from 'react-bootstrap';
import logo from './BERT.png';
const About = () => {
  return (
    <>
      <Card
        bg="light"
        style={{ width: '80rem' }}>
        {/* <Card.Header>About </Card.Header> */}
        <Card.Body>
          <Card.Text>
            Goal of this implementation is to categorize Banking Ticketing support text information extracted from historical support tickets and match ing a given category with the correct recipient using Distilled BERT  Text Classification. For this implementation, we choose the BERT model, due to its popularity, performance and availability of open-source implementations.
          </Card.Text>

          <Figure className="center">
            <Figure.Image
              width={500}
              height={450}
              alt="CGI"
              src={logo}
            />

          </Figure>
        </Card.Body>
      </Card>
    </>
  );
};

export default About;