$(function () {

    //when add order button is clicked
    var newRowToBeAdded =`
    <tr class="order-row">
        <td><input type="text" class="form-control order-id" placeholder="Enter Order ID"></td>
        <td><input type="text" class="form-control order-value" placeholder="Enter Order Value"></td>
        <td><input type="text" class="form-control order-quantity" placeholder="Enter Order Quantity"></td>
        <td><button class="btn btn-sm btn-success add-btn">Add</button></td>
    </tr>
    `
    
    $(".btn-primary").on("click", function(){
        $("table tbody").prepend(newRowToBeAdded)
    })

    //When the add button in newly added row is clicked
    $("table").on("click", ".add-btn", function(){
        var row = $(this).closest("tr")
        var orderID = row.find(".order-id").val()
        var orderValue = row.find(".order-value").val()
        var orderQty = row.find(".order-quantity").val()

        if(orderID!="" && orderQty!="" && orderValue!=""){
            row.find(".order-id").replaceWith(`<td>${orderID}</td>`)
            row.find(".order-value").replaceWith(`<td class="order-value">${orderValue}</td>`)
            row.find(".order-quantity").replaceWith(`<td>${orderQty}</td>`)
            row.find(".add-btn").replaceWith(`<td>
                                <button class="btn btn-sm btn-primary">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </td>`)
        } else {
            alert("Please fill in the new row field details!")
        }
    })


    //when filterOrders is slided
    console.log($(".form-range"))
    $("#orderValueSlider").on("input", function(){
        var newval=$(this).val();
        //alert("OrderValue Change Event Triggered! New Value : "+ newval);
        console.log("OrderValue Change Event Triggered! New Value :", newval);
        // var rowLength = $("table tbody").children().length;
        // console.log("row length : ",rowLength);
        // var rows = $("table tbody").children("tr")
        
        // var rowsOrderValues = []
        // for (var i=0; i<rowLength; i++){
        //     rowsOrderValues[i] = rows.siblings().eq(i).children("td").siblings().eq(1).text().replace("$", "");
        //     if(parseInt(rowsOrderValues[i]) > parseInt(newval)){
        //         console.log("rows order value : ",rowsOrderValues[i]);
        //     }
        // }

        // Filter the rows based on the selected order value
        $('.order-row').each(function() {
            var orderValue = $(this).find(".order-value").text().replace(",","").replace("$","");
            console.log("orderValue : "+orderValue)
            if (parseFloat(orderValue) > parseFloat(newval)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    })
});