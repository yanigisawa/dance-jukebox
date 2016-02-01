var DanceParty = (function () {
  var requests = [
    { dance: "Tango", songName: "Love Gun" },
    { dance: "Hustle", songName: null },
    { dance: "Rumba", songName: null },
    { dance: "Two Step", songName: "Ten Rounds" },
    { dance: "W.C. Swing", songName: null },
    { dance: "Bolero", songName: null },
    { dance: "Swing", songName: null },
    { dance: "Samba", songName: null },
  ];

  return { 
    getRequests : function () { return requests; }
  };

})();


$(function () {
  var requests = DanceParty.getRequests();
  $(requests).each(function(i) {
    $("#queueRequests").append("<li>" + requests[i].dance + "</li>");
  });

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
      $("#queueRequests").append("<li>" + $(this).val() + "</li>");
      requests.push({ dance: $(this).val() });
    } else {
      showErrorMessage($(this).val() + " is already requested.");
    }
  });

  function renderRequestTable(){
    var template = $("#dj-table").html();
    Mustache.parse(template);
    var rows = [];

    for (var i = 0; i < requests.length; i++) {
      rows.push( {
        index : i + 1,
        dance : requests[i].dance,
        songName : requests[i].songName,
      });
    }
    var tableRendered = Mustache.render(template, { rows : rows});
    $("#requestTable tbody").html(tableRendered);
    $("#request-count").html(requests.length);
  }

  function showDjInfoMessage(message) {
    $("#dj-alert-message").show();
    $("#dj-info-message").append(message);
  }

  renderRequestTable();
  $("#requestTable tbody").on("click", "button", function() {
    $("#dj-alert-message").hide();
    $("#dj-info-message").html("");
    var index = $(this).val() - 1;
    console.log($(this).text());
    var removedItems = requests.splice(index, 1);
    showDjInfoMessage("Removed " + removedItems[0].dance);
    renderRequestTable();
  });


});
