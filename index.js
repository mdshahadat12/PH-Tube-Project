const showCatagory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const cata = data.data;
    // console.log(cata)
    const tapContent = document.getElementById('tapContent');
    cata.forEach(c => {
        const a = document.createElement('a')
        // a.classList.add('tab','active:bg-[#FF1F3D]', 'bg-[#19191926]','active:text-white','btn')
        a.innerHTML = `
                <a onclick="showcard('${c.category_id}')" class="tab active:bg-[#FF1F3D] bg-[#19191926] active:text-white btn">${c.category}</a>
        `
        tapContent.appendChild(a);
    });
}

showCatagory();

const showcard = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const card = data.data;
    console.log(data)

    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    card.forEach(a => {

        const div = document.createElement('div')
    div.innerHTML = `
         <div>
            <div class="relative">
            <img class="mb-5 rounded-lg h-44 w-80" src=${a.thumbnail}>
          <h3 class="bg-[#171717] absolute text-sm bottom-4 right-1 px-2 text-white rounded-lg"> ${secondsToHms(a.others.posted_date)}</h3>
            </div>
            </div>
                <div class="flex gap-2">
                    <div>
                        <img class="rounded-full h-[45px] w-[45px]"src=${a.authors[0].profile_picture}>
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

showcard('1000');

function secondsToHms(d) {
    if(d == ""){
        return '';
    }
    d = parseInt(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);

    let hDisplay = h > 0 ? h + " hrs " : "";
    let mDisplay = m > 0 ? m + " min " : "";
    return hDisplay + mDisplay + "ago"; 
}