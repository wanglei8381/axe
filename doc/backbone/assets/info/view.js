var InfoView = Backbone.View.extend({
    initialize: function () {
        this.stickit();
    },
    el: 'form',
    events: {
        'click #submit': 'save'
    },
    bindings: {
        '#username': 'username',
        'input[name="sex"]': 'sex',
        'input[name="specialty"]': 'specialty',
        '#major': 'major',
        '#remark': 'remark'
    },
    model: new InfoModel,
    load: function (id) {
        this.model.set('id', id);
        this.model.fetch();
    },
    save: function () {
        console.log(this.model.attributes);

        this.model.on('invalid', function (model, error, options) {
            alert(error);
        });

        this.model.save();

    }
});

var infoView = new InfoView();
//infoView.load(1);