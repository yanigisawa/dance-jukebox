var DanceParty = (function () {
  var requests = [
  ];

  return { 
    getRequests : function () { return requests; }
  };

})();


$(function () {
  var socket = io.connect('http://' + document.domain + ':' + location.port);

  var requests = DanceParty.getRequests();

  function hasExistingRequest(danceName) {
    for (var i = 0; i < requests.length; i++) {
      if (danceName === requests[i].dance) {
        return true;
      }
    }

    return false;
  };

  function showErrorMessage(message){
    $("#errorRow").show();
    $("#error-message").append(message);
  };

  $(".btn-requests").click(function() {
    $("#errorRow").hide();
    $("#error-message").html("");
    if (requests.length === 10) { 
      showErrorMessage("Max Request Limit Reached."); 
      return ;
    }
    if (!hasExistingRequest($(this).val())) {
      $('.btn-requests').prop('disabled', true);
      socket.emit('request', { dance: $(this).val(), songName: null });
      getRequests()
    } else {
      showErrorMessage($(this).val() + " is already requested.");
    }
  });

  function showDjInfoMessage(message) {
    $("#dj-alert-message").show();
    $("#dj-info-message").append(message);
  }

  function renderRequestTable(){
    var template_html = '{{ #rows }} ' +
        '<tr>' +
        '  <td>{{ index }}</td>' +
        '  <td>{{ dance }}</td>' +
        '  <td>{{ songName }}</td>'+
        '  <td><button class="btn btn-danger btn-remove-request" value={{ uuid }}>Remove</button></td>' +
        '</tr>' +
        '{{ /rows }}';
    var template = template_html; 
    Mustache.parse(template);
    var rows = [];

    for (var i = 0; i < requests.length; i++) {
      rows.push( {
        index : i + 1,
        dance : requests[i].dance,
        songName : requests[i].songName,
        uuid : requests[i].uuid
      });
    }
    var tableRendered = Mustache.render(template, { rows : rows});
    $("#requestTable tbody").html(tableRendered);
    $("#request-count").html(requests.length);
  }

  function renderJukeBox() {
    console.log("render JukeBox: " + requests.length);
    $("#queueRequests").html("");
    $(requests).each(function(i) {
      $("#queueRequests").append("<li>" + requests[i].dance + "</li>");
    });
    $('.btn-requests').prop('disabled', false);
  }

  function renderClientUi() {
    renderRequestTable();
    renderJukeBox();
  }

  $("#requestTable tbody").on("click", "button", function() {
    $("#dj-alert-message").hide();
    $("#dj-info-message").html("");
    var uuid = $(this).val();
    var itemToRemove;
    for (var i = 0; i < requests.length; i++) {
      if (requests[i].uuid == uuid) {
        itemToRemove = requests[i];
        break;
      }
    }
    showDjInfoMessage("Removed " + itemToRemove.dance);
    renderRequestTable();
    socket.emit('removedDance', itemToRemove);
    getRequests()
  });

  function getRequests() {
    $.get('/requests', function (data) {
      requests = data;
      renderClientUi();
    }, 'json');
  }

  getRequests();

  socket.on('newRequest', function (request) {
    console.log("received newRequest");
    requests.push(request);
    renderClientUi();
  });


  socket.on('requestRemoved', function(request) {
    console.log("received requestRemoved");
    getRequests();
    renderClientUi();
  });

});
