/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import "./styles/event_cards.css";
import "./styles/event_info.css";

const $ = require ("jquery");
window.jQuery = $;
window.$ = $

import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios";



/***************** Hidden submenu nav *****************/ 
document.addEventListener("DOMContentLoaded",() => {
    const SUB_MENU = document.getElementById("subMenu");
    const AVATAR = document.querySelector(".avatar");
    // console.log(SUB_MENU);
    // console.log(AVATAR);

    AVATAR.addEventListener("click", function(){
        SUB_MENU.classList.toggle("open-menu");
    })
})

/********************* Ajax Search Form ****************/ 

const SEARCH_FORM = document.getElementById("SearchForm");

SEARCH_FORM.addEventListener("input", function(){

    let formData = new FormData (SEARCH_FORM);

    axios.post("/events/search", formData)
        .then( response => {
            renderEventCard(response.data)
        })
        .catch(error => {
            console.error("Error fetching events:", error);
        });
    })

document.querySelectorAll('.ajax-type-search').forEach(link =>{
    link.addEventListener('click',function(e){
        e.preventDefault();
        const url = this.getAttribute('href')

        axios.get(url,{
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response =>{
            renderEventCard(response.data)
        })
        .catch(error => {
            console.error("Error fetching events:", error);
        });
    })
})

function renderEventCard(arrayEvents, containerSelector ='#SearchResult'){
    const resultContainer = document.querySelector(containerSelector);

    // Clear previous response
    resultContainer.innerHTML = "";

    arrayEvents.forEach(event => {

        // Create card div
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        // Create Card Body
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body")

        // Title with link and add it to card body
        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");

        let titleLink = document.createElement("a");
        titleLink.href = `/event/${event.id}`;
        titleLink.textContent = event.title

        cardTitle.appendChild(titleLink);
        cardBody.appendChild(cardTitle);

        // Event Type + image
        let cardTypeDiv = document.createElement("div");
        cardTypeDiv.classList.add("card-type");

        let cardEventType = document.createElement("h6")
        cardEventType.classList.add("card-subtitle", "mb-2", "text-body-secondary");
        cardEventType.textContent = event.eventType;

        let cardTypeImage = document.createElement("img");
        cardTypeImage.src = `/images/${event.eventType}.png`;
        cardTypeImage.alt = event.eventType;

        cardTypeDiv.appendChild(cardEventType);
        cardTypeDiv.appendChild(cardTypeImage);
        cardBody.appendChild(cardTypeDiv);

        // Horizontal rule
        let hr = document.createElement("hr");
        hr.classList.add("hr-xs");
        cardBody.appendChild(hr);

        // Card Text
        let cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = event.description;
        cardBody.appendChild(cardText);

        // Card links section
        let cardLinkDiv = document.createElement("div");
        cardLinkDiv.classList.add("card-link-div");

        let moreInfoLink = document.createElement("a");
        moreInfoLink.href = `/event/${event.id}`;
        moreInfoLink.classList.add("card-link");
        moreInfoLink.textContent = "More info";

        let subscribeLink = document.createElement("a");
        subscribeLink.href = `/event_subscription/${event.id}`;
        subscribeLink.classList.add("card-link");
        subscribeLink.textContent = "Subscribe";

        cardLinkDiv.appendChild(moreInfoLink);
        cardLinkDiv.appendChild(subscribeLink);

        // Admin control
        if (event.isAdmin) { 
            let editLink = document.createElement("a");
            editLink.href = `/update_event/${event.id}`;
            editLink.classList.add("card-link");
            editLink.textContent = "✏️";

            let deleteLink = document.createElement("a");
            deleteLink.href = `/delete_event/${event.id}`;
            deleteLink.classList.add("card-link");
            deleteLink.textContent = "❌";

            cardLinkDiv.appendChild(editLink);
            cardLinkDiv.appendChild(deleteLink);
        }

        cardBody.appendChild(cardLinkDiv);
        cardDiv.appendChild(cardBody);

        // Append all elements to the result
        resultContainer.appendChild(cardDiv);
    });

}