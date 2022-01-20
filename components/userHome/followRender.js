import * as React from 'react';
import Link from 'next/link';

function followRender({item}){
    console.log(item);
    return(
        <Link href={`/${item.blogName}/${item._id}`}>
            <a className="userArticle">
                <div>
                    <div style={{
                        width:"100%",
                        justifyContent:"space-between",
                        }}>
                            <div className="userArticle__date">{item.createAt}</div>
                        <div>
                            <h4 className="userArticle__title">{item.title}</h4>
                            <p className="userArticle__summary">{item.summary}</p>
                        </div>
                    </div>
                </div>
                <div className='userArticle__thumbnail_gradient'>
                    {(!item.thumbnail||item.thumbnail === ""||item.thumbnail !== "undefined")&&
                    <img className="userArticle__thumbnail" src={item.thumbnail}>
                    </img>}
                </div>
            </a>
        </Link>
    )
}

export default followRender;