/**
 * Created by lifeg on 5/1/2017.
 */
import {uniGetCategories} from "../lib/unicode";

console.log(uniGetCategories.code("a".charCodeAt(0)).map(x => x.displayName));
