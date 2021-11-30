import * as React from 'react';

function EditorHeader(){
    return(
        <div className="ql-toolbar">
            <span className="ql-formats">

                <button type="button" className="ql-header" value="2" title="부제목">
                    <svg viewBox="0 0 18 18">
                        <path className="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392
                        .58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0
                        ,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4
                        292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.
                        45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443
                        A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V
                        14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z">
                        </path> 
                    </svg>
                </button>

            </span>
            <span className="ql-formats">

                <button type="button" className="ql-bold" title="굵은 글씨">
                    <svg viewBox="0 0 18 18"> 
                        <path className="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,
                        0,0,0,1,5,9V4A0,0,0,0,1,5,4Z">
                        </path>
                        <path className="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10
                        .5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z">
                        </path> 
                    </svg>
                </button>

                <button type="button" className="ql-italic" title="기울인 글씨">
                    <svg viewBox="0 0 18 18"> 
                        <line className="ql-stroke" x1="7" x2="13" y1="4" y2="4">
                        </line> 
                        <line className="ql-stroke" x1="5" x2="11" y1="14" y2="14">
                        </line>
                        <line className="ql-stroke" x1="8" x2="10" y1="14" y2="4">
                        </line> 
                    </svg>
                </button>
                <button type="button" className="ql-underline" title="밑줄">
                    <svg viewBox="0 0 18 18">
                        <path className="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3">
                        </path>
                        <rect className="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15">
                        </rect> 
                    </svg>
                </button>
                <button type="button" className="ql-strike" title="중앙선">
                    <svg viewBox="0 0 18 18"> 
                    <line className="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5">
                        </line>
                         <path className="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,
                         5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3
                         ,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"></path>
                          <path className="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,1
                          2,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.
                          9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z">
                              </path> </svg></button></span>
                    <span className="ql-formats"><button type="button" className="ql-blockquote" title="인용박스">
                        <svg viewBox="0 0 18 18"> <rect className="ql-fill ql-stroke" height="3" width="3" 
                        x="4" y="5"></rect> <rect className="ql-fill ql-stroke" height="3" width="3" x="11" y="5">
                            </rect> <path className="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"></path> <path className="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"></path> </svg></button><button type="button" className="ql-code-block" title="코드박스"><svg viewBox="0 0 18 18"> <polyline className="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline className="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line className="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line> </svg></button></span><span className="ql-formats"><button type="button" className="ql-align ql-active" value="" title="정렬 기본"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line> <line className="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line> <line className="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line> </svg></button><button type="button" className="ql-align" value="center" title="중앙 정렬"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line> <line className="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line> <line className="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line> </svg></button><button type="button" className="ql-align" value="right" title="오른쪽 정렬"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line> <line className="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line> <line className="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line> </svg></button><button type="button" className="ql-align" value="justify" title="정렬 기본"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line> <line className="ql-stroke" x1="15" x2="3" y1="14" y2="14"></line> <line className="ql-stroke" x1="15" x2="3" y1="4" y2="4"></line> </svg></button></span><span className="ql-formats"><button type="button" className="ql-list" value="ordered" title="숫자 리스트"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line> <line className="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line> <line className="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line> <line className="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line> <path className="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path> <path className="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path> <path className="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path> </svg></button><button type="button" className="ql-list" value="bullet" title="점자 리스트"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line> <line className="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line> <line className="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line> <line className="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line> <line className="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line> <line className="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line> </svg></button></span><span className="ql-formats"><button type="button" className="ql-link" title="링크 연결"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line> <path className="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> <path className="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> </svg></button><button type="button" className="ql-video" title="비디오 넣기"><svg viewBox="0 0 18 18"> <rect className="ql-stroke" height="12" width="12" x="3" y="3"></rect> <rect className="ql-fill" height="12" width="1" x="5" y="3"></rect> <rect className="ql-fill" height="12" width="1" x="12" y="3"></rect> <rect className="ql-fill" height="2" width="8" x="5" y="8"></rect> <rect className="ql-fill" height="1" width="3" x="3" y="5"></rect> <rect className="ql-fill" height="1" width="3" x="3" y="7"></rect> <rect className="ql-fill" height="1" width="3" x="3" y="10"></rect> <rect className="ql-fill" height="1" width="3" x="3" y="12"></rect> <rect className="ql-fill" height="1" width="3" x="12" y="5"></rect> <rect className="ql-fill" height="1" width="3" x="12" y="7"></rect> <rect className="ql-fill" height="1" width="3" x="12" y="10"></rect> <rect className="ql-fill" height="1" width="3" x="12" y="12"></rect> </svg></button></span><span className="ql-formats"><button type="button" className="ql-clean" title="서식 지우기"><svg className="" viewBox="0 0 18 18"> <line className="ql-stroke" x1="5" x2="13" y1="3" y2="3"></line> <line className="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"></line> <line className="ql-stroke" x1="11" x2="15" y1="11" y2="15"></line> <line className="ql-stroke" x1="15" x2="11" y1="11" y2="15"></line> <rect className="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"></rect> </svg></button></span>
        
        </div>
    )
}

export default EditorHeader;