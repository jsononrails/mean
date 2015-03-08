var
	mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema	 = mongoose.Schema,
	
	UserSchema = new Schema({
		firstName: 	{
			type: String,
			trim: true
		},

		lastName: 	{
			type: String,
			trim: true
		},
		
		email: 		{
			type: String,
			trim: true,
			unique: true,
			match: /.+\@.+\..+/,
			required: true
		},
		
		username: 	{
			type: String,
			trim: true,
			unique: true,
			required: true
		},
		
		password: 	{
			type: String,
			trim: true,
			required: true,
			validate: [
			function(password) {
				return password.length >= 6;
			},
			'Password should be at least 6 characters in length.'
			]
		},
		
		salt: {
			type: String
		},
		
		provider: {
			type: String,
			required: 'Provider is required'
		},
		
		providerId: String,
		providerData: {},
		
		website: {
			type: String,
			
			get: function(url) {
				if(!url) {
					return url;
				} else {
					if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
						url = 'http://' + url;
					}
					
					return url;
				}
			},
			
			set: function(url) {
				if(!url) {
					return url;
				} else {
					if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
						url = 'http://' + url;
					}
					
					return url;
				}
			}
		},
		
		role: {
			type: String,
			enum: ['Admin', 'Owner', 'User']
		},
		
		created: 	{
			type: Date,
			default: Date.now
		}
	});

// virtual attributes
UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// custom static methods
UserSchema.statics.findOneByUsername = function(username, callback) {
	this.findOne({ username: new RegExp(username, 'i')}, callback);
};

UserSchema.statics.findUniqueUsername = function(username, sufix, callback) {
	var _this = this;
	
	var possibleUsername = username + (suffix || '');
	
	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if(!err) {
			if(!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

// custom instance methods
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// pre middleware
UserSchema.pre('save', function(next) {
	if(this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

// post middleware
UserSchema.post('save', function(next) {
	if(this.isNew) {
		console.log('A new user was created.');
	} else {
		console.log('A user updated their details');
	}
});

UserSchema.set('toJSON', { getters: true, virtuals: true })	;
mongoose.model('User', UserSchema);