document.addEventListener('DOMContentLoaded', () => {
    console.log('hey')
    // the grid is entire graph
    const grid = document.querySelector(".grid");
    // the src button to select the source
    const srcBtn = document.querySelector('.source');
    // the dest button to select the destination
    const destBtn = document.querySelector('.dest');
    const algo = document.querySelector("#algo");
    const run = document.querySelector('.run');
    const rest = document.querySelector('.reset');
    let srcFlag = false;
    let destFlag = false;
    let src = [0,0];
    let dest = [0,0];
    // to reset the source in grid in case of re-selection
    let srcPickedBtn = null;
    // to reset the dest in grid in case of re-swelection
    let destPickedBtn = null;
    let width = 10;
    let found = false;
    // for visited count
    let matrix = [];
  

    srcBtn.addEventListener('click', () => srcFlag = true)
    destBtn.addEventListener('click', () => destFlag = true)
    rest.addEventListener('click', () => reset());

    for (let i = 0; i < width; i++) {
        let mat = [];
        for (let j = 0; j < width; j++) {
            mat.push(false);
        }
        matrix.push(mat);
    }

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

    run.addEventListener('click', () => {

        if (srcPickedBtn == null || destPickedBtn == null) {
            return;
        }
        node = [parseInt(srcPickedBtn.getAttribute('row')), parseInt(srcPickedBtn.getAttribute('col'))];
        target = [parseInt(destPickedBtn.getAttribute('row')), parseInt(destPickedBtn.getAttribute('col'))];
        al = algo.options[algo.selectedIndex].value;
        if (al == 'dfs')
            {
                dfs(node, target);
                return;
            }
        else
        console.log('select valid algorithm')
    });


    function dfs(node, target) {
        if (found)
            return;
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
                    // alert("Found!")
                    found = true;
                    console.log('FOUND!')
                    return;
                }
                else {
                    let sq = document.getElementById(`${r}${c}`);
                    if (!sq.classList.contains('source'))
                        sq.classList.add('visited');
                    dfs([r - 1, c], target);
                    dfs([r, c + 1], target);
                    dfs([r + 1, c], target);
                    dfs([r, c - 1], target);
                }
            }
        }, 20)
        return;
    }

    function reset() {
        // reset source and dest
        if(srcPickedBtn != null)
            srcPickedBtn.classList.remove('source')
        if(destPickedBtn != null)
            destPickedBtn.classList.remove('dest')
        //  rest found
        found = false;
        // reset all the grids back to intial color
        for(let i = 0; i<width; i++){
            for(let j = 0; j<width; j++) {
                    let sq = document.getElementById(`${i}${j}`)
                    if (sq.classList.contains('visited'))
                        sq.classList.remove('visited');
                    matrix[i][j] = false;
            }
        }
    }

})

