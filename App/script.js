let bars = [];

const def = "#fd0081",
      chng = "#431f91",
      finished = "#8ef511",
      selected = "brown";

window.onload = setup();

async function setup() {
    let b = document.getElementById("bars");
    let d = document.getElementById("delay");
    document.getElementById("b").innerText = b.value;
    document.getElementById("d").innerText = d.value + "ms";

    if (bars.length != parseInt(b.value)) {
        generateBars(parseInt(b.value));
    }
}

function reset() {
    location.reload();
}

function Disable_The_Input() {
    let x = document.getElementsByTagName("input");
    for (let i = 0; i < x.length; i++)
        x[i].disabled = true;
    return parseInt(document.getElementById("delay").value);
}

function Finished_Sorting() {
    let x = document.getElementsByClassName("bar");
    for (let i = 0; i < x.length; i++)
        x[i].style.backgroundColor = finished;

    x = document.getElementsByTagName("input");
    for (let i = 0; i < x.length; i++)
        x[i].disabled = false;
}

// A helper function to find the maximum absolute value in the array
function getMaxValue(arr) {
    let max = 0;
    for (const val of arr) {
        if (Math.abs(val) > max) {
            max = Math.abs(val);
        }
    }
    // Return 1 to prevent division by zero if all values are 0
    return max || 1; 
}

// Generate random bars
function generateBars(n = -1) {
    let container = document.getElementById("container");
    n = n < 0 ? Math.floor(Math.random() * 20 + 5) : n;
    let arr = [];
    for (let i = 0; i < n; i++) {
        // You can use a larger range now
        arr.push(Math.floor(Math.random() * 200) - 100); 
    }
    
    const maxVal = getMaxValue(arr);
    bars = arr.map((val, idx) => {
        const cls = val >= 0 ? "bar positive" : "bar negative";
        // Calculate height as a percentage of the max value
        const height = (Math.abs(val) / maxVal) * 100;
        return `<div class="${cls}" id="${idx}" style="height:${height}%">${val}</div>`;
    });
    
    container.innerHTML = bars.join('');
}

// Use user input
function UseUserArray() {
    const input = document.getElementById("userArray").value;
    if (!input) return alert("Please enter array values!");

    const arr = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
    if (arr.length === 0) return alert("Enter valid numbers separated by commas!");

    const maxVal = getMaxValue(arr);
    bars = arr.map((val, idx) => {
        const cls = val >= 0 ? "bar positive" : "bar negative";
        // Calculate height as a percentage of the max value
        const height = (Math.abs(val) / maxVal) * 100;
        return `<div class="${cls}" id="${idx}" style="height:${height}%">${val}</div>`;
    });

    document.getElementById("container").innerHTML = bars.join('');
}

