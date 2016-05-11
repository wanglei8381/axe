var requestService = {
    getInfo : function(options){
        console.log('------>get');
        options.success({
            username : 'wanglei',
            sex : '未知',
            specialty : ['游泳','写代码'],
            major : '计算机',
            remark : '备注之中'
        });
    },
    saveInfo : function(options){
        console.log('------>save');
        options.success({
            id : 11111
        });
    },
    updateInfo : function(options){
        console.log('------>update');
        options.success();
    }
};