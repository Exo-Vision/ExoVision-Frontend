import './MainPage.css'
import E from '../assets/typography/E.svg'
import I from '../assets/typography/I.svg'
import N from '../assets/typography/N.svg'
import O from '../assets/typography/O.svg'
import S from '../assets/typography/S.svg'
import V from '../assets/typography/V.svg'
import X from '../assets/typography/X.svg'
import {StarField} from "./starField";
import gradient_border from '../assets/gradient_border.svg'

export default function MainPage() {
    return (
        <div className="backGround">
            {/* 별 배경 */}
            <StarField
                density={8}
                followMouse
                parallaxStrength={0.02}
                parallaxEase={0.05}
                respectReducedMotion={false} // force motion in case OS reduce-motion is ON
                aria-hidden="true"
            />

            {/* 로고 배경 */}
            <div className="bigEllipse" aria-hidden="true" />
            <div className="circle" aria-hidden="true" />
            <div className="circle2" aria-hidden="true" />

            {/* 타이틀 */}
            <div className="titleWrapper">
                <div className="title" aria-label="EXOVISION">
                    <img src={E} alt="E" aria-hidden="true" />
                    <img src={X} alt="X" aria-hidden="true" />
                    <img src={O} alt="O" aria-hidden="true" />
                    <img src={V} alt="V" aria-hidden="true" />
                    <img src={I} alt="I" aria-hidden="true" />
                    <img src={S} alt="S" aria-hidden="true" />
                    <img src={I} alt="I" aria-hidden="true" />
                    <img src={O} alt="O" aria-hidden="true" />
                    <img src={N} alt="N" aria-hidden="true" />
                </div>
                <div className="subTitle">EXPLORE EXOPLANETS</div>

                {/*버튼*/}
                {/*//TODO: href 연결*/}
                <nav className="buttonWrapper" aria-label="difficulty">
                    <a href="/begin">Beginner →</a>
                    <a href="/expert">Expert →</a>
                    <div className="logButton">
                        {/*둥근 모서리의 그라디언트 테두리가 Pure CSS로 작성이 어려워, 벡터 이미지로 대체했습니다.*/}
                        <img src={gradient_border} alt="border" aria-hidden="true"/>
                        <a href="">
                            Discovery Log
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    )
}