// Sleep
function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Map range for beep
function MapRange(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// SELECTION SORT
async function SelectionSort() {
    document.getElementById('technique').innerText = "Selection Sort";
    document.getElementById('technique').style.display = 'flex';
    let delay = Disable_The_Input();
    let container = document.getElementById("container");

    for (let i = 0; i < bars.length; i++) {
        let mn_ind = i;
        let curr_id = bars[i].split('id="')[1].split('"')[0];
        document.getElementById(curr_id).style.backgroundColor = selected;
        for (let j = i + 1; j < bars.length; j++) {
            let nxt_id = bars[j].split('id="')[1].split('"')[0];
            document.getElementById(nxt_id).style.backgroundColor = chng;
            let a = parseInt(bars[mn_ind].split('>')[1].split('<')[0]);
            let b = parseInt(bars[j].split('>')[1].split('<')[0]);
            if (a > b) mn_ind = j;
            await Sleep(delay / 5);
            document.getElementById(nxt_id).style.backgroundColor = def;
        }
        let nxt_id = bars[mn_ind].split('id="')[1].split('"')[0];
        [bars[mn_ind], bars[i]] = [bars[i], bars[mn_ind]];
        container.innerHTML = bars.join('');
        await Sleep(delay / 2);
        document.getElementById(curr_id).style.backgroundColor = def;
        document.getElementById(nxt_id).style.backgroundColor = def;
    }
    document.getElementById('technique').style.display = 'none';
    Finished_Sorting();
}

// BUBBLE SORT
async function BubbleSort() {
    document.getElementById('technique').innerText = "Bubble Sort";
    document.getElementById('technique').style.display = 'flex';
    let delay = Disable_The_Input();
    let container = document.getElementById("container");

    for (let i = 0; i < bars.length - 1; i++) {
        let has_swap = false;
        for (let j = 0; j < bars.length - i - 1; j++) {
            let curr_id = bars[j].split('id="')[1].split('"')[0];
            let nxt_ele = bars[j + 1].split('id="')[1].split('"')[0];

            document.getElementById(curr_id).style.backgroundColor = selected;
            let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
            beep(50, sound, delay);
            document.getElementById(nxt_ele).style.backgroundColor = chng;
            await Sleep(delay / 2);
            let a = parseInt(bars[j].split('>')[1].split('<')[0]);
            let b = parseInt(bars[j + 1].split('>')[1].split('<')[0]);
            if (a > b) {
                has_swap = true;
                [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
                container.innerHTML = bars.join('');
            }
            document.getElementById(curr_id).style.backgroundColor = selected;
            document.getElementById(nxt_ele).style.backgroundColor = chng;
            await Sleep(delay / 2.0);
            document.getElementById(curr_id).style.backgroundColor = def;
            document.getElementById(nxt_ele).style.backgroundColor = def;
        }
        if (!has_swap) break;
    }
    document.getElementById('technique').style.display = 'none';
    Finished_Sorting();
}

// INSERTION SORT
async function InsertionSort() {
    document.getElementById('technique').innerText = "Insertion Sort";
    document.getElementById('technique').style.display = 'flex';
    let delay = Disable_The_Input();
    let container = document.getElementById("container");
    for (let i = 1; i < bars.length; i++) {
        let j = i - 1;
        let key = bars[i];
        let curr_id = key.split('id="')[1].split('"')[0];
        let nxt_ele = bars[j].split('id="')[1].split('"')[0];
        document.getElementById(curr_id).style.backgroundColor = selected;
        let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
        beep(45, sound, delay);
        while (j >= 0 && parseInt(bars[j].split('>')[1].split('<')[0]) > parseInt(key.split('>')[1].split('<')[0])) {
            document.getElementById(nxt_ele).style.backgroundColor = def;
            nxt_ele = bars[j].split('id="')[1].split('"')[0];
            document.getElementById(nxt_ele).style.backgroundColor = chng;
            await Sleep(delay);
            bars[j + 1] = bars[j];
            j--;
        }
        bars[j + 1] = key;
        container.innerHTML = bars.join('');
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;
        await Sleep(delay * 3.0 / 5);
        document.getElementById(curr_id).style.backgroundColor = def;
        document.getElementById(nxt_ele).style.backgroundColor = def;
    }
    document.getElementById('technique').style.display = 'none';
    Finished_Sorting();
}

// MERGE SORT
function Slide_down(l, r) {
    let temp = bars[r];
    for (let i = r - 1; i >= l; i--) {
        bars[i + 1] = bars[i];
    }
    bars[l] = temp;
}

async function merge(l, m, r, d) {
    let y = l;
    let i = l;
    let j = m + 1;

    while (i < j && j <= r) {
        let curr_id = bars[j].split('id="')[1].split('"')[0];
        let nxt_ele = bars[i].split('id="')[1].split('"')[0];
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;
        let a = parseInt(bars[j].split('>')[1].split('<')[0]);
        let b = parseInt(bars[i].split('>')[1].split('<')[0]);

        if (a > b) i++;
        else {
            Slide_down(i, j);
            i++;
            j++;
        }
        await Sleep(d / 2.0);
        container.innerHTML = bars.join('');
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;
        let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
        beep(50, sound, d);
        await Sleep(d / 2.0);
        document.getElementById(curr_id).style.backgroundColor = def;
        document.getElementById(nxt_ele).style.backgroundColor = def;
        sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
        beep(50, sound, d);
    }
}

async function mergeSort(l, r, d) {
    if (l < r) {
        let m = parseInt(l + (r - l) / 2);
        await mergeSort(l, m, d);
        await mergeSort(m + 1, r, d);
        await merge(l, m, r, d);
    }
}

async function MergeSort() {
    document.getElementById('technique').innerText = "Merge Sort";
    document.getElementById('technique').style.display = 'flex';
    let delay = Disable_The_Input();
    await mergeSort(0, bars.length - 1, delay);
    document.getElementById('technique').style.display = 'none';
    Finished_Sorting();
}

// QUICK SORT
async function Partition(l, r, d) {
    let i = l - 1;
    let j = l;
    let id = bars[r].split('id="')[1].split('"')[0];
    document.getElementById(id).style.backgroundColor = selected;
    for (j = l; j < r; j++) {
        let a = parseInt(bars[j].split('>')[1].split('<')[0]);
        let b = parseInt(bars[r].split('>')[1].split('<')[0]);
        if (a < b) {
            i++;
            let curr_id = bars[i].split('id="')[1].split('"')[0];
            let nxt_ele = bars[j].split('id="')[1].split('"')[0];
            document.getElementById(curr_id).style.backgroundColor = chng;
            document.getElementById(nxt_ele).style.backgroundColor = chng;

            let temp = bars[i];
            bars[i] = bars[j];
            bars[j] = temp;

            await Sleep(d / 3.0);
            container.innerHTML = bars.join('');
            document.getElementById(curr_id).style.backgroundColor = chng;
            document.getElementById(nxt_ele).style.backgroundColor = chng;
            document.getElementById(id).style.backgroundColor = selected;
            let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
            beep(50, sound, d);
            await Sleep(d / 3.0);
            document.getElementById(curr_id).style.backgroundColor = def;
            document.getElementById(nxt_ele).style.backgroundColor = def;
        }
    }

    let temp = bars[i + 1];
    bars[i + 1] = bars[r];
    bars[r] = temp;

    container.innerHTML = bars.join('');
    document.getElementById(id).style.backgroundColor = selected;
    await Sleep(d / 3.0);
    document.getElementById(id).style.backgroundColor = def;
    return i + 1;
}

async function quickSort(l, r, d) {
    if (l < r) {
        let p = await Partition(l, r, d);
        await quickSort(l, p - 1, d);
        await quickSort(p + 1, r, d);
    }
}

async function QuickSort() {
    document.getElementById('technique').innerText = "Quick Sort";
    document.getElementById('technique').style.display = 'flex';
    let delay = Disable_The_Input();
    await quickSort(0, bars.length - 1, delay);
    document.getElementById('technique').style.display = 'none';
    Finished_Sorting();
}

// HEAP SORT
async function Heapfiy(n, i, d) {
    i = parseInt(i);
    let largest = i;
    let l = 2 * i + 1; // left
    let r = 2 * i + 2; // right
    let curr_id = bars[i].split('id="')[1].split('"')[0];
    let nxt_ele;
    let id3;

    document.getElementById(curr_id).style.backgroundColor = selected;
    if (r < n) {
        id3 = bars[r].split('id="')[1].split('"')[0];
        document.getElementById(id3).style.backgroundColor = chng;
    }
    if (l < n) {
        nxt_ele = bars[l].split('id="')[1].split('"')[0];
        document.getElementById(nxt_ele).style.backgroundColor = chng;
    }
    await Sleep(d / 3.0);
    if (l < n && parseInt(bars[l].split('>')[1].split('<')[0]) > parseInt(bars[largest].split('>')[1].split('<')[0]))
        largest = l;
    if (r < n && parseInt(bars[r].split('>')[1].split('<')[0]) > parseInt(bars[largest].split('>')[1].split('<')[0]))
        largest = r;

    if (largest != i) {
        let t = bars[i];
        bars[i] = bars[largest];
        bars[largest] = t;
        container.innerHTML = bars.join('');
        document.getElementById(curr_id).style.backgroundColor = selected;
        let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
        beep(50, sound, d);
        if (r < n) document.getElementById(id3).style.backgroundColor = chng;
        if (l < n) document.getElementById(nxt_ele).style.backgroundColor = chng;
        await Sleep(d / 3.0);
        container.innerHTML = bars.join('');
        await Heapfiy(n, largest, d);
    }
    container.innerHTML = bars.join('');
}

async function HeapSort() {
    document.getElementById('technique').innerText = "Heap Sort";
    document.getElementById('technique').style.display = 'flex';
    let delay = Disable_The_Input();
    let n = bars.length;

    for (let i = n / 2 - 1; i >= 0; i--)
        await Heapfiy(n, i, delay);

    for (let i = n - 1; i >= 0; i--) {
        let t = bars[0];
        bars[0] = bars[i];
        bars[i] = t;
        container.innerHTML = bars.join('');
        await Heapfiy(i, 0, delay);
    }
    document.getElementById('technique').style.display = 'none';
    Finished_Sorting();
}