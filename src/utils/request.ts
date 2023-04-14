import request from 'superagent';


export default (method0, uri, ...args) => {
    const method = method0.toLowerCase();

    let qs;
    let post;
    let header;
    let attaches = [];
    let skipError = false;

    if (typeof args[args.length - 1] === 'boolean') {
      skipError = args.pop();
    }

    // 支援動態參數
    if (args.length === 1) {
      if (method === 'get') {
        [qs] = args;
        post = {};
      }

      if (method !== 'get') {
        qs = {};
        [post] = args;
      }
    }

    if (args.length === 2) {
      if (method === 'get') {
        [qs, header] = args;
      }

      if (method !== 'get') {
        [qs, post] = args;
      }
    }

    if (args.length === 3) {
      [qs, post, attaches] = args;
    }

    const req = request[method](uri)
      .query(qs);

    // 迅付端參數需要從Headers帶入，故使用set()傳參數
    if (header) {
      Object.entries(header).forEach(([key, value]) => {
        req.set(key, value);
      });
    }

    if (attaches.length > 0 && !!post) {
      Object.keys(post).forEach((key) => {
        req.field(key, post[key]);
      });
    }

    if (attaches.length === 0) {
      req.send(post);
    }

    attaches.forEach((f) => {
      req.attach(f.name, f.file, f.options);
    });

    return req
      .then(({ body: out, status }) => {
        out.statusCode = status;

        // if (!out || out.result !== 'ok') {
        //   !skipError && global.setError && setError(null, out);
        //   return out;
        // }

        return out;
      })
      .catch((err) => {
        if (err.response && err.response.body) {
          err.response.body.statusCode = err.response.status;
        }

        if (err.response && err.response.body && err.response.body.result !== 'ok') {
          // isLogout(err.response.body, skipError);
          // isMaintain(err.response.body, skipError);
          // notIPArea(err.response.body, skipError);
          // isNonSupported(err.response.body);

        //   !skipError && global.setError && setError(null, err.response.body);
          return err.response.body;
        }

        // !skipError && global.setError && setError(err);

        if ((err && err.response) || (err?.status === 504)) {
          return err?.response?.body;
        }

        return err;
      });
  };
