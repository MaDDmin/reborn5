import React, {Component} from 'react';
// use Fine Uploader UI for traditional endpoints
import qq from 'fine-uploader';

// You may replace "rows" w/ "legacy" or "gallery" depending on your needs
// This assumes you have a loader to handle importing css files, such as Webpack css-loader
import 'fine-uploader/fine-uploader/fine-uploader-gallery.min.css';

export default class Uploader extends Component {
  componentDidMount () {
    const fu = new qq.FineUploader({
      button: this.refs.fu
    })
  }

  render () {
    return <div ref='fu'>Upload!</div>
  }
};
