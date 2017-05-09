(function(){  

    function buildToDoPage (title, entries) {

        var mainElement = document.createElement("main"),
            section1 = document.createElement("section"),
            section2 = document.createElement("section"),
            header = document.createElement("header"),
            h1Element = document.createElement("h1"),
            ulElement = document.createElement("ul"),
            content = document.createTextNode(title);

            ulElement.classList.add( "table", "contact-list");
            mainElement.classList.add( "main-wrapper");
            section1.classList.add( "header-wrapper");
            section2.classList.add( "main-content");
            header.classList.add( "header", "text-primary-color", "divider-color",
                                   "light-primary-color");

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
            deleteElement,
            editElement,
            liElement,
            h2Element,
            listIndex,
            h3Element,
            pElement,
            listText;


        for (var i = 0; i < dataArray.length; i += 1) {

          var data = dataArray[i];

            liElementCount +=1;  //May use this to index as a unique identifier for contacts.           
            liElement = document.createElement("li");
            h2Element = document.createElement("h2");
            h3Element = document.createElement("h3");
            pElement = document.createElement("p");
            deleteElement = document.createElement("div");
            editElement = document.createElement("div");
            listText = document.createTextNode(data.message);
            listIndex = document.createTextNode(i);

            liElement.classList.add("row", "contact", "light-primary-color");
            h2Element.classList.add( "col", "contact-name");
            h3Element.classList.add( "col", "contact-name");
            liElement.setAttribute("contact-id", data.id);
            deleteElement.classList.add("fa", "fa-trash", "fa-lg", "delete-item");
            editElement.classList.add("fa", "fa-pencil", "fa-lg", "edit-item");

            h2Element.appendChild(listIndex);
            h3Element.appendChild(listText);
            liElement.appendChild(h2Element);
            liElement.appendChild(h3Element);
            liElement.appendChild(deleteElement);
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
