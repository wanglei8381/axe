var requestService = {
    list: function (options) {
        console.log('------>list');
        options.success([
            {
                title: 'wanglei1',
                src: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=917687762,2107424755&fm=80',
                time: '2016-03-12   '
            },
            {
                title: 'liwei',
                src: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3654983606,4037842310&fm=80',
                time: '2016-03-13   '
            },
            {
                title: 'tingting',
                src: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3052160731,3863597563&fm=80',
                time: '2016-03-14   '
            }
        ]);
    }
};