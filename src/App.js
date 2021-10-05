import React, { useState } from "react";
import Spinner from "./view/Spinner";
import DigitalKnob from "./view/DigitalKnob";
import ProgressBar from "./view/ProgressBar";
// import DoorAnimation from "./view/DoorAnimation";
import { Button, Row, Col, Container } from "reactstrap";
import CircluarAnimation from "./view/CircluarAnimation";

function App() {
  const [knob1, setKnob1] = useState(false);
  const [knob2, setKnob2] = useState(false);
  const [knob3, setKnob3] = useState(false);
  const [door, setDoor] = useState(false);
  const [circle, setCircle] = useState(false);

  const knob1Handler = () => {
    setKnob1(true);
    setKnob2(false);
    setKnob3(false);
    setDoor(false);
    setCircle(false);
  };

  const knob2Handler = () => {
    setKnob1(false);
    setKnob3(false);
    setKnob2(true);
    setDoor(false);
    setCircle(false);
  };

  const knob3Handler = () => {
    setKnob1(false);
    setKnob2(false);
    setKnob3(true);
    setDoor(false);
    setCircle(false);
  };

  const doorHandler = () => {
    setKnob1(false);
    setKnob2(false);
    setKnob3(false);
    setDoor(true);
    setCircle(false);
  };

  const circleHandler = () => {
    setKnob1(false);
    setKnob2(false);
    setKnob3(false);
    setDoor(false);
    setCircle(true);
  };

  return (
    <>
      <Container fluid>
        <Row className="text-center mt-3">
          <h4 className="mb-4">
            Click to view<span style={{ color: "red" }}> KNOBs</span>
          </h4>
          <Col>
            <Button onClick={knob1Handler} className="bg-dark">
              Touch Screen Knob
            </Button>
          </Col>
          <Col>
            <Button onClick={knob2Handler} className="bg-dark">
              Radio Knob
            </Button>
          </Col>
          <Col>
            <Button onClick={knob3Handler} className="bg-dark">
              Trip Knob
            </Button>
          </Col>
          {/* <Col>
            <Button onClick={doorHandler} className="bg-dark">
              Door Animation
            </Button>
          </Col> */}
          <Col>
            <Button onClick={circleHandler} className="bg-dark">
              circle Animation
            </Button>
          </Col>
        </Row>

        {!knob1 ? null : <Spinner />}
        {!knob2 ? null : <DigitalKnob />}
        {!knob3 ? null : <ProgressBar />}
        {/* {!door ? null : <DoorAnimation />} */}
        {!circle ? null : <CircluarAnimation />}
      </Container>
    </>
  );
}

export default App;
