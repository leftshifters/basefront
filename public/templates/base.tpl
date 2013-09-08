<script id="base" type="text/template">
  <div class="list-group js-servers">
  </div>
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

<script id="databases" type="text/template">
  <div class="list-group js-databases">
  </div>

  <div class="add-form">
    <div class="form-group">
      <label for="dbname">Name</label>
      <input type="text" class="form-control" id="dbname" placeholder="awesomes">
    </div>

    <button type="submit" class="btn btn-default js-add-database">Add</button>
  </div>
</script>


<script id="collections" type="text/template">
  <div class="list-group js-collections">
  </div>

  <div class="add-form">
    <div class="form-group">
      <label for="collection-name">Collection</label>
      <input type="text" class="form-control" id="collection-name" placeholder="stuff">
    </div>

    <button type="submit" class="btn btn-default js-add-collection">Add</button>
  </div>
</script>

<script id="documents" type="text/template">
  <div class="list-group js-documents">
  </div>

  <button type="submit" class="btn btn-default btn-primary js-add-document">Add New</button>
</script>

<script id="document" type="text/template">
  <form class="document-modal">
    <textarea id="document-content" class="zen-mode go-zen">{ foo: 'bar' }</textarea>
  </form>
</script>