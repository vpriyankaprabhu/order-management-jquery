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
    
    $(".add-order-btn").click(function(){
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

    //When the edit button is clicked
    $("table").on("click", ".edit-btn", function(){
        var row = $(this).closest("tr")
        var orderID = row.find(".order-id").text()
        var orderValue = parseFloat(row.find(".order-value").text().replace("$","").replace("$",""))
        var orderQty = parseInt(row.find(".order-quantity").text(), 10)

        row.find(".order-id").replaceWith("<td><input type=\"text\" class=\"order-id\" placeholder="+orderID+" value="+orderID+"></td>");
        row.find(".order-value").replaceWith("<td><input type=\"text\" class=\"order-value\" placeholder="+orderValue+" value="+orderValue+"></td>");
        row.find(".order-quantity").replaceWith("<td><input type=\"text\" class=\"order-quantity\" placeholder="+orderQty+" value="+orderQty+"></td>");
        row.find(".order-action").replaceWith("<td><button class=\"btn btn-sm btn-success save-btn\">Save</button></td>")

        //When the add button in newly added row is clicked
        row.on("click", ".save-btn", function(){
            var editedOrderID = row.find(".order-id").val()
            var editedOrderValue = row.find(".order-value").val()
            var editedOrderQty = row.find(".order-quantity").val()
            
            if(orderID!="" && orderQty!="" && orderValue!=""){
                row.find(".order-id").replaceWith(`<td>${editedOrderID}</td>`)
                row.find(".order-value").replaceWith(`<td>$${editedOrderValue}</td>`)
                row.find(".order-quantity").replaceWith(`<td>${editedOrderQty}</td>`)
                row.find(".save-btn").replaceWith(`<td>
                    <button class="btn btn-sm btn-primary">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>`)
            } else {
                alert("Please fill in the row field details!")
            }
        })
    })
});