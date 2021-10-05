import React, { useState, useLayoutEffect, useEffect, useRef, forwardRef } from 'react';
import { Row, Container, Col, Button, Card, CardTitle, CardText, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './doorAnimation.css';
import $ from 'jquery';
import { BsInfoCircle } from 'react-icons/bs'
import { FaTemperatureHigh, FaEnvira, FaGripfire, FaBriefcaseMedical, FaCarrot, FaFish } from 'react-icons/fa';
import { gsap } from "gsap";


const FadeIn = forwardRef(({ children, stagger = 0, x = 0 }, ref) => {
    const el = useRef();
    const animation = useRef();

    useLayoutEffect(() => {
        animation.current = gsap.from(el.current.children, {
            opacity: 0,
            stagger,
            x
        });
    }, []);

    useEffect(() => {

        // forward the animation instance
        if (typeof ref === "function") {
            ref(animation.current);
        } else if (ref) {
            ref.current = animation.current;
        }
    }, [ref]);

    return <span ref={el}>{children}</span>
});

const DoorAnimation = () => {
    const [info, setInfo] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [iconInfo, setIconInfo] = useState(false)
    const animation = useRef();

    const toggle = () => setPopoverOpen(!popoverOpen);
    const toggle2 = () => {
        animation.current.reversed(!animation.current.reversed());
    };

    let doorOpenHandler = (e) => {
        $(".door").toggleClass("doorOpen");
        // $(".door").toggleClass("circle-container");
        e.stopPropagation();
        info !== true ? setInfo(true) : setInfo(false);
        setIconInfo(false);

    }

    let backDoorHandler = (e) => {
        $(".door").toggleClass("doorOpen");
        // $(".door").toggleClass("circle-container");
        e.stopPropagation();
        setInfo(false);
        setIconInfo(false);

    }

    let tempHandler = () => {
        setIconInfo(true);
        // animation.current.reversed(!animation.current.reversed());
    }

    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 0.75 });
    };

    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });

    };


    return (
        <>
            <Container fluid>

                <Row >
                    <Col sm="8"  >
                        <div className='info' onMouseEnter={onEnter} onMouseLeave={onLeave}>
                            <div className="animation" >
                                <div>
                                    <div className="backDoor" onClick={backDoorHandler} >
                                        <div className="door" onClick={doorOpenHandler} />
                                    </div>
                                </div>
                                {info ? <>
                                    <div className="animation2"  >
                                        <a class='deg0'><FaTemperatureHigh size={50} style={{ backgroundColor: "transparent" }} onClick={tempHandler} onMouseEnter={onEnter} onMouseLeave={onLeave}></FaTemperatureHigh></a>
                                        <a class='deg45'><FaEnvira size={50} style={{ backgroundColor: "transparent" }} onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg135'><FaFish size={50} style={{ backgroundColor: "transparent" }} onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg180'><FaGripfire size={50} style={{ backgroundColor: "transparent" }} onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg225'><FaBriefcaseMedical size={50} style={{ backgroundColor: "transparent" }} onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg315'><FaCarrot size={50} style={{ backgroundColor: "transparent" }} onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        {/* <Popover placement="below" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                                            <PopoverHeader>Info</PopoverHeader>
                                            <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                        </Popover> */}
                                    </div>
                                </> : null}
                            </div>
                        </div>
                    </Col>
                    {info === true ?

                        <Col lg="4" className='mt-5  text-center'>

                            {iconInfo === true ?
                                <Row className="mt-5" >
                                    <Row >

                                        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                            <CardTitle tag="h4">Refrigerator Information</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        </Card>

                                        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="mt-4">
                                            <CardTitle tag="h4">Temperature Information</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        </Card>
                                    </Row>
                                </Row> : null}
                        </Col>

                        : null}
                </Row>
            </Container>
        </>
    )
}

export default DoorAnimation




