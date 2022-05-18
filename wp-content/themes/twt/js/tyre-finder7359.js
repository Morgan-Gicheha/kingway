// jQuery("#vehicle_make").change(function(event){
  jQuery(document).ready(function() {

//     jQuery.ajax({
//         url: "/wp-content/themes/twt/findtyre.php",
//         type: 'POST',
//         processData: false,
//         dataType:'json',
//         success: function (data, textStatus, jqXHR) {
            
//             var vehicles = JSON.parse(data);

            // alert(data);

//             document.getElementById("results").innerHTML += obj.name;
            
        //     document.getElementById("tracking-results").innerHTML += "<table><tr><th>Current Department</th><th>Date</th></tr><tr><td>" + obj.CurrentDepartment + "</td><td>" + obj.CurrentDepartmentDate + "</td></tr></table>";
          jQuery('#tyre_finder__vehicle .finder_select_make option').text('Makes Loading...').remove();

          jQuery('#tyre_finder__vehicle .finder_select_make').append('<option value="">Select Make...</option>');
          
          var htmlmake = '<option value="alfa-romeo">Alfa Romeo</option>'
                  htmlmake += '<option value="aston-martin">Aston Martin</option>'
                  htmlmake += '<option value="audi">Audi</option>'
                  htmlmake += '<option value="bentley">Bentley</option>'
                  htmlmake += '<option value="bmw">BMW</option>'
                  htmlmake += '<option value="bugatti">Bugatti</option>'
                  htmlmake += '<option value="chery">Chery</option>'
                  htmlmake += '<option value="chevrolet">Chevrolet</option>'
                  htmlmake += '<option value="chrysler">Chrysler</option>'
                  htmlmake += '<option value="citroen">Citroën</option>'
                  htmlmake += '<option value="daihatsu">Daihatsu</option>'
                  htmlmake += '<option value="dodge">Dodge</option>'
                  htmlmake += '<option value="ferrari">Ferrari</option>'
                  htmlmake += '<option value="fiat">Fiat</option>'
                  htmlmake += '<option value="ford">Ford</option>'
                  htmlmake += '<option value="great-wall">Great Wall</option>'
                  htmlmake += '<option value="honda">Honda</option>'
                  htmlmake += '<option value="hummer">Hummer</option>'
                  htmlmake += '<option value="hyundai">Hyundai</option>'
                  htmlmake += '<option value="infiniti">Infiniti</option>'
                  htmlmake += '<option value="isuzu">Isuzu</option>'
                  htmlmake += '<option value="jaguar">Jaguar</option>'
                  htmlmake += '<option value="jeep">Jeep</option>'
                  htmlmake += '<option value="kia">Kia</option>'
                  htmlmake += '<option value="lamborghini">Lamborghini</option>'
                  htmlmake += '<option value="lancia">Lancia</option>'
                  htmlmake += '<option value="land-rover">Land Rover</option>'
                  htmlmake += '<option value="lexus">Lexus</option>'
                  htmlmake += '<option value="lotus">Lotus</option>'
                  htmlmake += '<option value="mahindra">Mahindra</option>'
                  htmlmake += '<option value="maserati">Maserati</option>'
                  htmlmake += '<option value="maybach">Maybach</option>'
                  htmlmake += '<option value="mazda">Mazda</option>'
                  htmlmake += '<option value="mclaren">McLaren</option>'
                  htmlmake += '<option value="mercedes">Mercedes-Benz</option>'
                  htmlmake += '<option value="mercedes-maybach">Mercedes-Maybach</option>'
                  htmlmake += '<option value="mg">MG</option>'
                  htmlmake += '<option value="mini">MINI</option>'
                  htmlmake += '<option value="mitsubishi">Mitsubishi</option>'
                  htmlmake += '<option value="nissan">Nissan</option>'
                  htmlmake += '<option value="opel">Opel</option>'
                  htmlmake += '<option value="peugeot">Peugeot</option>'
                  htmlmake += '<option value="porsche">Porsche</option>'
                  htmlmake += '<option value="renault">Renault</option>'
                  htmlmake += '<option value="rolls-royce">Rolls-Royce</option>'
                  htmlmake += '<option value="smart">Smart</option>'
                  htmlmake += '<option value="ssangyong">SsangYong</option>'
                  htmlmake += '<option value="subaru">Subaru</option>'
                  htmlmake += '<option value="suzuki">Suzuki</option>'
                  htmlmake += '<option value="tata">Tata</option>'
                  htmlmake += '<option value="toyota">Toyota</option>'
                  htmlmake += '<option value="volkswagen">Volkswagen</option>'
                  htmlmake += '<option value="volvo">Volvo</option>'; 
                document.getElementById("vehicle_make").innerHTML += htmlmake;           
//           jQuery.each(vehicles.data, function(entryIndex, entry) {
//               var html = '<option value='+ this.slug +'>' + this.name + '</option>';
              
//               document.getElementById("vehicle_make").innerHTML += html;
//             });
            
        
            //document.getElementById("tracking-results").innerHTML += obj.Department;
// 				alert(data);
        
//         },
//         error: function(){
//           alert("Cannot get data");
//         }

//     });

});


