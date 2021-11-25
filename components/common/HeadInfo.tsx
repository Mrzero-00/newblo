import Head from 'next/head';

function HeadInfo({pagetitle,pagedescription,pageType} : {pagetitle:any,pagedescription:any,pageType:any}){
    return(
        <>
        {pageType==="default"?
            <Head>
                <title>뉴블로 | 뉴블로</title>
                <meta name="description" content="뉴블로 기본 설명글"/>
            </Head>
            :
            <Head>
                <title>{pagetitle}</title>
                <meta name="description" content={pagedescription}/>
            </Head>
        }
        </>
    )
}

HeadInfo.defaultProps={
    title:"뉴블로 | 뉴블로",
    description:"뉴블로 설명글",
    pageType:"null"
}

export default HeadInfo;