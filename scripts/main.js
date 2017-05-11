(function(){  

    var STATUS_TODO = 0;
    var STATUS_DOING = 1;
    var STATUS_DONE = 2;
    
    function buildToDoPage (title, entries) {

        var figureElement = document.createElement("figure"),
            textInput = document.createElement("input"),
            mainElement = document.createElement("main"),
            section1 = document.createElement("section"),
            section2 = document.createElement("section"),
            section3 = document.createElement("section"),
            imgElement = document.createElement("img"),
            header = document.createElement("header"),
            addBtn = document.createElement("button"),
            h1Element = document.createElement("h1"),
            newEntryTable = document.createElement("ul"),
            content = document.createTextNode(title),
            newEntryInputWrapper = document.createElement("div"),
            newEntryForm = document.createElement("form"),
            newEntryRow = document.createElement("li"),
            ulElement2,
            newEntryButtonWrapper;

            newEntryTable.classList.add( "table", "item-list");
            addBtn.classList.add("plus-button");
            mainElement.classList.add( "main-wrapper");
            section1.classList.add("header-wrapper", "container", "col-md-5", "col-md-offset-4");
            section2.classList.add("main-content", "container", "col-md-5", "col-md-offset-4");
            section3.classList.add("main-content", "container", "col-md-5", "col-md-offset-4");
            header.classList.add("header", "text-primary-color");
            newEntryRow.classList.add("row", "light-primary-color");
            figureElement.classList.add("img-wrapper");
            imgElement.classList.add("header-icon");
            textInput.classList.add("new-entry");
            newEntryInputWrapper.classList.add("col");
            
            
            textInput.setAttribute("name", "message");
            textInput.setAttribute("autofocus", "autofocus");
            textInput.setAttribute("placeholder", "Enter a new note");
            addBtn.setAttribute("type", "submit");
            imgElement.setAttribute("src", "../images/plus-4-48.png");
            imgElement.setAttribute("alt", "Plus one");

            newEntryButtonWrapper = newEntryInputWrapper.cloneNode(true);
            newEntryButtonWrapper.classList.add("new-entry-btn-wrap");
            ulElement2 = newEntryTable.cloneNode(true);
            
            figureElement.appendChild(imgElement);
            addBtn.appendChild(figureElement);
            newEntryInputWrapper.appendChild(textInput);
            newEntryButtonWrapper.appendChild(addBtn);
            newEntryRow.appendChild(newEntryInputWrapper);
            newEntryRow.appendChild(newEntryButtonWrapper);
            h1Element.appendChild(content);
            header.appendChild(h1Element);
            newEntryTable.appendChild(newEntryRow);
            newEntryForm.appendChild(newEntryTable);
            
            section1.appendChild(header);
            section2.appendChild(newEntryForm);
            section2.appendChild(ulElement2);
            mainElement.appendChild(section1);
            mainElement.appendChild(section2);

            document.body.appendChild(mainElement);
            
            } 

    function buildATodoList(dataArray){
    
        var ulElement = document.getElementsByTagName("ul")[1],
            liElementCount = 0,
            checkElement,
            deleteElement,
            deleteColumn,
            checkColumn,
            column,
            row,
            listIndex,
            todoMessage,
            listText;


        for (var i = 0; i < dataArray.length; i += 1) {

          var todoItem = dataArray[i];

            liElementCount +=1;  //May use this to index as a unique identifier for contacts.           
            listText = document.createTextNode(todoItem.message);
            checkElement = document.createElement("button");
            deleteElement = document.createElement("button");
            column = document.createElement("div");
            todoMessage = document.createElement("span");
            row = document.createElement("li");

            row.classList.add("row", "light-primary-color");
            column.classList.add("col");
            todoMessage.classList.add("item-message");
            row.setAttribute("item-id", todoItem.id);
            row.setAttribute("item-status", todoItem.status);
            checkElement.classList.add("fa", "fa-check-square-o", "fa-lg", "check-item", "action-item");
            deleteElement.classList.add( "fa", "fa-times", "fa-lg", "delete-item", "action-item");
            checkElement.setAttribute("type", "button");
            deleteElement.setAttribute("type", "button");

            checkColumn = column.cloneNode(true);
            checkColumn.classList.add("action");
            deleteColumn = checkColumn.cloneNode(true);
            
            todoMessage.appendChild(listText);
            column.appendChild(todoMessage);
            checkColumn.appendChild(checkElement);
            deleteColumn.appendChild(deleteElement);
            row.appendChild(checkColumn);
            row.appendChild(column);
            row.appendChild(deleteColumn);

            ulElement.appendChild(row);  
            
            if (todoItem.status === STATUS_DONE) {
                
                row.classList.add("checked");
                
            }
            
        }
    
    }
    
    function markedItem(btn){

        var row = btn.parentNode.parentNode, 
            id = row.getAttribute("item-id"),
            status = parseInt(row.getAttribute("item-status"), 10),
            payload = {
                id: id,
                status: status === STATUS_DONE 
                        ? STATUS_TODO 
                        : STATUS_DONE 
            };
             
        xhrPatch("/entries", payload, function (error){

            if (error) {
                
                return alert(error);
                
            }
            
            if (payload.status === STATUS_DONE) {

                row.classList.add("checked");
                
            }
            else {

                row.classList.remove("checked");
                
            }
            
            row.setAttribute("item-status", payload.status);
           
         
        });
    
    }
    
    /* Update the delete function
     * 
     * @param {type} btn
     * @returns {undefined}
     */
     function deleteItem(btn){

        var row = btn.parentNode.parentNode, 
            id = row.getAttribute("item-id"),
            payload = {
                id: id
            };
             
        xhrDelete("/entries", payload, function (error){

            if (error) {
                
                return alert(error);
                
            }
            
            row.parentNode.removeChild(row);
           
         
        });

    }
    
      // Attachings all relevant DOM event handlers here
      
    function bindEvents () {
       
        document.getElementsByTagName("form")[0]
                .addEventListener("submit", formSubmitHandler, false);

        document.querySelector("main")
                .addEventListener("click", handleItemClick, false);

    }

     function formSubmitHandler (e) {
        
        e.preventDefault();

        var form = this,
            items = form.querySelectorAll("input[name]"),
            payload = {},
            i;

        for (i = 0; i < items.length; i += 1 ){

            var item = items[i];

            payload.message = item.value;

        }

        xhrPost("/entries", payload, function(error){
                
                if (!error) {
                    
                    location.reload(); 
                    
                }
                
        });
        
     }
        
    function handleItemClick (e){

        if (e.target.classList.contains("delete-item")){

            //the delete button was clicked
            deleteItem(e.target);

        }
        else if (e.target.classList.contains("check-item")){

            //the delete button was clicked
            markedItem(e.target);

        }
        
    }
   
    document.addEventListener("DOMContentLoaded", function () {

        getData("/entries", function (data) {
            
            buildToDoPage("TODO list!", data);
            buildATodoList(data);
            bindEvents();
            
        });
        
    }, /*propagate*/ false);
 
})();
