/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Exceed Expectations submission
*/

//add an invisible not found message (visibility is adjusted based on search results)
function addNotFoundMessage() {
    const header = document.querySelector('header');
    const notFoundMessageHTML = '<div class="not-found-message hide">No results found</div>'
    header.insertAdjacentHTML('afterend', notFoundMessageHTML);
}

//add a search bar 
function addSearchBar(list) {
    const searchContainer = document.querySelector('.header');

    const searchBarHTML = `
        <label for="search" class="student-search">
            <input id="search" placeholder="Search for students...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
        </label>`;
    searchContainer.insertAdjacentHTML('beforeend', searchBarHTML);

    const searchBar = document.getElementById('search');

    //check if input matches student name
    searchBar.addEventListener('input', () => {
        const newList = [];
        const searchTerm = searchBar.value.toLowerCase();
        for (let student in list) {
            const studentName = `${list[student].name.first} ${list[student].name.last}`.toLowerCase();
            if (studentName.includes(searchTerm)) {
                newList.push(list[student]);
            }
        }

        //if the search term has no matches then show the not found message otherwise keep it hidden
        const notFoundMessage = document.querySelector('.not-found-message');
        if (newList.length === 0) {
            notFoundMessage.classList.remove('hide');
        } else if (!notFoundMessage.classList.contains('hide')) {
            notFoundMessage.classList.add('hide');
        }

        showPage(newList, 1);
        addPagination(newList);
    });
}

//add max 9 students to the page based on the page number
function showPage(list, page) {
    const startIndex = (page * 9) - 9;
    const endIndex = page * 9;
    const studentList = document.querySelector('ul.student-list');
    studentList.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        if (startIndex <= i && i < endIndex) {
            let studentHTML = `
            <li class="student-item cf">
              <div class="student-details">
                <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                <h3>${list[i].name.first} ${list[i].name.last}</h3>
                <span class="email">${list[i].email}</span>
              </div>
              <div class="joined-details">
                <span class="date">${list[i].registered.date}</span>
              </div>
            </li>`;
            studentList.insertAdjacentHTML('beforeend', studentHTML);
        }
    }
}

//add pagination buttons
function addPagination(list) {
    const numberOfButtons = Math.ceil(list.length / 9);
    const linkList = document.querySelector('ul.link-list');
    linkList.innerHTML = '';

    for (let i = 1; i <= numberOfButtons; i++) {
        const paginationButton = `
          <li>
           <button type="button">${i}</button>
         </li>`;
        linkList.insertAdjacentHTML('beforeend', paginationButton);
    }
    const firstButton = linkList.querySelector('button');
    if (firstButton) {
        firstButton.classList.add('active');
    }
    
    linkList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const activeButton = document.querySelector('.active');
            activeButton.classList.remove('active');
            event.target.classList.add('active');
            showPage(list, event.target.textContent);
        }
    })
}

//call functions
showPage(data, 1);
addPagination(data);
addSearchBar(data);
addNotFoundMessage();