jQuery("#vehicle_make").change(function(event){
    var vehicleMake = jQuery("#vehicle_make").val();
    jQuery( "#vehicle_model" ).empty();
    
    jQuery( "#results" ).empty();
    jQuery.ajax({
        url: "/wp-content/themes/twt/vehicle_model.php?vehicle_make="+vehicleMake,
        type: 'POST',
        processData: false,
        dataType:'json',
        success: function (data, textStatus, jqXHR) {
            
            var years = JSON.parse(data);

            // alert(data);

//             document.getElementById("results").innerHTML += years.name;
            
        //     document.getElementById("tracking-results").innerHTML += "<table><tr><th>Current Department</th><th>Date</th></tr><tr><td>" + obj.CurrentDepartment + "</td><td>" + obj.CurrentDepartmentDate + "</td></tr></table>";
        jQuery("#tyre_finder__vehicle .finder_select_model option").text('Models Loading...').remove();
        jQuery("#tyre_finder__vehicle .finder_select_model").append('<option value="">Select Model...</option>');
          jQuery.each(years.data, function(entryIndex, entry) {
            var html = '<option value='+ this.slug +'>' + this.name + '</option>';

              document.getElementById("vehicle_model").innerHTML += html;
            });
            
        
            //document.getElementById("tracking-results").innerHTML += obj.Department;
// 				alert(data);
        
        },
        error: function(){
          alert("Cannot get data");
        }

    });
    
});


jQuery("#vehicle_model").change(function(event){
    var vehicleMake = jQuery("#vehicle_make").val();
    var vehicleModel = jQuery("#vehicle_model").val();
    jQuery( "#vehicle_year" ).empty();
    jQuery( "#region_hidden" ).val("");
    jQuery.ajax({
        url: "/wp-content/themes/twt/vehicle_year.php?vehicle_make="+vehicleMake+"&vehicle_model="+vehicleModel,
        type: 'POST',
        processData: false,
        dataType:'json',
        success: function (data, textStatus, jqXHR) {
            
            var vehiclemodels = JSON.parse(data);

            // alert(data);

//             document.getElementById("results").innerHTML += vehiclemodels;
            
        //     document.getElementById("tracking-results").innerHTML += "<table><tr><th>Current Department</th><th>Date</th></tr><tr><td>" + obj.CurrentDepartment + "</td><td>" + obj.CurrentDepartmentDate + "</td></tr></table>";
        jQuery("#tyre_finder__vehicle .finder_select_year option").text('Year Loading...').remove();
        jQuery("#tyre_finder__vehicle .finder_select_year").append('<option value="">Select Year...</option>');
        jQuery.each(vehiclemodels.data, function(entryIndex, entry) {
              if(this.regions == 'sadm') {
                var sadm = 'sadm';
                document.getElementById("region_hidden").value += sadm;
                return false;
              }
              else if (this.regions != 'eudm') {
                var eudm = 'eudm';
                document.getElementById("region_hidden").value += eudm;
                return false;
              }
          });

          
          jQuery.each(vehiclemodels.data, function(entryIndex, entry) {

            var html = '<option value='+ this.slug +'>' + this.name +'</option>';
              
            document.getElementById("vehicle_year").innerHTML += html ;

          });
              // var html = '<option value='+ this.slug +'>' + this.name +'</option>';
            
              // document.getElementById("vehicle_model").innerHTML += html;
            // });
            
        
            //document.getElementById("tracking-results").innerHTML += obj.Department;
// 				alert(data);
        
        },
        error: function(){
          alert("Cannot get data");
        }

    });
    
});

