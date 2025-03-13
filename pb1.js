   $(document).ready(function () {
    FormValidation();
    FillDataList();
    MaxInv();
     
});
 
 
 
 
 function FillDataList()
{
        $.getJSON("https://script.google.com/macros/s/AKfycbzjl12icc-crShOpfZudaKCDnnK_qbB2yJa0B9onc_-t6JQjJFyGPlOffExPT1byf6Q2w/exec?page=dropdown",
       
        function (data) {

          var Options="";

          $.each(data, function(key, value)
          {
            Options = Options + '<option>' + value + '</option>';
          });

          $("#mylist").append(Options);
         
        });
}

function MaxInv()
{
        $.getJSON("https://script.google.com/macros/s/AKfycbxSOMRMN4B14S8DXUO0igEMKVoT7BXUjWpBETDnG3ZlcGii_xbYIl0E7ipA0qN-FIEs/exec?page=max",
        function (data) {
         
          $("input[name='sn']").val(data);

        });
}



function FormValidation()
{
    
(function () {
    'use strict'
 
    
    var forms = document.querySelectorAll('.needs-validation')
 
    
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
 
          form.classList.add('was-validated')
        }, false)
      })
  })()
}

function Search(pNo="")
{
        var no = $('#se').val();

		if (pNo != "") no = pNo;

        $.getJSON("https://script.google.com/macros/s/AKfycbxSOMRMN4B14S8DXUO0igEMKVoT7BXUjWpBETDnG3ZlcGii_xbYIl0E7ipA0qN-FIEs/exec?page=search&no="+no,
        function (data) {

         
          //alert(data);
         // console.log(data);
          if (data == "NOT FOUND")
          {
            alert('SL NO. Not Found...');

          }
          else
          {
            //var record = data;
            var record   = data.record;

            var StartRow = data.SR;
            var RowCount = data.CNT;

            $('#IsNew').val('N');
            $('#StartRow').val(StartRow);
            $('#RowCount').val(RowCount);
         
            var i = 0;
            $.each(record, function(key, value)
            {
           
              if (i == 0)
              {
                var dt = value[7].substring(0,10);
				document.getElementsByName("sn")[0].value = value[0];
                document.getElementsByName("rn")[0].value = value[1];
                document.getElementsByName("cn")[0].value = value[2];
				document.getElementsByName("an")[0].value = value[3];
				document.getElementsByName("nfc")[0].value = value[4];
				document.getElementsByName("co")[0].value = value[5];
                document.getElementsByName("addr")[0].value = value[6];
                document.getElementsByName("rec")[0].value = dt;
               
				
              }
              else
              {
                if (i > 1) BtnAdd();
               
             
                document.getElementsByName("item_nm")[i].value = value[8];
                document.getElementsByName("qty")[i].value     = value[9];
                document.getElementsByName("rate")[i].value    = value[10];
                document.getElementsByName("amt")[i].value     = value[11];

              }

              i = i + 1;
            });

            GetTotal();
			ReGenSrNo();

          }
        });
		$('#exampleModal').modal('hide');
		 
}
function Search1(pNo="")
{
        var no = $('#se1').val();

		if (pNo != "") no = pNo;

        $.getJSON("https://script.google.com/macros/s/AKfycbwpIeWuE6rGvsB6_Wyugaw7UjOZlPxzotIinAtWBhlupw3X3SLxdqoCgoPivCA-_58cIQ/exec?page=search&no="+no,
        function (data) {

         
          //alert(data);
         // console.log(data);
          if (data == "NOT FOUND")
          {
            alert('Rf No. Not Found...');

          }
          else
          {
            //var record = data;
            var record   = data.record;

            var StartRow = data.SR;
            var RowCount = data.CNT;

            $('#IsNew').val('N');
            $('#StartRow').val(StartRow);
            $('#RowCount').val(RowCount);
         
            var i = 0;
            $.each(record, function(key, value)
            {
           
              if (i == 0)
              {
                var dt = value[7].substring(0,10);
				document.getElementsByName("sn")[0].value = value[0];
                document.getElementsByName("rn")[0].value = value[1];
                document.getElementsByName("cn")[0].value = value[2];
				document.getElementsByName("an")[0].value = value[3];
				document.getElementsByName("nfc")[0].value = value[4];
				document.getElementsByName("co")[0].value = value[5];
                document.getElementsByName("addr")[0].value = value[6];
                document.getElementsByName("rec")[0].value = dt;
               
				
              }
              else
              {
                if (i > 1) BtnAdd();
               
             
                document.getElementsByName("item_nm")[i].value = value[8];
                document.getElementsByName("qty")[i].value     = value[9];
                document.getElementsByName("rate")[i].value    = value[10];
                document.getElementsByName("amt")[i].value     = value[11];

              }

              i = i + 1;
            });

            GetTotal();
			ReGenSrNo();

          }
        });
		$('#exampleModal').modal('hide');
		 
}
function Search2(pNo="")
{
        var no = $('#se2').val();

		if (pNo != "") no = pNo;

        $.getJSON("https://script.google.com/macros/s/AKfycbykO-7PEGfKAqPG2UapX0haqM2iPINZPR4a35nWQg6uTG6IvMP3ydy8EFXqeerYUaqyNA/exec?page=search&no="+no,
        function (data) {

         
          //alert(data);
         // console.log(data);
          if (data == "NOT FOUND")
          {
            alert('Account. Not Found...');

          }
          else
          {
            //var record = data;
            var record   = data.record;

            var StartRow = data.SR;
            var RowCount = data.CNT;

            $('#IsNew').val('N');
            $('#StartRow').val(StartRow);
            $('#RowCount').val(RowCount);
         
            var i = 0;
            $.each(record, function(key, value)
            {
           
              if (i == 0)
              {
                var dt = value[7].substring(0,10);
				document.getElementsByName("sn")[0].value = value[0];
                document.getElementsByName("rn")[0].value = value[1];
                document.getElementsByName("cn")[0].value = value[2];
				document.getElementsByName("an")[0].value = value[3];
				document.getElementsByName("nfc")[0].value = value[4];
				document.getElementsByName("co")[0].value = value[5];
                document.getElementsByName("addr")[0].value = value[6];
                document.getElementsByName("rec")[0].value = dt;
               
				
              }
              else
              {
                if (i > 1) BtnAdd();
               
             
                document.getElementsByName("item_nm")[i].value = value[8];
                document.getElementsByName("qty")[i].value     = value[9];
                document.getElementsByName("rate")[i].value    = value[10];
                document.getElementsByName("amt")[i].value     = value[11];

              }

              i = i + 1;
            });

            GetTotal();
			ReGenSrNo();

          }
        });
		$('#exampleModal').modal('hide');
		 
}
function Search3(pNo="")
{
        var no = $('#se3').val();

		if (pNo != "") no = pNo;

        $.getJSON("https://script.google.com/macros/s/AKfycbza0PIhQWlOC07fjAuWefDHv9qPvzmUhVDSwIZkYFIrM_WND0by-jFcNXyjZDLVj2AO_w/exec?page=search&no="+no,
        function (data) {

         
          //alert(data);
         // console.log(data);
          if (data == "NOT FOUND")
          {
            alert('Customer Name. Not Found...');

          }
          else
          {
            //var record = data;
            var record   = data.record;

            var StartRow = data.SR;
            var RowCount = data.CNT;

            $('#IsNew').val('N');
            $('#StartRow').val(StartRow);
            $('#RowCount').val(RowCount);
         
            var i = 0;
            $.each(record, function(key, value)
            {
           
              if (i == 0)
              {
                var dt = value[7].substring(0,10);
				document.getElementsByName("sn")[0].value = value[0];
                document.getElementsByName("rn")[0].value = value[1];
                document.getElementsByName("cn")[0].value = value[2];
				document.getElementsByName("an")[0].value = value[3];
				document.getElementsByName("nfc")[0].value = value[4];
				document.getElementsByName("co")[0].value = value[5];
                document.getElementsByName("addr")[0].value = value[6];
                document.getElementsByName("rec")[0].value = dt;
               
				
              }
              else
              {
                if (i > 1) BtnAdd();
               
             
                document.getElementsByName("item_nm")[i].value = value[8];
                document.getElementsByName("qty")[i].value     = value[9];
                document.getElementsByName("rate")[i].value    = value[10];
                document.getElementsByName("amt")[i].value     = value[11];

              }

              i = i + 1;
            });

            GetTotal();
			ReGenSrNo();

          }
        });
		$('#exampleModal').modal('hide');
		 
}


function ShowAllData()
{
	$(document).ready(function (){
		
		$.getJSON("https://script.google.com/macros/s/AKfycbzjl12icc-crShOpfZudaKCDnnK_qbB2yJa0B9onc_-t6JQjJFyGPlOffExPT1byf6Q2w/exec?page=all",
        function (data) {
	
		var Table="", Rows="", Columns="";
		$.each(data, function(key, value)
		{
			var sn="";
			Columns ="";
			i=0;
			$.each(value, function(key1, value1)
			{
				i++;
				if (i ==2) 
				{
					value1 = "" + value1;
					value1 = value1.substring(0, 13);	
				}
				Columns = Columns + '<td>' + value1 + '</td>';
				if (sn == "") sn = value1;
				
				
			});
			Rows = Rows + '<tr onclick="Search('+sn+')">' + Columns + '</tr>';
		});
		
		$("#MyTBody").html(Rows);
		$('#exampleModal').modal('show');
	});	
	});			

}
