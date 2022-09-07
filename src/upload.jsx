import { useState } from "react";
import FFMPEG from "react-ffmpeg";
import axios from "axios";

const Upload = () => {
  const [videoData, setvideoData] = useState();

  async function onFileChange(e) {
    e.preventDefault();
    const file = e.target.files[0];

    await FFMPEG.process(
      file,
      '-metadata location="" -metadata location-eng="" -metadata author="" -c:v copy -c:a copy',
      function (e) {
        const video = e.result;
        console.log(video);
        setvideoData(video);
      }.bind(this)
    );
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
      console.log(response);
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
    </div>
  );
};

export default Upload;
