$(document).ready(function() {
    $('#btnBayar').click(function() {
        // Cek pilihan radiobutton dengan nama "langganan"
        var selectedLangganan = $('input[name="langganan"]:checked').val();

        console.log(selectedLangganan);
        if(selectedLangganan != undefined)
            $('#modalSuccess').modal('show');
        else 
            $('#modalFailed').modal('show');

    });

    $('input[name="langganan"]').change(function() {
        var selectedLangganan = $('input[name="langganan"]:checked').val();
        if(selectedLangganan == 1){
            $("[id=tipeLangganan]").text("Langganan 1 Bulan")
            $("[id=jumlahBayar]").text("Rp. 15.000,-") 
        }
        else if(selectedLangganan == 2){
            $("[id=tipeLangganan]").text("Langganan 3 Bulan")
            $("[id=jumlahBayar]").text("Rp. 45.000,-") 
        }
        else if(selectedLangganan == 3){
            $("[id=tipeLangganan]").text("Langganan 6 Bulan")
            $("[id=jumlahBayar]").text("Rp. 60.000,-") 
        }
    });
});