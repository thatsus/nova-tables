
class FuzzyMatcher {

    /**
     * Returns true if every letter in `fuzz` is present in `string` in the 
     * same order.
     * @param  {string} fuzz - the needle being sought
     * @param  {string} string - the haystack
     * @return {bool}        
     */
    matches(fuzz, string) {
        if (typeof string === 'number') {
            string += "";
        }
        if (typeof string !== 'string') {
            return false;
        }
        string = string.toLowerCase();
        var match = fuzz.toLowerCase();
        for (var i = 0; i < match.length; i++) {
            var indexOf = string.indexOf(match[i]);
            if (indexOf < 0) {
                return false;
            }
            string = string.substr(indexOf + 1);
        }
        return true;
    }
}

module.exports = FuzzyMatcher;
