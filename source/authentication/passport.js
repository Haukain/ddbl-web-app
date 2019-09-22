var bCrypt = require('bcrypt');
 
module.exports = function(passport, user) {
 
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
 
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
 
        function(req, email, password, done) {
 
            var generateHash  = function(password) {
                
                let salt = bCrypt.genSaltSync(8)
                return {salt : salt, hash : bCrypt.hashSync(password, bCrypt.genSaltSync(8))}
 
            };
 
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
 
                if (user)
                {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else
                {
                    var hashPassword = generateHash(password);
                    var data =
                        {
                            email: email,
                            hash: hashPassword.hash,
                            salt: hashPassword.salt,
                            name: 'name'
                        };

                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false,{ message: 'No user creation' });
                        }
                        else {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-login', new LocalStrategy(
    
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
    
            var User = user;
    
            var isValidPassword = function(password, hash) {
                return bCrypt.compareSync(password, hash);
            }

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }
                if (!isValidPassword(password, user.hash)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    
    ));

    //serialize
    passport.serializeUser(function(user, done) {
        console.log(user)
        done(null, user.id);
    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {
        console.log(id)
        User.findById(id).then(function(user) {
    
            if (user) {
                console.log(user)
                done(null, user.get());
    
            } else {
    
                done(user.errors, null);
    
            }
    
        });
    
    });
}