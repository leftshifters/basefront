var Router = Backbone.Router.extend({

  routes: {
    '*actions': 'defaultRoute',
    'dbs': 'dbs'
  }

});

var app = new Router();
app.collections = {};
app.models = {};
app.views = {};

app.on('route:defaultRoute', function(actions) {
  var serverListView = new app.views.serverListView({
    el: '.base'
  });

  console.log(app.views);

  console.log(app.views.serverListView);

  console.log(serverListView);
  serverListView.render();

});

app.on('route:dbs', function(actions) {
  console.log('')
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
    "click .js-add-server": "addServer"
  },

  initialize: function() {
    this.servers = this.getServers();
    console.log('servers', this.servers);
  },

  render: function() {
    // var fragment = document.createDocumentFragment();
    var fragment = [];
    for (var i = 0, len = this.servers.length; i < len; ++i) {
      fragment.push('<li class="list-group-item">' + this.servers[i].alias + '</li>');
    }
    console.log(fragment.join(''));

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

    this.storeServer({
      hostname: hostname,
      port: port,
      alias: alias
    });

    this.render();
  }

});



// Start at the end
Backbone.history.start();