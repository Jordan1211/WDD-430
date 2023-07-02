var Sequence = require("../models/sequence");

var maxBlogId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxBlogId = sequence.maxBlogId;
    })
    .catch((err) => {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    });
}
SequenceGenerator.prototype.nextId =  function (collectionType) {
  var updateObject = {};
  var nextId;
  switch (collectionType) {
    case "blogpost":
      maxBlogId++;
      updateObject = { maxBlogId: maxBlogId };
      nextId = maxBlogId;
      break;
    default:
      return -1;
  }
  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
  .then(result => console.log(result))
  .catch((err) => {
        console.log("nextId error = ", err);
        return null;
  });
  return nextId;
};
module.exports = new SequenceGenerator();