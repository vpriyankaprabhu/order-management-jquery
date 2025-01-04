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
    
    $(".add-order-btn").on("click", function(){
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
            row.find(".order-value").replaceWith(`<td class="order-value">$${orderValue}</td>`)
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

    $('.save-order-btn').on('click', saveOrderData);
    
    // Function to save order data to localStorage
    function saveOrderData() {
        const orders = [];

        // Loop through each row in the table and collect the order details
        $('.order-row').each(function() {
            var row = $(this).closest("tr")
            var orderID = row.find(".order-id").text()
            var orderValue = parseFloat(row.find(".order-value").text().replace("$","").replace("$",""))
            var orderQuantity = parseInt(row.find(".order-quantity").text(), 10)

            console.log("orderId :: "+orderID);
            console.log("orderValue :: "+orderValue);
            console.log("orderQuantity :: "+orderQuantity);

            // Push the order data to the orders array
            orders.push({
                orderId: orderID,
                orderValue: orderValue,  // Convert order value to float
                orderQuantity: orderQuantity // Convert order quantity to integer
            });
        });

        console.log(orders)
        // Store the orders array as a JSON string in localStorage
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Orders have been saved!');
    }

    function deleteOrderDataByOrderID(orderID){
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const updatedOrders = savedOrders.filter(order => order.orderId !== orderID);

        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }

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
                console.log(row.find(".order-action"))
                row.find(".order-id").replaceWith(`<td class="order-id">${editedOrderID}</td>`)
                row.find(".order-value").replaceWith(`<td class="order-value">$${editedOrderValue}</td>`)
                row.find(".order-quantity").replaceWith(`<td class="order-quantity">${editedOrderQty}</td>`)
                row.find(".save-btn").replaceWith(`<td>
                    <button class="btn btn-sm btn-primary">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>`)
            } else {
                alert("Please fill in the row field details!")
            }
        })
    })

    //When the delete button is clicked
    $("table").on("click", ".delete-btn", function(){
        var row = $(this).closest("tr")
        var orderID = row.find(".order-id").text()
        confirmDeletion = confirm("Are you sure you want to delete this order:: "+orderID);
        if(confirmDeletion){
            deleteOrderDataByOrderID(orderID)
            row.remove()
        }
    });
});