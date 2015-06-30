Template.articlesList.helpers({
    totalArticles: function() {
        return Articles.find().count();
    },
    articles: function() {
        return Articles.find();
    }
});


Template.articleItem.helpers({
    formatEditor: function() {
        return editor = Meteor.users.findOne(this.editor).profile.name
    },
    formatIssue: function() {
        var issue = Issues.findOne(articleParentIssueId(this._id));
        if (issue) {
            return issue.issueNumber.year +  "." + issue.issueNumber.edition
        } else {
            return "-"
        }
    },
    parentIssue: function () {
        return Issues.findOne(articleParentIssueId(this._id));
    },
    parentIssueId: function () {
        return Issues.findOne(articleParentIssueId(this._id))._id;
    }
});

Template.articleItem.events({
    click: function() {
        Router.go('/articles/' + this._id);
    }
});


Template.articlePgIncDec.helpers({
    canDecrease: function() {
        return pages > 1;
    }
});

Template.articlePgIncDec.events({
    "click .pgInc": function() {
        Articles.update({_id: this._id}, {$inc: {pages: 1}});
        return false;
    },
    "click .pgDec": function() {
        if (this.pages > 1) {
            Articles.update({_id: this._id}, {$inc: {pages: -1}});
            return false;
        }
    }
});