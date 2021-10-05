import React, { useState } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import logo from '../assets/pngegg.png'
import CircularSlider from '@fseehawer/react-circular-slider';
import './spinner.css';
// import { GiBarbedSun } from 'react-icons/Gi'
import { GiBarbedSun } from "react-icons/gi";
const Spinner = () => {
    const [temp, setTemp] = useState(0)
    const [temp2, setTemp2] = useState(0)

    return (
        <Container fluid>
            <Row className='knobsDiv'>
                <Col>
                    <CircularSlider
                        label="Temperature"
                        min={0}
                        max={50}
                        dataIndex={temp}
                        prependToValue=""
                        appendToValue="°C"
                        labelColor="#005a58"
                        labelBottom={true}
                        knobColor="#005a58"
                        knobSize={72}
                        progressColorFrom="#00bfbd"
                        progressColorTo="#005a58"
                        progressSize={24}
                        trackColor="#eeeeee"
                        trackSize={24}
                        onChange={val => { setTemp(val); console.log(val) }}

                    >
                        <GiBarbedSun size='40' x='17' y='15' width='28px' height='28px' />
                    </CircularSlider>
                </Col>
                <Col>
                    <CircularSlider

                        label="Temperature"
                        min={0}
                        max={9}
                        dataIndex={temp2}
                        prependToValue="."
                        appendToValue="°C"
                        labelColor="#005a58"
                        labelBottom={true}
                        knobColor="#005a58"
                        knobSize={72}
                        progressColorFrom="#00bfbd"
                        progressColorTo="#005a58"
                        progressSize={24}
                        trackColor="#eeeeee"
                        trackSize={24}
                        onChange={val => { setTemp2(val); console.log(val / 10) }}
                    // knobPosition="top"

                    >
                        <GiBarbedSun size='40' x='17' y='15' width='28px' height='28px' />
                    </CircularSlider>
                </Col>
                <h5 className='text-center'>Current Temp:{temp}.{temp2}°C</h5>

            </Row>



        </Container >
    )
}

export default Spinner
