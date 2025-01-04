$(function () {
    //when add order button is clicked
    var newRowToBeAdded =`
    <tr>
        <td><input type="text" class="form-control order-id" placeholder="Enter Order ID"></td>
        <td><input type="text" class="form-control order-value" placeholder="Enter Order Value"></td>
        <td><input type="text" class="form-control order-quantity" placeholder="Enter Order Quantity"></td>
        <td><button class="btn btn-sm btn-success add-btn">Add</button></td>
    </tr>
    `
    
    $(".btn-primary").click(function(){
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
            row.find(".order-value").replaceWith(`<td>${orderValue}</td>`)
            row.find(".order-quantity").replaceWith(`<td>${orderQty}</td>`)
            row.find(".add-btn").replaceWith(`<td>
                                <button class="btn btn-sm btn-primary">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </td>`)
        } else {
            alert("Please fill in the new row field details!")
        }
    })
});