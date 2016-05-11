var InfoModel = Backbone.Model.extend({
    validate: function (attr, options) {
        if (!attr.username) {
            return '姓名不能为空';
        }
        if (attr.remark && attr.remark.length > 5) {
            return '备注最多5个字符';
        }
    },
    service: requestService,
    sync: function (method, model, options) {
        switch (method) {
            case 'create':
                this.service.saveInfo(options);
                break;
            case 'update':
                this.service.updateInfo(options);
                break;
            case 'patch':
                break;
            case 'read':
                this.service.getInfo(options);
                break;
            case 'delete':
                break;
        }
    }
});