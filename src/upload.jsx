import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [videoData, setvideoData] = useState();
  const [link, setLink] = useState();

  async function onFileChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    setvideoData(file);
  }

  const onFileUpload = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("myfile", videoData);

    axios({
      method: "post",
      url: "http://localhost:8045/upload",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      setLink(response.data);
    });
  };

  return (
    <div>
      <h1>Video Upload</h1>
      <h3>File Upload ffmpeg</h3>
      {/* <div>
        <input
          type="file"
          accept="audio/*,video/*"
          onChange={(e) => onFileChange(e)}
        />
        <button onClick={onFileUpload}>Upload!</button>
      </div> */}

      <form>
        <div className="custom-file">
          <input
            onChange={(e) => onFileChange(e)}
            name="myfile"
            type="file"
            accept="audio/*,video/*"
            lang="en"
          ></input>
          <span>
            <button onClick={onFileUpload}>Upload!</button>
          </span>
        </div>
      </form>
      {link ? <p>Your Compressed file has been compressed!</p> : <></>}
    </div>
  );
};

export default Upload;
