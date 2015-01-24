var _ = (function() {

    function random(upper) {
        return Math.floor(Math.random() * upper);
    }

    return {

        shuffleArray: function(array) {
            for (var i = 0; i < array.length; i++) {
                var a = random(array.length),
                    b = random(array.length);
                if (a != b) {
                    var temp = array[a];
                    array[a] = array[b];
                    array[b] = temp;
                }
            }
            return array;
        }

    };

})();