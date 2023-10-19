      let allModalData = [];
      let modalSlider = document.getElementById("myModal").classList;
      let tableContain = document.getElementById("myRowData");
      let profilePic = document.getElementById("myImg");
      let uploadPic = document.getElementById("myfile");
      let registerBtn = document.getElementById("registerBtn")
      let updateBtn = document.getElementById("updateBtn")
      let imgUrl, profile, editIndex,delIndex;


      uploadPic.onchange = function () {
        if (uploadPic.files[0].size < 1000000) {
          // console.log(uploadPic.files[0])
          let fReader = new FileReader();
          fReader.onload = function (e) {
            imgUrl = e.target.result;
            // console.log(imgUrl);
            profilePic.src = imgUrl;
            // console.log(imgUrl);
          };
          fReader.readAsDataURL(uploadPic.files[0]);
        } else {
          alert("file size is more than 1MB");
        }
      };

    //   start search coding//
      let searchItem = document.getElementById("searchItem")
      searchItem.oninput = function() {
        searchItemFunc()
      }

      function searchItemFunc() {
        let allTr = tableContain.querySelectorAll("tr")
        console.log(allTr)
        let product_name = searchItem.value.toLowerCase()
        for(let i=0; i<allTr.length; i++){
            let td = allTr[i].getElementsByTagName('td')[2]
            let tdValue = td.innerHTML
            if(tdValue.toLowerCase().indexOf(product_name)!=-1){
                allTr[i].style.display = ""
            }else{
                allTr[i].style.display = "none"
            }
        }
      }

      //delete all product
      document.getElementById("deleteAllProduct").onclick = function() {
        localStorage.removeItem("productData")
        displayData()
      }

      document.getElementById("closeBtn").addEventListener("click", () => {
            modalSlider.add("hideModal");
            modalSlider.remove("showModal");
          });    


      if (localStorage.getItem("productData") != null)
        allModalData = JSON.parse(localStorage.getItem("productData")); //the refresh problem is solved by this line

      document.getElementById("addProduct").addEventListener("click", () => {
        registerBtn.removeAttribute("disabled")
        updateBtn.setAttribute("disabled","disabled")
        modalSlider.add("showModal");
        modalSlider.remove("hideModal");
        id.value = "";
        productName.value = "";
        productPrice.value = "";
        productContain.value = "";
        myfile.value = "";
        imgUrl = undefined;
        profilePic.src =  "default.png"
      });

      document.getElementById("registerBtn").addEventListener("click", (e) => {
        e.preventDefault()
        console.log(imgUrl);
        let modalData = {
          uniqueId : Date.now() + Math.random(),
          id: id.value,
          productName: productName.value,
          productPrice: productPrice.value,
          productContain: productContain.value,
          profile: imgUrl == undefined ? "default.png" : imgUrl,
        };

        if (
          id.value &&
          productName.value &&
          productPrice.value &&
          productContain.value 
        ) {
          //if only all fields are filled then only you push it into localStorage
          allModalData.push(modalData);
          let stringifyData = JSON.stringify(allModalData);
          // console.log(stringifyData)
          localStorage.setItem("productData", stringifyData);
          swal("Good job!", "data registered successfully!!", "success");
        }

        id.value = "";
        productName.value = "";
        productPrice.value = "";
        productContain.value = "";
        myfile.value = "";
        imgUrl = undefined

        modalSlider.add("hideModal");
        modalSlider.remove("showModal");

        displayData();
        
      });

      //start returning data from localStorage into table
      const displayData = () => {
        tableContain.innerHTML = "";
        let productData = localStorage.getItem("productData");
        // console.log(productData)
        let parseProductData = JSON.parse(productData);
        // console.log(parseProductData);
        if (parseProductData) {
          parseProductData.forEach((rowData, index) => {
            // console.log(rowData.profile);
            tableContain.innerHTML += `
                    <tr index='${rowData.uniqueId}'>
                        <td>${rowData.id}</td>
                        <td><img src=${rowData.profile} alt="" height="60px"></td>
                        <td>${rowData.productName}</td>
                        <td>${rowData.productPrice}</td>
                        <td>${rowData.productContain}</td>
                        <td>
                            <i class="fa fa-edit edit edit-btn"></i>
                            <i class="fa fa-trash trash delete-btn"></i>
                        </td>
                     </tr>
                `;
          });
        }
        deleteFun()
        editFun()
    }

    displayData();

    //   delete coding//
    function deleteFun() {
        let getAlldelBtn = document.getElementsByClassName("delete-btn")
        console.log(getAlldelBtn)
        for(let i=0; i<getAlldelBtn.length; i++) {
            getAlldelBtn[i].onclick = async function(e) {
                e.preventDefault()
                // console.log(this) return that particular i tag
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this product!!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    })
                    .then((willDelete) => {
                    if (willDelete) {
                        swal("Poof! Your Product Data has been deleted!", {
                        icon: "success",
                        });
                        let parentDelBtn = this.parentElement.parentElement
                        console.log(parentDelBtn)
                        parentDelBtn.remove()
                        let getRowIndex = parentDelBtn.getAttribute("index")
                        console.log(getRowIndex)
                        allModalData.map((localRowData, index)=> {
                            console.log(localRowData.uniqueId, index)
                            if(localRowData.uniqueId == getRowIndex){
                                delIndex = index;
                            } 
                        })
                        allModalData.splice(delIndex,1)
                        console.log(allModalData)
                        localStorage.setItem("productData",JSON.stringify(allModalData))
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                    });
            }
        }

    }

    //edit coding//
    function editFun() {
        let getEditIndex 
        let getAllEditBtn = document.getElementsByClassName("edit-btn")
        console.log(getAllEditBtn)
        for(let i=0 ; i<getAllEditBtn.length; i++){
            getAllEditBtn[i].onclick = function(e) {
                e.preventDefault()
                updateBtn.removeAttribute("disabled")
                registerBtn.setAttribute("disabled","disabled") 
                modalSlider.add("showModal");
                modalSlider.remove("hideModal");

                let parentEditBtn = this.parentElement.parentElement
                console.log(parentEditBtn)
                getEditIndex = parentEditBtn.getAttribute("index")
                let allTdInTr = parentEditBtn.getElementsByTagName("td")
                console.log(allTdInTr)

                let imgTag = allTdInTr[1].getElementsByTagName("img")
                // console.log(imgTag)
                let getProfile_picture = imgTag[0].src
                console.log(getProfile_picture)
                profilePic.src = getProfile_picture

                id.value = allTdInTr[0].innerHTML;
                productName.value = allTdInTr[2].innerHTML;
                productPrice.value = allTdInTr[3].innerHTML;
                productContain.value = allTdInTr[4].innerHTML;
               
                console.log("updating...")

                console.log(allModalData)

                

                updateBtn.onclick = function() {
                    editIndex = allModalData.findIndex(obj => obj.uniqueId == getEditIndex)
                    console.log(editIndex)
                    console.log(allModalData[editIndex])
                
                    if(imgUrl == undefined) imgUrl = profilePic.src
                    
                    allModalData[editIndex].uniqueId = getEditIndex
                    allModalData[editIndex].id = id.value
                    allModalData[editIndex].productName = productName.value
                    allModalData[editIndex].productPrice = productPrice.value
                    allModalData[editIndex].productContain = productContain.value
                    allModalData[editIndex].profile = uploadPic.value == "" ? profilePic.src : imgUrl  
                    console.log(imgUrl)
                    console.log(profilePic.src)
                    imgUrl = undefined
                    console.log(allModalData)
                    localStorage.setItem("productData",JSON.stringify(allModalData))
                    swal("Good job!", "data updated successfully!!", "success");
                    modalSlider.add("hideModal");
                    modalSlider.remove("showModal");
                    

                    if (typeof displayData === 'function') {
                        displayData();
                        }
                      
                }
                   
              }
            }
    }

    