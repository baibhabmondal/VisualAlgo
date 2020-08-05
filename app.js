document.addEventListener('DOMContentLoaded', () => {
    console.log('hey')
    // the grid is entire graph
    const grid = document.querySelector(".grid");

    // the src button to select the source
    const srcBtn = document.querySelector('.source');

    // the dest button to select the destination
    const destBtn = document.querySelector('.dest');
    const algo = document.querySelector("#algo");
    let srcFlag = false;
    let destFlag = false;
    let src = [0,0];
    let dest = [0,0];
    // to reset the source in grid in case of re-selection
    let srcPickedBtn = null;

    // to reset the dest in grid in case of re-swelection
    let destPickedBtn = null;

    // this creates a width * width matrix and appends the div's to the grid.
    // the dimensions can be made flexible and can be taken as user input.
    for(let i = 0; i<width; i++) {

        let row = document.createElement('div');
        for(let j = 0; j<width; j++) {
            let col = document.createElement('div');
            col.setAttribute('id', `${i}${j}` );
            col.setAttribute('row', i);
            col.setAttribute('col', j);
            col.addEventListener('click', () => {
                if (srcFlag) {
                    if (srcPickedBtn != null) {
                        srcPickedBtn.classList.remove('source');
                    }
                    srcPickedBtn = col;
                    col.classList.add('source')
                    srcFlag = false;
                }
                else if (destFlag) {
                    if (destPickedBtn != null)
                        destPickedBtn.classList.remove('dest');
                    col.classList.add('dest')
                    destPickedBtn = col;
                    destFlag = false;
                }
            })
            row.appendChild(col);
        }
        grid.appendChild(row);
    }

    srcBtn.addEventListener('click', () => srcFlag = true)
    destBtn.addEventListener('click', () => destFlag = true)

    const run = document.querySelector('.run')
    run.addEventListener('click', () => {

        if (srcPickedBtn == null || destPickedBtn == null) {
            return;
        }
        node = [parseInt(srcPickedBtn.getAttribute('row')), parseInt(srcPickedBtn.getAttribute('col'))];
        target = [parseInt(destPickedBtn.getAttribute('row')), parseInt(destPickedBtn.getAttribute('col'))];
        al = algo.options[algo.selectedIndex].value;
        console.log(al);
        if (al == 'dfs')
            {
                dfs(node, target);
                return;
            }
        else
        console.log('select valid algorithm')
    });

})

let width = 10;
// for visited count
let matrix = [];
for (let i = 0; i < width; i++) {
    let mat = [];
    for (let j = 0; j < width; j++) {
        mat.push(false);
    }
    matrix.push(mat);
}

function dfs(node, target) {

    setTimeout(() => {
        // check row bounds
        let r = parseInt(node[0]);
        let c = parseInt(node[1]);
        target[0] = parseInt(target[0]);
        target[1] = parseInt(target[1]);
        if (r >= 0 && r < width && c >= 0 && c < width) {
            if (matrix[r][c] == true)
                return;
            matrix[r][c] = true;
            if (r == parseInt(target[0]) && c == parseInt(target[1])) {
                alert("Found!")
                console.log('FOUND!')
                return;
            }
            else {
                console.log(node[0] + " " + node[1]);
                let sq = document.getElementById(`${r}${c}`);
                if (!sq.classList.contains('source'))
                    sq.classList.add('visited');
                dfs([r - 1, c], target);
                dfs([r, c + 1], target);
                dfs([r + 1, c], target);
                dfs([r, c - 1], target);
            }
        }
    }, 10)
    return;
}

console.log(matrix)