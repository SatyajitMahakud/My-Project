import React, { useState, useLayoutEffect, useEffect, useRef, forwardRef } from 'react';
import { Row, Container, Col, Button, Card, CardTitle, CardText, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './circleAnimation.css';
import $ from 'jquery';
import { BsInfoCircle } from 'react-icons/bs'
import { FaTemperatureHigh, FaEnvira, FaGripfire, FaBriefcaseMedical, FaCarrot, FaFish } from 'react-icons/fa';
import { gsap } from "gsap";
import DigitalKnob from './DigitalKnob'


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

const CircluarAnimation = () => {
    const [info, setInfo] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [iconInfo, setIconInfo] = useState(false)
    const animation = useRef();

    const toggle = () => setPopoverOpen(!popoverOpen);
    const toggle2 = () => {
        animation.current.reversed(!animation.current.reversed());
    };

    let doorOpenHandler = (e, currentTarget) => {
        $(".door").toggleClass("doorOpen");
        // $(".door").toggleClass("circle-container");
        e.stopPropagation();
        info !== true ? setInfo(true) : setInfo(false);
        setIconInfo(false);
        // gsap.to(currentTarget,
        //     { duration: 2.5, ease: "elastic.out(1, 0.3)", y: -500 })

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
        gsap.to(currentTarget, { scale: 1.1 });
        // gsap.to(currentTarget,
        //     { duration: 2.5, ease: "elastic.out(1, 0.3)", x: 100 })
    };

    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 0.8 });
        // gsap.to(currentTarget,
        //     { duration: 2.5, ease: "elastic.out(1, 0.3)", y: 150 })
    };


    return (
        <>
            <Container fluid="sm">
                <Row >
                    <Col sm="8" >
                        <div className='info' >
                            <div className="animation">
                                <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                    <div className="backDoor" onClick={backDoorHandler} >
                                        <div className="door" onClick={doorOpenHandler} />
                                    </div>
                                </div>
                                {info ? <>
                                    <div sm="8" className="animation2" >
                                        <a class='deg0'><FaTemperatureHigh size={50} id="Popover1" onClick={tempHandler} onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg45'><FaEnvira size={50} id="Popover1" onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg135'><FaFish size={50} id="Popover1" onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg180'><FaGripfire size={50} id="Popover1" onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg225'><FaBriefcaseMedical size={50} id="Popover1" onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
                                        <a class='deg315'><FaCarrot size={50} id="Popover1" onMouseEnter={onEnter} onMouseLeave={onLeave} /></a>
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
                        <Col lg="4" className='defaultInfo mt-5 text-center'>
                            <Row>
                                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                    <CardTitle tag="h4" >Refrigerator Information</CardTitle>
                                    <CardText>Brand: LG</CardText>
                                    <CardText>Model: LG-Q2021</CardText>
                                </Card>
                                {/* <Row className="mt-5 text-center">
                                    <Card className="knob">
                                        <DigitalKnob />
                                    </Card>
                                </Row> */}
                            </Row>
                            {iconInfo === true ?
                                <Row className="iconInfo mt-5" >

                                    <Card className="knob ml-5">
                                        <DigitalKnob />
                                    </Card>

                                </Row> : null}
                        </Col>
                        : null}
                </Row>
            </Container>
        </>
    )
}

export default CircluarAnimation




