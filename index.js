const allLoadData = async (id) => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await res.json();
    const buttons = data.data;
    // console.log(buttons);
    // console.log(buttons)
    displayButton(buttons)


}

const displayButton = (buttons) => {

    const divContainer = document.getElementById('button-container');
    divContainer.innerHTML = '';


    buttons.forEach(element => {
        const newButtons = document.createElement('button');
        newButtons.classList = `text-center gap-8`;
        newButtons.innerHTML = `<button onclick="loadCards(${element.category_id})"
         class="btn bg-[#25252526] mr-3 ">${element.category}</button>`;
        divContainer.appendChild(newButtons);
    });



}

const loadCards = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const cards = data.data;
    // console.log(cards)
    displayCards(cards);
}

const displayCards = (cards) => {
    const drawingContainer = document.getElementById('drawing-container')

    drawingContainer.textContent = '';

    if (cards.length === 0) {

        const drawing = document.createElement('div');
        drawing.classList = 'items-center'
        drawing.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="image/Icon.png" alt="Shoes" /></figure>
    <div class="card-body">
    <p class = "text-4xl font-medium">Oops!! Sorry, There is no content here</p>
    `;
        drawingContainer.appendChild(drawing)
    }
    
    const cardsContainer = document.getElementById('card-create');
    cardsContainer.textContent = ''
    
    cards.forEach(element => {
        console.log(element)
        const see = element.others.posted_date;
        const hours = Math.floor( see / 3600)
        const reaming = Math.floor(see % 3600)
        const minutes = Math.floor(reaming / 60)
        const totalTime = `${hours} hr ${minutes} min ago`
        // console.log(time)

       
        const newCards = document.createElement('div');

        newCards.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                    <figure><img class="w-80 h-40" src="${element.thumbnail}" /></figure>
                    <button class="absolute bottom-28 left-32 bg-black text-white">${totalTime}</button>
                    <div class="flex gap-3">
                        <div class="chat-image avatar mb-12">
                            <div class="w-10 mt-4 rounded-full">
                                <img src="${element.authors[0].profile_picture}" />
                            </div>
                        </div>
                        <div>
                            <h1 class="text-2xl text-[#171717] font-bold">${element.title.slice(0, 12)}</h1>
                            <div class="flex items-center"><div> <h1>${element.authors[0].profile_name}</h1></div> ${element.authors[0].verified ? '<h1><img class="w-4" src="image/Twitter_Verified_Badge.svg.png" /></h1>' : ''}
                            </div>
                            <p>${element.others.views}</p>
                        </div>
                    </div>
                </div>     
            `;
        cardsContainer.appendChild(newCards);
    });


}


allLoadData();

