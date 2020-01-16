
import {jJerryWidgets} from '../../vendor/jjerry/jjerry-widgets.js';

export const Rq = (() => {

    function getName() {

        $('#txtNome').keyup(function(e){
            if(e.keyCode == 13) {

                let search = $('#txtNome').val();

                if(!search || search.length < 3) {return}

                $.getJSON('sys/sql.php?param1='+search, function(data){
                    $("#txtNome").val('');
                    
                    if(data.length == 0) {
                        jJerryWidgets(null, {
                            context: "Nenhuma Registro Encontrado !",
                            timein: 1,
                            timeout: 2500,
                            bgcolor: "#880000",
                            color: '#FEFEFE'
                        }).tooltip();
                        return;
                    }

                    jJerryWidgets("#modal", {
                        timeout: 0,
                        wide: true,
                        loop: false,
                        width: "800px",
                        bgcolor: "#FFFFFF",
                        color: "#000000",
                        bordercolor: "#EEEEEE",
                        bgscreen: "#000000"
                    }).modalOpen();

                    $("#modal_ul").html("");
                    
                    $(data).each(function(key, value) {
                        var $random = [];
                        var $id     = Math.floor(Math.random() * 1000000);
                        for(var x = 0; x <= $random.length; x++) {
                            if($random.indexOf($id) == -1) {
                                $random.push($id);
                                break;
                            } else {
                                $id = Math.floor(Math.random() * 1000000);
                            }
                        }
                        $("#modal_ul").append("<li id='li_"+$id+"'>" + value.nome + "</li>");
                        $("#li_"+$id).on("click", function(){
                            $("#txtNome").val(value.nome);
                            $("#idPessoa").val(value.id);
                            jJerryWidgets("#modal", {
                                wide: true,
                                width: "800px"
                            }).modalClose();
                        });
                    });
                });
            }
        });
    }

    function getData() {

        $("#btConsulta").click(function(){

            if($('#idPessoa').val() == "" || $('#txtNome').val() == "") {
                jJerryWidgets(null, {
                    context: "Informe um nome !",
                    timein: 1,
                    timeout: 2500,
                    bgcolor: "#8F1122",
                    color: '#FEFEFE'
                }).tooltip();
                return;
            }

            let $nm = $('#txtNome' ).val();
            let $id = $('#idPessoa').val();

            $.getJSON('sys/sql.php?param1='+$id+'&param2='+$nm, function(data){
                let $random = [];
                let $_id    = null;

                if(data.length == 0) {
                    jJerryWidgets(null, {
                        context: "Nenhum Registro Encontrado !",
                        timein: 1,
                        timeout: 2500,
                        bgcolor: "#8F1122",
                        color: '#FEFEFE'
                    }).tooltip();
                    return;
                }
                
                $("#data-panel").show();
                $("#data-panel").html('');

                $(data).each(function(key, value) {
                    
                    $_id = parseInt($random.length) + 1;
                    $random.push($_id);

                    $("#data-panel").append(
                        '<div id="div_panel_'+$_id+'" class="panel panel-primary">'
                            + '<div class="panel-heading">Dados Pessoais '+$_id+'</div>'
                            + '<div data-dados-pessoais class="panel-body">'
                                + '<p id="p_'+$_id+'"><strong>Id:</strong> '
                                + value.id      + ' - <strong>Nome:</strong>'
                                + value.nome    + ' - <strong>Empresa:</strong> ' 
                                + value.empresa + ' - <strong>Status:</strong> ' 
                                + value.status  + ' - <strong>Idade:</strong> '
                                + value.idade   + ' - <strong>Foto:</strong> '
                                + value.foto    + '</p>'
                            + '</div>'
                            + '</div>'
                    );

                    $("#div_panel_"+$_id).hide();

                    $("#p_"+$id).on("click", function(){
                        console.log("#p_"+$_id, "<p id='p_"+$_id+"'>" + value.nome + "</p>");
                    });

                    $("#div_panel_"+$_id).fadeIn();

                });
            });
        });
    }

    return{getName, getData};

})();