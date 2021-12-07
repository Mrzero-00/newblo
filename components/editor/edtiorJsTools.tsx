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
  let ImgData:string="dd";
  try{
      await axios(
      {
          method:"post",
          url:"https://proveit.cafe24.com/api2/blog.php",
          data
      }
      ).then((e)=>{
        if(e.data.ret_code ==="0000"){
          ImgData = e.data.img;
        }else{  
        }
      })
  }catch{
  }
  return ImgData;
}

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  linkTool: LinkTool,
  image: {
    class: ImageTool,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile(file){
          // your own uploading logic here
          return imgSendApi(file).then((e) => {
            return {
              success: 1,
              file: {
                url: `https://proveit.cafe24.com${e}`,
                // any other image data you want to store, such as width, height, color, extension, etc
              }
            };
          });
        },

        /**
         * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
         * @param {string} url - pasted image URL
         * @return {Promise.<{success, file: {url}}>}
         */
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
