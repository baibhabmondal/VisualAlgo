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
    let src = [0, 0];
    let dest = [0, 0];
    const queue = [];
    let step = 0;
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
    for (let i = 0; i < width; i++) {

        let row = document.createElement('div');
        for (let j = 0; j < width; j++) {
            let col = document.createElement('div');
            col.setAttribute('id', `${i}${j}`);
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
        reset();
        node = [parseInt(srcPickedBtn.getAttribute('row')), parseInt(srcPickedBtn.getAttribute('col'))];
        target = [parseInt(destPickedBtn.getAttribute('row')), parseInt(destPickedBtn.getAttribute('col'))];
        al = algo.options[algo.selectedIndex].value;
        if (al == 'dfs') {
            dfs(node, target);
            return;
        } else if (al == 'bfs') {
            bfs(node, target)
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
                step++;
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
                    sq.innerHTML = step;
                    dfs([r - 1, c], target);
                    dfs([r, c + 1], target);
                    dfs([r + 1, c], target);
                    dfs([r, c - 1], target);
                }
            }
        }, 20)
        return;
    }

    function bfs(node, target) {
        if (found) {
            for (let i = 0; i < queue.length; i++)
                queue.shift();
            return;
        }
        let r = parseInt(node[0]);
        let c = parseInt(node[1]);
        let tr = parseInt(target[0]);
        let tc = parseInt(target[1]);
        queue.push([r, c]);
        while (queue.length > 0) {
            let current = [queue[0][0], queue[0][1]]
            queue.shift();
            if (matrix[current[0]][current[1]] == true)
                continue;
            if (current[0] == tr && current[1] == tc) {
                console.log('found')
                found = true;
                for (let i = 0; i < queue.length; i++)
                    queue.shift();
                return;
            }
            matrix[parseInt(current[0])][parseInt(current[1])] = true;
            r = current[0];
            c = current[1];
            let sq = document.getElementById(`${r}${c}`)
            setTimeout(() => {
                step++;
                if (!sq.classList.contains('source'))
                    sq.classList.add('visited');
                sq.innerHTML = step;
            }, 30)

            if (r > 0)
                queue.push([r - 1, c]);
            if (c < width - 1)
                queue.push([r, c + 1]);
            if (r < width - 1)
                queue.push([r + 1, c]);
            if (c > 0)
                queue.push([r, c - 1]);
        }
    }

    function reset() {
        //  rest found
        found = false;
        step = 0;
        // reset all the grids back to intial color
        while(queue.length > 0)
            queue.shift();
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < width; j++) {
                let sq = document.getElementById(`${i}${j}`)
                if (sq.classList.contains('visited'))
                    sq.classList.remove('visited');
                sq.innerHTML = ''
                matrix[i][j] = false;
            }
        }
    }

})

