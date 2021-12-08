import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import CodeTool from "@editorjs/code";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image';
import axios from "axios";
import NestedList from '@editorjs/nested-list';


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
  list:{
    class: NestedList,
    inlineToolbar: true,
  },
  code :CodeTool,
  warning: Warning,
  // linkTool: {
  //   class: LinkTool,
  //   config: {
  //     endpoint: 'https://proveit.cafe24.com/fetchUrl', // Your backend endpoint for url data fetching
  //   }
  // },
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
            console.log(e);
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
  // raw: Raw,
  header: Header,
  quote: Quote,
  marker:{
    class: Marker,
    shortcut: 'Ctrl+M',
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: InlineCode,
  // simpleImage: SimpleImage,
}
