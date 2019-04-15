/**
 * Created by lifeg on 5/1/2017.
 */
import {CodeInfo} from "../src/inner/namespaces";

console.log(CodeInfo.getCategories("a".charCodeAt(0)).map(x => x.displayName));
