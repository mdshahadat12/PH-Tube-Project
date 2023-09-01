// category option Function
const showCatagory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const cata = data.data;
    // console.log(data)

    const tapContent = document.getElementById('tapContent');
    cata.forEach(c => {
        const a = document.createElement('a')
        a.innerHTML = `
                <a onclick="showcard('${c.category_id}')" class="tab active:bg-[#FF1F3D] bg-[#19191926] active:text-white btn">${c.category}</a>
        `
        tapContent.appendChild(a);
    });
}
// default Category Show
showCatagory();

// Main body section Function
const showcard = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const card = data.data;
    
    const cardContainer = document.getElementById('cardContainer');

    // When sort button clicked
    document.getElementById('sortBtn').addEventListener('click', async () => {

        card.sort((a,b) =>parseInt(b.others.views) - parseInt(a.others.views));
        cardContainer.innerHTML = "";
        
        if(card.length == 0){
            cardContainer.classList.remove('md:grid-cols-2', 'lg:grid-cols-4')
            cardContainer.classList.add('justify-center')
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="text-center w-full mx-auto mt-14">
            <img class="mx-auto"src="./image/icon.png">
            <h1 class="text-2xl font-bold">Oops!! Sorry, There is no <br/> content here</h1>
            </div>
            `
            cardContainer.appendChild(div);
        }
    
        card.forEach(a => {
            cardContainer.classList.add('md:grid-cols-2', 'lg:grid-cols-4')
            const div = document.createElement('div');
        div.innerHTML = `
             <div>
                <div class="relative">
                <img class="mb-5 rounded-lg h-44 w-full" src=${a.thumbnail}>
              <h3 class="bg-[#171717] absolute text-sm bottom-4 right-1 px-2 text-white rounded-lg"> ${secondsToHms(a.others.posted_date)}</h3>
                </div>
                </div>
                    <div class="flex gap-2">
                        <div>
                            <img class="rounded-full h-[40px] w-[40px]"src=${a.authors[0].profile_picture}>
                        </div>
                    <div>
                        <h2 class="text-lg font-bold">${a.title}</h2>
                    <div class="flex gap-2 items-center my-2">
                        <h3>${a.authors[0].profile_name}</h3>
                        ${a.authors[0].verified? '<img src="./Image/fi_10629607.png"></img>' : ""}
                    </div>
                    <p>${a.others.views}views</p>
                </div>
            </div>
        `
        cardContainer.appendChild(div);
        });
    })

    cardContainer.innerHTML = "";
    
    if(card.length == 0){
        cardContainer.classList.remove('md:grid-cols-2', 'lg:grid-cols-4')
        cardContainer.classList.add('justify-center')
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="text-center w-full mx-auto mt-14">
        <img class="mx-auto"src="./image/icon.png">
        <h1 class="text-2xl font-bold">Oops!! Sorry, There is no <br/> content here</h1>
        </div>
        `
        cardContainer.appendChild(div);
    }

    card.forEach(a => {
        cardContainer.classList.add('md:grid-cols-2', 'lg:grid-cols-4')
        const div = document.createElement('div');
    div.innerHTML = `
         <div>
            <div class="relative">
            <img class="mb-5 rounded-lg h-44 w-full" src=${a.thumbnail}>
          <h3 class="bg-[#171717] absolute text-sm bottom-4 right-1 px-2 text-white rounded-lg"> ${secondsToHms(a.others.posted_date)}</h3>
            </div>
            </div>
                <div class="flex gap-2">
                    <div>
                        <img class="rounded-full h-[40px] w-[40px]"src=${a.authors[0].profile_picture}>
                    </div>
                <div>
                    <h2 class="text-lg font-bold">${a.title}</h2>
                <div class="flex gap-2 items-center my-2">
                    <h3>${a.authors[0].profile_name}</h3>
                    ${a.authors[0].verified? '<img src="./Image/fi_10629607.png"></img>' : ""}
                </div>
                <p>${a.others.views}views</p>
            </div>
        </div>
    `
    cardContainer.appendChild(div);
    });  
}

// default all show
showcard('1000');

// second to hrs and min
function secondsToHms(d) {
    if(d == ""){
        return '';
    }
    d = parseInt(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);

    const hDisplay = h > 0 ? h + " hrs " : "";
    const mDisplay = m > 0 ? m + " min " : "";
    return hDisplay + mDisplay + "ago"; 
}