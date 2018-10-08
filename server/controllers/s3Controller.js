const AWS  = require ( 'aws-sdk' ),
      path = require ( 'path' ),
			fs   = require ( 'fs' )

module.exports = {
	bucket: () => {

		const { S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET } = process.env
		//configuring the s3 bucket's access keys
		AWS.config.update ( {accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY} );

		//declaring s3
		let s3 = new AWS.S3();
		//the file to be uploaded
		let filePath = "./file.txt";
		//the location in s3 to be saved
		let params = { Bucket: S3_BUCKET, Body: fs.createReadStream(filePath), Key: `file/${Date.now()}_${path.basename(filePath)}`	};

		s3.upload(params, function (err, data) {
			//determines if upload is successful or not
			err  ? console.log ( "Error", err ) : null;
			data ? console.log ( "Uploaded in:", data.Location ) : null;
		});

	}
}