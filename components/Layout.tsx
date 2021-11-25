import HeadInfo from "./common/HeadInfo";

function Layout({children}:{children:any}){
    return(
        <div style={{paddingBottom:"80px"}}>
            <HeadInfo pageType="default" pagetitle="뉴블로 | 뉴블로" pagedescription ="뉴블로 설명글"></HeadInfo>
            {children}
        </div>
    )
}

export default Layout;