window.KSC = window.KSC || {};

var utils = {
    /**
     * 请求api
     * @param url 请求地址
     * @param type 请求类型
     * @param dataGet get数据
     * @param dataPost post数据
     * @returns {Promise}
     */
    api: function (url, type, dataGet, dataPost){
        var deferred = $.Deferred();

        if(dataGet){
            url = url + (~url.indexOf('?') ? '&' : '?') + $.param(dataGet);
        }

        var ajax = $.ajax({
            url: url,
            type: type || 'get',
            dataType: 'json',
            data: dataPost,
            traditional: true,
            cache: false
        }).done(function(res){           
            deferred.resolve(res);           
        }).fail(function(e){
            deferred.reject(e);
        });

        var ret = deferred.promise();
        ret.abort = ajax.abort;
        return ret;
    },
    getUrlParams: function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var aResult = window.location.search.substr(1).match(reg); 
        if (aResult != null) return unescape(aResult[2]);
        return '';
    }
};

$.extend(KSC, utils);