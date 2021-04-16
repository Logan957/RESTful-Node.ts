function connect(){
    const mongoose = require('mongoose');
    var dbURI = "mongodb+srv://mauzzz0:autogeneratedsecurepassword@cluster0.mr2pd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    mongoose.connection.on('connected', function(){
        console.log('Mongoose connected to ' + dbURI);
    })
    
    mongoose.connection.on('error', function(err){
        console.log('Mongoose connection error' + err);
    })
    
    mongoose.connection.on('disconnected', function(){
        console.log('Mongoose disconnected');
    })
    
    process.once('SIGUSR2', function(){
        gracefulShutdown('nodemon restart', function(){
            process.kill(process.pid, 'SIGUSR2');
        })
    })
    
    process.on('SIGINT', function(){
        gracefulShutdown('app termination', function(){
            process.exit(0);
        })
    })
    
    process.on('SIGTERM', function(){
        gracefulShutdown('app shutdown', function(){
            process.exit(0);
        })
    })
    
    var gracefulShutdown = function(msg, callback) {
        mongoose.connection.close(function(){
            console.log('Mongose disconnected through ' + msg);
            callback();
        })
    }
}

exports.connect = connect