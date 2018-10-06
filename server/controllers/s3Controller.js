const AWS  = require ( 'aws-sdk' ),
      path = require ( 'path' ),
			fs   = require ( 'fs' )

module.exports = {
	bucket: () => {

		const { S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET } = process.env
		AWS.config.update ( {accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY} );

		let s3       = new AWS.S3();
		let filePath = "./file.txt";
		let params   = { Bucket: S3_BUCKET, Body: fs.createReadStream(filePath), Key: `file/${Date.now()}_${path.basename(filePath)}`	};

		s3.upload(params, function (err, data) {
			err  ? console.log ( "Error", err ) : null;
			data ? console.log ( "Uploaded in:", data.Location ) : null;
		});

	}
}