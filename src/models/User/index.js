import { addUser, updateUser, deleteUser } from '../../services/redux/users/actions'
import Utils, { CreateTranslationForModelAttributes } from "../Utils";
import validate from 'validate.js'
import { ModelExpected } from './attributes'
import {clone} from 'ramda';

/** Class User with Utils functions*/
export default class User extends Utils{

    constructor( obj = {} ){
        /** Send to utils class the Model and the object passed for build this class */
        super(ModelExpected, obj);
    }

    /** Call Redux action for Save User in DB and Redux */
    save(){
        const filteredConstraints = clone(this.constraints);
        delete filteredConstraints._id;
        const validation = validate(this.getData(),filteredConstraints);
        return validation  === undefined ? this.store.dispatch(addUser(this.getData())): {error: true, ...validation}
    }

    /** Call Redux action for Update User in DB and Redux */
    update(){
        const validation = validate(this.getData(),this.constraints);
        return validation  === undefined ? this.store.dispatch(updateUser(this.getData())): {error: true, ...validation}
    }

    delete(){
        const validation = validate(this.getData(), {_id: this.constraints['_id']});
        return validation  === undefined ? this.store.dispatch(deleteUser(this.getData())): {error: true, ...validation}
    }

    /** Translations defined by model keys and create automatically from utils function*/
    translations = CreateTranslationForModelAttributes('User',ModelExpected);
}
const SampleUser = new User();
export { SampleUser }
