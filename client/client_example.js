Template.example.events({
  'change input': function(ev) {
    _.each(ev.srcElement.files, function(file) {
      Meteor.saveFile(file, file.name);
    });
  }
});
