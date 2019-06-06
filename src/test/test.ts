/**
 * Created by lifeg on 5/1/2017.
 */
import {CodeInfo} from "../lib";

console.log(CodeInfo.getCategories("a".charCodeAt(0)).map(x => x.displayName));
