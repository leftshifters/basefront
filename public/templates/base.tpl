<script id="base" type="text/template">
  <ul class="list-group js-servers">
  </ul>
  <div class="add-form">

    <div class="form-group">
      <label for="hostname">Hostname</label>
      <input type="text" class="form-control" id="hostname" placeholder="localhost">
    </div>

    <div class="form-group">
      <label for="port">Port</label>
      <input type="text" class="form-control" id="port" placeholder="27017">
    </div>

    <div class="form-group">
      <label for="alias">Alias</label>
      <input type="text" class="form-control" id="alias" placeholder="mongo">
    </div>

    <button type="submit" class="btn btn-default js-add-server">Add</button>

  </div>
</script>