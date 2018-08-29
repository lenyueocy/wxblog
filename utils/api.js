const apiUrl = 'https://wxblog.lenyue.top/';
const apiVersion = 'v1';
const clientId = 'lenyueblog';
const clientSecret = 'ed4c807905b8';

const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

const getBlogList = (params) => {
  wxRequest(params, apiUrl+apiVersion+params.query.urlCode+'?page='+params.query.page);
  // wxRequest(params, `${apiUrl}${apiVersion}${params.query.urlCode}?page=${params.query.page}`);
};

const getBlogById = (params) => {
  wxRequest(params, apiUrl+apiVersion+params.query.urlCode+'?art_id='+params.query.blogId);
};

const getBlogByTag = (params) => {
  wxRequest(params, `${apiUrl}/posts?page=${params.query.page}&limit=${params.query.limit}&client_id=${clientId}&client_secret=${clientSecret}&filter=${params.query.filter}`);
};
const api = apiUrl+apiVersion
module.exports = {
  getBlogList,
  getBlogById,
  getBlogByTag,
  apiUrl,
};
