/**
 * Post model
 * @desc standar mongoose model, without requirements
 * @require db.js
 */
var mongoose = require('mongoose'),
  postSchema = mongoose.Schema({
    title: String,
    categories: Array,
    status: String,
    date: {
      type: Date,
      default: Date.now
    }
  }, {
    collection: 'Posts'
  });

/**
 * Validations
 * @docs Mongoose middleware: http://mongoosejs.com/docs/middleware.html
 **/
postSchema.pre('save', function(next) {
  var err, limitTitle = 5;

  if (this.title.length < limitTitle) {
    err = new Error('The title should contains at least ' + limitTitle + ' characters');
    next(err);
  } else {
    next();
  }
});

/**
 * Async Actions
 * @docs Mongoose middleware: http://mongoosejs.com/docs/middleware.html
 **/
postSchema.pre('save', true, function(next, done) {
  console.log('The post < ' + this.title + ' > will be tweeted');
  next();
  done();
  /* asynTask(done());
   * Here you can do whatever asynchronous action, like send an email,
   * notifications, cron task, tweet...
   */
});

module.exports = {
  Post: mongoose.model('Posts', postSchema)
};