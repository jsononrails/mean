module.exports = {
	db: 'mongodb://localhost/mean-book',
	
	sessionSecret: '7794ebe2dcac4d20a4704d7a2ab2dc133ed0fcd0796740b7b5f8183b639cfb5a',
	
	facebook: {
		clientID: '495018637308024',
		clientSecret: '8827dd1a3b81e8f8305c7dfa294b5a3e',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	
	twitter: {
		clientID: 'Application Id',
		clientSecret: 'Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	
	google: {
		clientID: 'Application Id',
		clientSecret: 'Application Secret',
		callback: 'http://localhost:3000/oauth/google/callback'
	}
};