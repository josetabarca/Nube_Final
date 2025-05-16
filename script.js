$(document).ready(function() {
    $("#appointment-date").datepicker();

    $("#calendar").datepicker({
        onSelect: function(dateText) {
            $("#appointment-date").val(dateText);
            $("#appointment-form").dialog("open");
        }
    });

    $("#appointment-form").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Programar Cita": function() {
                let patientName = $("#patient-name").val();
                let appointmentDate = $("#appointment-date").val();
                
                function formatDate(date) {
                    let d = new Date(date);
                    let month = '' + (d.getMonth() + 1);
                    let day = '' + d.getDate();
                    let year = d.getFullYear();

                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    return [year, month, day].join('-');
                }

                let formattedDate = formatDate(appointmentDate);
                
                if (patientName && formattedDate) {
                    console.log('Datos enviados:', { name: patientName, date: formattedDate }); 
                    $.ajax({
                        url: "https://nube-final.onrender.com//agenda", // Cambiar!!
                        method: "POST",
                        data: JSON.stringify({ name: patientName, date: formattedDate }),
                        contentType: "application/json",
                        success: function(response) {
                            alert("Cita programada exitosamente");
                            $("#appointment-form").dialog("close");
                        },
                        error: function() {
                            alert("Error al programar la cita");
                        }
                    });
                }
            },
            "Cancelar": function() {
                $(this).dialog("close");
            }
        }
    });
});
