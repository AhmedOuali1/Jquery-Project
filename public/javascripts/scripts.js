$(document).ready(function () {
  
  // Le bouton "lancer la requete ajax"
  $('#start').on('click', function(){
    $.ajax({
      url: 'https://jquery-project-xcapo32.c9users.io/etudiants',
      success: function (data) {
        $("tbody").children().remove();
        console.log(data)
        lancerNotifSucces('succes', 'Liste Chargé (Recherche Terminé)');
        for (var i = 0; i < data.obj.length; i++) {
          ajoutEtudiant(data.obj[i])
        }
      }
    });
  })
  
  // Boutton save du modal 
    $('#save').on('click', function () {
      $.post(
        "https://jquery-project-xcapo32.c9users.io/etudiant",
        {
          firstName: $('#firstName').val(),
          lastName: $('#lastName').val(),
          intro: $('#intro').val(),
          email: $('#mail').val(),
          departement: $('#departement').val(),
          phone: $('#phone').val()
        }, 
        function(result){
          console.log(result);
          ajoutEtudiant(result.obj)
          $('#squarespaceModal').modal('toggle');
          lancerNotifSucces(result.title, result.message);
        }
      );
    })
    
    // Boutton supprimer 
    $('#delete').on('click', function () {
      var idChecked = [];
      $('.selected').each(function (box) {
      	idChecked.push($(this).attr('data-status'))
      });
      console.log(idChecked)
      $.ajax({
        url: 'https://jquery-project-xcapo32.c9users.io/delete/etudiant',
        type: 'POST',
        data: {'idChecked': idChecked},
        success: function(result) {
          console.log(result)
          deleteEtudiants(result.obj)
        }
      });
    })
    
    
    // Ajout du code HTML d'un etudiant aprés création
    function ajoutEtudiant(etudiant) {
      $('<tr data-status="'+etudiant._id+'" id="'+etudiant._id+'"><td><div class="ckbox"><input type="checkbox" id="a'+etudiant._id+'" ><label for="a'+etudiant._id+'"></label></div></td><td><a href="javascript:;" class="star star-checked"><i class="glyphicon glyphicon-star"></i></a></td><td><div class="media"><a href="#" class="pull-left"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" class="media-photo"></a><div class="media-body"><span class="media-meta pull-right">Febrero 13, 2016</span><h4 class="title">'+etudiant.firstName+' '+etudiant.lastName+'<span class="pull-right pendiente">(Pendiente)</span></h4><p class="summary">'+etudiant.email+'</p></div></div></td></tr>').appendTo($('tbody'));
      $('.ckbox label').on('click', function () {
        $(this).parents('tr').toggleClass('selected');
      });
    }
    
    // Supression du code HTML qui correspond aux etudiants supprimé 
    function deleteEtudiants(etudiants) {
      for (var i = 0; i < etudiants.length; i++) {
        var str= '#'+etudiants[i];
        console.log(str)
        $(str).remove()  
      }
    }
    
    // La fonction de Notification
    function lancerNotifSucces(title, message) {
      if($('.notice-success').css("display") == "none"){
        $('.notice-success').prepend('<div><strong>'+title+'</strong> : '+message+'</div>')
        $('.notice-success').css('display', '').fadeIn('slow');
      }
      setTimeout(function(){
        $('.notice-success').css('display', 'none');
        $('.notice-success').children().remove();
      }, 7000);
    }

 });