jQuery("#vehicle_year").change(function(event){
var vehicleMake = jQuery("#vehicle_make").val();
var vehicleYear = jQuery("#vehicle_year").val();
var vehicleModel = jQuery("#vehicle_model").val();
var vehicleRegion = jQuery("#region_hidden").val();
jQuery( "#results" ).empty();
jQuery.ajax({
    url: "/wp-content/themes/twt/vehicle_variations.php?vehicle_make="+vehicleMake+"&vehicle_model="+vehicleModel+"&vehicle_year="+vehicleYear+"&region_hidden="+vehicleRegion,
    type: 'POST',
    processData: false,
    dataType:'json',
    success: function (data, textStatus, jqXHR) {
        
        var vehiclevariations = JSON.parse(data);

        // alert(data);

//             document.getElementById("results").innerHTML += vehiclemodels;
        
    //     document.getElementById("tracking-results").innerHTML += "<table><tr><th>Current Department</th><th>Date</th></tr><tr><td>" + obj.CurrentDepartment + "</td><td>" + obj.CurrentDepartmentDate + "</td></tr></table>";
      
    jQuery("#tyre_finder__vehicle .finder_select_variant option").text('Variants Loading...').remove();
    jQuery("#tyre_finder__vehicle .finder_select_variant").append('<option value="">Select Variant...</option>');
      jQuery.each(vehiclevariations.data, function(entryIndex, entry) {

        
        var html = '<option value='+ this.slug +'>' + this.name + '</option>';

          document.getElementById("vehicle_variation").innerHTML += html;
          
          var arr = new Array();
              jQuery(".finder-selectric option").each(function(){
                  var value = jQuery(this).text();
                  if (arr.indexOf(value) == -1)
                      arr.push(value);
                  else
                    jQuery(this).remove();
              }); 
        });
        
    
        //document.getElementById("tracking-results").innerHTML += obj.Department;
// 				alert(data);
    
    },
    error: function(){
      alert("Cannot get data");
    }

});

});


