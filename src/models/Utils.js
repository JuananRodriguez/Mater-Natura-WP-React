import React from 'react';
// import { store } from '../services/redux/store'
import { FormattedMessage } from 'react-intl';

/** Create Automatically translations for Keys attributes
 * and return React components
 * */
// export const CreateTranslationForModelAttributes = (prefix, ModelExpected) => {
//     const Translations = {};
//     ModelExpected.forEach(row => {
//         Translations[row.key] = (
//             <FormattedMessage
//                 id={`${prefix}.model.${row.key}`}
//                 defaultMessage={row.key.toString()}
//                 description={`Text of ${row.key} property in ${prefix}`}
//             />
//         )
//     });
//     return Translations;
// };

/** Take constrains defined in ModelExpected and return an object
 * only with constraints by key
 * */
const createConstraintsByModelExpected = (ModelExpected) => {
    let ConstraintsObj = {};
    ModelExpected.forEach(row => { if(row.constraints) ConstraintsObj[row.key] = row.constraints });
    return ConstraintsObj
};

class Utils {

    /** Get Model from extender class and object passed
     *  Then build model
     * */
    constructor( ModelExpected, obj = {} ){
        this.ModelExpected = ModelExpected;
        this.ModelExpected.forEach(param => {
            this[param.key] = !!obj[param.key] ? obj[param.key] : param['defaultValue'];
        });

        this.constraints = createConstraintsByModelExpected(this.ModelExpected);

        this.store = store;
    }

    /** Returns all the data of the model or only the data filtered by the keys passed
     * (a string or an array of strings). The returned data will always be contained in the expected model.
     * */
    getData = (keyForFilter = null) => keyForFilter ? this.filter(keyForFilter) : this.toJson();


    /**filter data by the keys passed
     * (a string or an array of strings)
     * */
    filter = (filter = []) => {
        const Json = {};

        const filterByArray = () => {
            filter.forEach(param => {
                if (this[param]) Json[param] = this[param]
            });
            return Json;
        };

        const filterByString = () =>{
            if (this[filter]) Json[filter] = this[filter];
            return Json;
        };

        return typeof filter === 'string' ? filterByString() :
            Array.isArray(filter) ? filterByArray() : Json
    };

    /** return all user as json obj */
    toJson = () => {
        const Json = {};
        this.ModelExpected.forEach(param => {
            Json[param.key] = this[param.key]
        });
        return Json
    };

}
export default Utils;
