import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Paragraph from "@editorjs/paragraph";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image';
import axios from "axios";

const imgSendApi = async(img:any)=>{
  const data = new FormData();
  data.append("img",img);
  data.append("email",JSON.parse(sessionStorage.getItem("user_info")!).email);
  data.append("hash",JSON.parse(sessionStorage.getItem("user_info")!).hash);
  data.append("type","imgUpload");
  try{
      await axios(
      {
          method:"post",
          url:"https://newblo.co.kr/api2/blog.php",
          data
      }
      ).then((e)=>{
          console.log(e);
      if(e.data.ret_code ==="0000"){
      }else{
      }
      })
  }catch{
  }
}

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  linkTool: LinkTool,
  image:{
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file:any){
          // your own uploading logic here
          return MyAjax.upload(file).then(() => {
            return {
              success: 1,
              file: {
                url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
              }
            };
          });
        },
        uploadByUrl(url:any){
          // your ajax request for uploading
          return MyAjax.upload(file).then(() => {
            return {
              success: 1,
              file: {
                url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
              }
            }
          })
        }
      }
    }
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
