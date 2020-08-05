document.addEventListener('DOMContentLoaded', () => {
    console.log('hey')
    // the grid is entire graph
    const grid = document.querySelector(".grid");

    // the src button to select the source
    const srcBtn = document.querySelector('.source');

    // the dest button to select the destination
    const destBtn = document.querySelector('.dest');
    const algo = document.querySelector("#algo");
    let width = 10;
    let srcFlag = false;
    let destFlag = false;

    // to reset the source in grid in case of re-selection
    let srcPickedBtn = null;

    // to reset the dest in grid in case of re-swelection
    let destPickedBtn = null;

    // this creates a width * width matrix and appends the div's to the grid.
    // the dimensions can be made flexible and can be taken as user input.
    for (let i = 0; i < width * width; i++) {
        let square = document.createElement('div')
        square.setAttribute('id', i)
        grid.appendChild(square);
        square.addEventListener('click', () => {
            if(srcFlag) {
                if(srcPickedBtn != null) {
                    srcPickedBtn.classList.remove('source');
                }
                srcPickedBtn = square;
                square.classList.add('source')
                srcFlag = false;
            }
            else if(destFlag) {
                if(destPickedBtn != null)
                    destPickedBtn.classList.remove('dest');
                square.classList.add('dest')
                destPickedBtn = square;
                destFlag = false;
            }

        })
    }
    // Listen for algo change events 
    algo.addEventListener('change', () => {
        // to get the selected option from the dropdown
        let al = algo.options[algo.selectedIndex].value;
        console.log(al);
    })
    srcBtn.addEventListener('click', () => srcFlag = true)
    destBtn.addEventListener('click', () => destFlag = true)

})


