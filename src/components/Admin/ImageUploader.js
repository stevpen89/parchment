import React, { Component } from 'react';
import './ImageUploader.css';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';

class ImageUploader extends Component {
	constructor () {
		super()
		this.state = {
			isUploading: false,
      images: [],
      url: 'http://via.placeholder.com/450x450',
      value: ''
		}
	}

  getSignedRequest = ([file]) => {
    this.setState({isUploading: true})
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios.get('/s3/signature', {
      params: {
        'file-name': fileName,
        'file-type': file.type
      }
    }).then( (response) => {
      const { signedRequest, url } = response.data 
      this.uploadFile(file, signedRequest, url)
    }).catch( err => {
      console.log(err)
    })
  }

  uploadFile = (file, signedRequest, url) => {
    
    var options = {
      headers: {
        'Content-Type': file.type
      }
    };

    axios.put(signedRequest, file, options)
    .then( response => {
      this.setState({isUploading: false, url: url})
      // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
    })
    .catch( err => {
			this.setState({isUploading: false})
      if(err.response.status === 403) {
        alert('Error 403, Internal Error\n' + err.stack)
      } else {
        alert(`ERROR: ${err.status}\n ${err.stack}`)
      }
    })
  }

	render() {
		return (
			<div className="content">
				<h1>Upload</h1>
        <h1>{this.state.url}</h1>
        <img src={ this.state.url } alt='' width='450px' />    
				 
				<Dropzone 
          onDropAccepted={this.getSignedRequest}
          className="upload-zone"
          accept='image/*'
          multiple={false} >
          
          { this.state.isUploading 
            ?  <GridLoader />
            : <p>Drag Images Here</p>
          }
          
				</Dropzone>
			</div>
		)
	}
}

export default ImageUploader