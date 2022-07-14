
function chang(){

    var pss=document.getElementById('id').value;
    if(!pss)
    {
      addData();
    }
    else{
      update();
    }
    
    console.log(pss);
  }
  
  // document.getElementById('btn').addEventListener('click', addData);
  
  function addData() {
  
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var number = document.getElementById('number').value;
  
    axios.post('/user', {
      firstName: fname,
      lastName: lname,
      number: number,
    })
      .then(function (response) {
        console.log(response.data);
        fname = document.getElementById('fname').value = "";
        lname = document.getElementById('lname').value = "";
        number = document.getElementById('number').value = "";
        if (response.data == 1) {
          swal({
            title: "Data insert successfully",
            icon: "success",
          });
          view()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  
  function view() {
    axios.get('/view')
      .then(function (response) {
        document.getElementById('myTable').innerHTML = ``;
  
        var i = 1;
        response.data.forEach(element => {
          var table = document.getElementById("myTable");
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
  
          cell1.innerHTML = i++;
          cell2.innerHTML = element.fname;
          cell3.innerHTML = element.lname;
          cell4.innerHTML = element.number;
          cell5.innerHTML += `<div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-success pp" id="edit" onclick="show(${element.id})">Edit</button>
                                 <button type="button" class="btn btn-primary"  onclick="deleted(${element.id})">Deleted</button>
                                 </div>`;
  
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //confirm deleted
  function confirma(){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
          
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }
  
  
  /// show recored
  function show(id) {
    
  
    axios.get(`/show/${id}`)
      .then(function (response) {
        console.log(response.data);
        document.getElementById('fname').value = response.data.fname;
        document.getElementById('lname').value = response.data.lname;
        document.getElementById('number').value = response.data.number;
        document.getElementById('id').value = response.data.id;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  /// update recored
  //document.getElementById('ubtn').addEventListener('click', update);
  function update() {
  
    var id = document.getElementById('id').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var number = document.getElementById('number').value;
  
    axios.post('/update', {
      firstName: fname,
      lastName: lname,
      number: number,
      id: id
    })
      .then(function (response) {
        console.log(response.data);
        fname = document.getElementById('fname').value = "";
        lname = document.getElementById('lname').value = "";
        number = document.getElementById('number').value = "";
        id = document.getElementById('id').value = "";
        if (response.data == 0) {
          swal({
            title: "Data Updated successfully",
            icon: "success",
          });
  
        }
        view();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  
  //deleted comfitrmtion
  //deleted
  function deleted(id) {
  
    //dleted this
    axios.get(`/deleted/${id}`)
      .then(function (response) {
        console.log(response.data);
        view();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  
  window.onload = () => {
    //view data 
    view();
  }