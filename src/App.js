import axios from "axios";
import React, { Component } from "react";
import FFMPEG from "react-ffmpeg";

class App extends Component {
  state = { selectedFile: null };

  async onFileChange(e) {
    const file = e.target.files[0];
    await FFMPEG.process(
      file,
      '-metadata location="" -metadata location-eng="" -metadata author="" -c:v copy -c:a copy',
      function (e) {
        const video = e.result;
        console.log(video);

        const formData = new FormData();

        // Update the formData object
        formData.append("myFile", video);
        // axios.post("uploads", formData);
      }.bind(this)
    );
  }

  // On file upload (click the upload button)
  onFileUpload = () => {};

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4></h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Video Upload</h1>
        <h3>File Upload ffmpeg</h3>
        <div>
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={this.onFileChange}
          />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