jQuery("#vehicle_variation").change(function(event){
  var vehicleMake = jQuery("#vehicle_make").val();
  var vehicleYear = jQuery("#vehicle_year").val();
  var vehicleModel = jQuery("#vehicle_model").val();
  var vehicleVariant = jQuery("#vehicle_variation").val();
  var vehicleRegion = jQuery("#region_hidden").val();
  jQuery( "#results" ).empty();
  jQuery.ajax({
      url: "/wp-content/themes/twt/vehicle_results.php?vehicle_make="+vehicleMake+"&region_hidden="+vehicleRegion+"&vehicle_model="+vehicleModel+"&vehicle_year="+vehicleYear+"&vehicle_variation="+vehicleVariant,
      type: 'POST',
      processData: false,
      dataType:'json',
      success: function (data, textStatus, jqXHR) {

        var vehicleresults = JSON.parse(data);

        // var wheelis = vehicleresults.wheels;

        

        // unique = [...new Set(vehicleresults.map(front => front.tire))];
        //     if (unique.length === 1) {
        //     console.log(unique);
        //     }
          // vehicleresults = vehicleresults.filter(function(n){ return n });
          // var cleanvehicle = JSON.parse(vehicleresults);
          
          // alert(data);
  
  //             document.getElementById("results").innerHTML += vehiclemodels;
          
      //     document.getElementById("tracking-results").innerHTML += "<table><tr><th>Current Department</th><th>Date</th></tr><tr><td>" + obj.CurrentDepartment + "</td><td>" + obj.CurrentDepartmentDate + "</td></tr></table>";
      
      jQuery("#results").prepend('<h3>Front Tyres</h3><div id="tyre-info">');
  
        jQuery.each(vehicleresults.data, function(entryIndex, entry) {

          // var frontest = Object.entries(this.wheels);

          // var frontend = Object.keys(frontest.front);
          
          // unique = [...new Set(frontest.map(front => front.tire))];
          //     if (unique.length === 1) {
          //     console.log(unique);
          //     }
          // console.log(frontend);
          // var html = '<option value='+ this.slug +'>' + this.name + '</option>';
          
          jQuery.each(this.wheels, function(entryIndex, entry) {

            // if(this.showing_fp_only == true && this.is_runflat_tires == false && this.is_recommended_for_winter == false) {
              document.getElementById("tyre-info").innerHTML += "<a href=" + 'https://twt.co.za/product-category/tyres/?filter_tyre-size=' + this.front.tire.replace('/', '-').replace('Z','') + " class='tyre-products-link " + this.front.tire_width + "'>" + this.front.tire + "</a>";
              
              var arr = new Array();
              jQuery("#tyre-info a.tyre-products-link").each(function(){
                  var value = jQuery(this).text();
                  if (arr.indexOf(value) == -1)
                      arr.push(value);
                  else
                    jQuery(this).remove();
              }); 
            

          });
          
          return;
        });
        

      jQuery("#results").append('</div>');
      jQuery("#results").append('<h3>Rear Tyres</h3><div id="rear-info">');
      
      jQuery.each(vehicleresults.data, function(entryIndex, entry) {


          jQuery.each(this.wheels, function(entryIndex, entry) {

            // var html = '<li>' + this.front.tire + '</li>';
           
              document.getElementById("rear-info").innerHTML += "<a href=" + 'https://twt.co.za/product-category/tyres/?filter_tyre-size=' + this.rear.tire.replace('/', '-').replace('Z','') + " class='rear tyre-products-link " + this.rear.tire_width + "' value="+ this.rear.tire.replace('/', '') +">" + this.rear.tire + "</a>";

              // Remove duplicates post processing the results
              var arr = new Array();
              jQuery("a.tyre-products-link").each(function(){
                  var value = jQuery(this).text();
                  if (arr.indexOf(value) == -1)
                      arr.push(value);
                  else
                    jQuery(this).remove();
              });         

          });
          
        return;
       
      });
      // var arr = new Array();
      // jQuery("a.rear.tyre-products-link").each(function(){
      //     arr.push(jQuery(this).text());
      // });
      // for(var i=0; i<arr.length;i++){
      //     for(var j=i+1;j<arr.length;j++){
      //         if(arr[i]==arr[j]){
      //           jQuery("a.rear.tyre-products-link").addClass("duplicate");
      //         }
      //     }
      // } 
      
      jQuery("#results").append('</div>');
      jQuery("#results").append('<p style="margin-top: 30px;"><strong>Disclaimer:</strong> The Tyre Size Finder is purely a guide, please also refer to your Manufacturer Owner’s manual.</p>');
      
          //document.getElementById("tracking-results").innerHTML += obj.Department;
  // 				alert(data);
      
      },
      error: function(){
        alert("Cannot get data");
      }
  
  });
});     
