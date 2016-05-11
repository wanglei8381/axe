var InfoModel = Backbone.Model.extend({
});

var InfoList = Backbone.Collection.extend({
    model: InfoModel,
    service: requestService,
    sync: function (method, model, options) {
        switch (method) {
            case 'read':
                this.service.list(options);
                break;
        }
    }
});