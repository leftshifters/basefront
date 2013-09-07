var Router = Backbone.Router.extend({

  routes: {
    'dbs': 'dbs',
    '*actions': 'defaultRoute'
  }

});

var app = new Router();
app.collections = {};
app.models = {};
app.views = {};



app.on('route:dbs', function(actions) {
  var databaseListView = new app.views.databaseListView({
    el: '.base'
  });

  databaseListView.render();
});

app.on('route:defaultRoute', function(actions) {
  var serverListView = new app.views.serverListView({
    el: '.base'
  });

  // console.log(app.views);

  // console.log(app.views.serverListView);

  // console.log(serverListView);
  serverListView.render();

});

// Base View
app.views.baseView = Backbone.View.extend({

});

// Base Collection
app.collections.baseCollection = Backbone.Collection.extend({

});

// Base Model
app.models.baseModel = Backbone.Model.extend({

});

// serverlist view
app.views.serverListView = app.views.baseView.extend({

  tpl: $('#base').text(),

  events: {
    "click .js-add-server": "addServer",
    "click .js-server-item": "selectServer"
  },

  initialize: function() {
    this.servers = this.getServers();
  },

  render: function() {
    var fragment = [];

    for (var i = 0, len = this.servers.length; i < len; ++i) {
      fragment.push('<a href="#" class="list-group-item js-server-item" data-alias="' + this.servers[i].alias + '" data-hostname="' + this.servers[i].hostname + '" data-port="' + this.servers[i].port + '">' + this.servers[i].alias + '</a>');
    }

    this.$el.html(this.tpl);
    this.$el.find('.js-servers').append(fragment.join(''));
    return this;
  },

  getServers: function() {
    var defaultServer = [];
    var servers = localStorage.getItem('servers');

    if (!servers) {
      localStorage.setItem('servers', JSON.stringify(defaultServer));
      servers = localStorage.getItem('servers');
    }

    if (servers) {
      servers = JSON.parse(servers);
    }

    return servers;
  },

  storeServer: function(server) {
    this.servers.push(server);
    localStorage.setItem('servers', JSON.stringify(this.servers));
  },

  addServer: function(e) {
    var $target = $(e.target);
    var hostname = this.$('#hostname').val();
    var port = this.$('#port').val();
    var alias = this.$('#alias').val();

    // Add validations
    if (!hostname || !port || !alias) return;

    this.storeServer({
      hostname: hostname,
      port: port,
      alias: alias
    });

    this.render();
  },

  selectServer: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    var hostname = $target.attr('data-hostname');
    var port = $target.attr('data-port');
    var alias = $target.attr('data-alias');

    console.log('hostname:', hostname);
    console.log('port:', port);
    console.log('alias:', alias);

    app.utils.setCookieItem('hostname', hostname, new Date(Date.now + app.COOKIE_MAX_AGE));
    app.utils.setCookieItem('port', port, new Date(Date.now + app.COOKIE_MAX_AGE));
    app.utils.setCookieItem('alias', alias, new Date(Date.now + app.COOKIE_MAX_AGE));

    app.navigate('/dbs', { trigger: true });

  }

});

// database list view
app.views.databaseListView = app.views.baseView.extend({
  tpl: $('#databases').text(),

  render: function() {
    this.$el.html(this.tpl);
    return this;
  },

  renderList: function() {

  }
});

// Utilities
app.utils = {
  getCookieItem: function (sKey) {
    if (!sKey || !this.hasCookieItem(sKey)) { return null; }
    return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
  },

  setCookieItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toGMTString();
          break;
      }
    }
    document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
  },

  removeCookieItem: function (sKey, sPath) {
    if (!sKey || !this.hasCookieItem(sKey)) { return; }
    document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
  },

  hasCookieItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }

};



// Start at the end
Backbone.history.start({ pushState: true });
