(function(){  

    function buildToDoPage (title, entries) {

        var mainElement = document.createElement("main"),
            section1 = document.createElement("section"),
            section2 = document.createElement("section"),
            header = document.createElement("header"),
            h1Element = document.createElement("h1"),
            ulElement = document.createElement("ul"),
            content = document.createTextNode(title);

            ulElement.classList.add( "table", "item-list");
            mainElement.classList.add( "main-wrapper");
            section1.classList.add( "header-wrapper", "container", "col-md-5", "col-md-offset-4");
            section2.classList.add( "main-content", "container", "col-md-5", "col-md-offset-4");
            header.classList.add( "header", "text-primary-color");

            h1Element.appendChild(content);
            header.appendChild(h1Element);
            section1.appendChild(header);
            section2.appendChild(ulElement);
            mainElement.appendChild(section1);
            mainElement.appendChild(section2);

            document.body.appendChild(mainElement);
            
     
    } 

    function buildATodoList(dataArray){
    
        var ulElement = document.getElementsByTagName("ul")[0],
            liElementCount = 0,
            checkElement,
            editElement,
            liElement,
            listIndex,
            h3Element,
            listText;


        for (var i = 0; i < dataArray.length; i += 1) {

          var data = dataArray[i];

            liElementCount +=1;  //May use this to index as a unique identifier for contacts.           
            liElement = document.createElement("li");
            h3Element = document.createElement("h3");
            checkElement = document.createElement("div");
            editElement = document.createElement("div");
            listText = document.createTextNode(data.message);
            listIndex = document.createTextNode(i);

            liElement.classList.add("row", "light-primary-color");
            h3Element.classList.add( "col", "item-message");
            liElement.setAttribute("item-id", data.id);
            checkElement.classList.add("col", "fa", "fa-check-square-o", "fa-lg", "delete-item");
            editElement.classList.add("col", "fa", "fa-pencil", "fa-lg", "edit-item");

            h3Element.appendChild(listText);
            liElement.appendChild(checkElement);
            liElement.appendChild(h3Element);
            liElement.appendChild(editElement);

            ulElement.appendChild(liElement);  
        }
    
    }
    document.addEventListener("DOMContentLoaded", function () {

        getData("/entries", function (data) {
            
            buildToDoPage("TODO list!", data);
            buildATodoList(data);
            
        });
        
    }, /*propagate*/ false);
 
})();
