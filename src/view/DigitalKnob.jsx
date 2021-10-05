import React, { useState } from 'react';
import { Silver } from 'react-dial-knob';
import { Row, Container, Col } from 'reactstrap';
// import './digitalKnob.css';

const DigitalKnob = () => {
    const [value, setValue] = useState(19)
    const [value2, setValue2] = useState(3)


    return (
        <>
            <Container fluid>
                <Row className='knobsDiv'>
                    <Col>
                        <Silver
                            diameter={150}
                            min={0}
                            max={30}
                            step={1}
                            value={value}
                            onValueChange={setValue}
                            ariaLabelledBy={'my-label'}

                        >

                        </Silver>
                    </Col>
                    <Col>
                        <Silver
                            diameter={150}
                            min={0}
                            max={9}
                            step={1}
                            value={value2}
                            onValueChange={setValue2}
                            ariaLabelledBy={'my-label'}

                        >

                        </Silver>
                    </Col>
                    <h5 className='text-center'>Current Temp:{value}.{value2}°C</h5>

                </Row>
            </Container>
        </>
    )
}

export default DigitalKnob
