import React from "react";
import './Diarypage.css'
import Navibar from "./navibar";
import { useEffect } from 'react';

function Diarypage() {
    useEffect(() => {
        console.log("✅ Diarypage is loaded!");
    }, []);

    return (
        <div className="diarypage">
            <header>
                <Navibar />
            </header>
            <section className="diarypage_main">
                <div className="diarypage_body">
                    <ul>
                        <li className="diarypage_body_title">
                            <span>대화 내용을 요약하여 작성한 일기 (수정이 필요하시면 직접 클릭하여 수정해주세요)</span>
                        </li>
                        <li className="diarypage_body_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam
                            non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio
                            facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec
                            adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor
                            augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
                            Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst
                            quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.
                        </li>
                        <li className="diarypage_body_button">
                            <button><a href="javascript:void(0)">재작성하기</a></button>
                            <button><a href="javascript:void(0)">저장하기</a></button>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}


export default Diarypage;