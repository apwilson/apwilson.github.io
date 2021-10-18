//console.log('NO CHILD NO');
var counts = [];
var costs = [];
var nodes = [];
var countNodes = [];
var costNodes = [];

document.addEventListener("DOMContentLoaded", function (event) {
    /* event listener */

    // Create and add u0
    {
        var countNode = document.createElement('div');
        countNode.className = 'flex-item';
        var parent = document.createElement('div');
        parent.className = 'flex-container';
        parent.appendChild(countNode);
        document.getElementById('board').appendChild(parent);
        nodes.push(parent);
        countNodes.push(countNode);
        costNodes.push(null);
        counts.push(0);
        costs.push(null);
        countNodes[0].innerHTML = toUCount(0, 0);
    }
    // Create and add u1
    addButton();

    window.setInterval(onTick, 100);
});

function onTick() {
    var addition = 1;
    var base = 2;
    for (var i = 1; i < countNodes.length; i++) {
        addition = addition * (base * counts[i]); // addition = addition * (base ** counts[i]);
        base = base * 2;
    }


    counts[0] = counts[0] + addition * 0.1;
    countNodes[0].innerHTML = toUCount(counts[0].toFixed(1), 0);
}

function toUCount(count, subscript) {
    return count.toString().concat(' ').concat(toUSubscript(subscript));
}
function toUSubscript(subscript) {
    return 'U'.concat(subscript.toString().sub());
}

function addButton() {
    var subscript = countNodes.length;

    var onPress = function () {
        if (counts[subscript - 1] >= costs[subscript]) {
            for (var i = subscript - 1; i >= 0; i--) {
                counts[i] = 0;
                countNodes[i].innerHTML = toUCount(counts[i], i);
                if (i > 0) {
                    costs[i] = 2;
                    costNodes[i].innerHTML = toUCount(costs[i], i);
                }
            }

            var addition = 1;
            var base = 2;
            for (var i = subscript + 1; i < countNodes.length; i++) {
                addition = addition * (base * counts[i]);  // addition * (base ** counts[i]);
                base = base * 2;
            }

            counts[subscript] = counts[subscript] + addition;
            countNodes[subscript].innerHTML = toUCount(counts[subscript], subscript);

            costs[subscript] = (1 + (3 * counts[subscript])); // (1 + (3 ** counts[subscript]));
            costNodes[subscript].innerHTML = toUCount((1 + (3 * counts[subscript])), subscript - 1); //  toUCount((1 + (3 ** counts[subscript])), subscript - 1);

            if ((counts[subscript] == 1) && counts.length == subscript + 1) {
                addButton();
            }
        }
    };
    var countNode = document.createElement('div');
    countNode.className = 'flex-item';
    var costNode = document.createElement('div');
    costNode.className = 'flex-item';
    var parent = document.createElement('div');
    parent.onclick = onPress;
    parent.className = 'flex-container';
    parent.appendChild(countNode);
    parent.appendChild(costNode);
    document.getElementById('board').appendChild(parent);
    nodes.push(parent);
    countNodes.push(countNode);
    costNodes.push(costNode);
    counts.push(0);
    costs.push((1 + (3 * counts[subscript])));  //  costs.push((1 + (3 ** counts[subscript])));
    countNodes[subscript].innerHTML = toUCount(0, subscript)
    costNodes[subscript].innerHTML = (1 + (3 * counts[subscript])).toString().concat(' U').concat((subscript - 1).toString().sub());  // (1 + (3 ** counts[subscript])).toString().concat(' U').concat((subscript - 1).toString().sub());
}
