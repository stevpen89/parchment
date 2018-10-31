const aws  = require ( 'aws-sdk' )

module.exports = {
	signature: (req, res) => {

		const { S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY } = process.env
		aws.config.update ( {accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY, region: 'us-east-1'} );

		const s3 = new aws.S3();
		const fileName = req.query['file-name'];
		const fileType = req.query['file-type'];
		const s3Params = {
			Bucket      : S3_BUCKET,
			Key         : fileName,
			Expires     : 60,
			ContentType : fileType,
			ACL         : 'public-read'
		};
	
		s3.getSignedUrl('putObject', s3Params, (err, data) => {
			if (err) {
				console.log(err);
				return res.end();
			}
			const returnData = {
				signedRequest : data,
				url           : `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
			};
	
			return res.send(returnData)
		});
	}
}
