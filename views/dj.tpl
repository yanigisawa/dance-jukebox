% rebase('base.tpl', title = 'DJ Page')
  <p class="lead">Requested Dances appear below</p>

  <div id="dj-alert-message" class="alert alert-info alert-dismissible" style="display: none;" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <span id="dj-info-message"></span>
  </div>


  <div class="row">
    <div class="col-md-12">
      <h3 class="">Queue <small>(Count <span id="request-count"></span>)</small></h3>
        <table class="table table-striped table-hover" id="requestTable">
          <thead>
            <tr><th>#</th><th>Dance</th><th>Song Name</th><th>Mark Played</th></tr>
          </thead>
          <tbody>
          </tbody>
        </table>
    </div>
  </div>


