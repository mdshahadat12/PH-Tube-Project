const showCatagory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const cata = data.data;
    // console.log(cata)
    const tapContent = document.getElementById('tapContent');
    cata.forEach(c => {
        const a = document.createElement('a')
        a.classList.add('tab')
        a.innerHTML = `
                ${c.category}
        `
        tapContent.appendChild(a);
    });
}

showCatagory();