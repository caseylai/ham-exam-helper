var _ = (function() {

    function random(upper) {
        return Math.floor(Math.random() * upper);
    }

    return {

        shuffleArray: function(array) {
            var clone = [].concat(array);
            for (var i = 0; i < clone.length; i++) {
                var a = random(clone.length),
                    b = random(clone.length);
                if (a != b) {
                    var temp = clone[a];
                    clone[a] = clone[b];
                    clone[b] = temp;
                } else {
                    i--;
                }
            }
            return clone;
        }

    };

})();