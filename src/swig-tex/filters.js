module.exports = {
    swigSortOnKey: function swigSortOnKey(input, sortKey, reverse) {
        if (!input){
            return input
        }
        function compare(a, b) {
            if (a[sortKey] < b[sortKey])
                return -1;
            else if (a[sortKey] > b[sortKey])
                return 1;
            else
                return 0;
        }
        var sorted = input.sort(compare)
        if (reverse){
            return sorted.reverse()
        }
        else {
            return sorted
        }
    }
};