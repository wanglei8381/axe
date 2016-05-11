var itemTemplate = '';
$.ajax({
    url: 'assets/list/item.html',
    success: function (html) {
        itemTemplate = html;
    },
    async: false
});

var InfoView = Backbone.View.extend({
    initialize: function (options) {
        this.baseView = options.baseView;
        this.render();
    },
    template: _.template(itemTemplate),
    render: function () {
        if (this.template) {
            this.$el = $(this.template(this.model.attributes));
        }
    }
});

var ListView = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.collection, 'add', this.add);
    },
    el: '#list',
    collection: new InfoList,
    views: {},
    load: function () {
        this.collection.fetch();
    },
    add: function (model) {
        var infoView = new InfoView({
            model: model,
            baseView: this
        });
        this.views[infoView.cid] = infoView;
        this.$el.append(infoView.$el);
    }
});

var listView = new ListView();
listView.load();