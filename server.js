var 
  timeEnd = Date.now(),

  log = (req, reason) => {
    let ip = req.ip,
        ip_length = 15 - ip.length,
        
        url = decodeURIComponent(req.originalUrl.replace(/\+/g,' ')),
        url_length = 30 - url.length;
        
    ip  = ip  + new Array(ip_length + 1).join(' ');
    url = url + new Array(url_length + 1).join(' ');

    console.log(`\x1b[36m${ip}\x1b[0m | ${url} | ${Date()} \x1b[41m\x1b[30m${reason || ''}\x1b[0m`);
  };

const
  Koa = require('koa'),

  staticCache = require('koa-static-cache'),
     compress = require('koa-compress'),
       helmet = require('koa-helmet'),
       router = require('koa-router')(),
        serve = require('koa-static'),
          Pug = require('koa-pug'),
  
  app = new Koa(),
  pug = new Pug({
    viewPath: './web',
    basedir: './web',
    app: app
  });
  
app.use(serve('./web'));

app.use(helmet({ dnsPrefetchControl: { allow: true } }));
app.use(staticCache('./web', { maxAge: 365 * 24 * 60 * 60 }));
app.use(compress({
  level: 9,
  flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

router.get('/',        ctx => { ctx.render('pages/intro');   log(ctx); });
router.get('/about',   ctx => { ctx.render('pages/about');   log(ctx); });
router.get('/support', ctx => { ctx.render('pages/support'); log(ctx); });

router.get('/editor/pony', ctx => {
  if (ctx.query.g !== 'female' ) {  // g is gender
    ctx.redirect('/');
    log(ctx, 'UNKNOWN DATA');
  } else {
    ctx.render('pages/editor/editor');
    log(ctx);
  }
});

router.get('*', ctx => {
  ctx.redirect('/');
  log(ctx, 'UNKNOWN PAGE');
});

app.use(router.routes());

app.listen(process.env.PORT || 3000, err => {
  if (err) { return console.log('Happened something bad!', err); }
  console.log(`\x1b[33m Server ready, port: \x1b[35m${process.env.PORT || 3000}\x1b[0m | ${Date.now() - timeEnd} msec`);
});