import User from './';
import * as Types from '../../services/redux/users/types';

beforeEach(() => {
    jest.resetModules()
});

const validationError = { error: true };
const addUserType = { type: Types.ADD_USER_REQUEST };
const updateUserType = { type: Types.MODIFY_USER_REQUEST };
const deleteUserType = { type: Types.DELETE_USER_REQUEST };

describe('Crud user', () => {
    test('Add User properly', async () => {
        let user = new User({
            username: "Testsss",
            email: "test@testing.com",
            password: "1234.!Test",
            name: "Testsss",
            surname: "Testing Testating",
            roles: [],
            groups: []
        });

        const Added = await user.save();
        expect(Added).toEqual(expect.not.objectContaining(validationError));
        expect(Added).toEqual(expect.objectContaining(addUserType));
        user = null;
    });

    test('Add Invalid User', async () => {
        let user = new User({
            username: "Testsss",
            email: "test@testing.com",
            password: "1234.!Test",
            name: "Testsss",
            surname: "Testing Testating",
            roles: [],
            groups: []
        });

        delete user.name;
        const Added = await user.save();
        expect(Added).toEqual(expect.objectContaining(validationError));
        user = null;
    });

    test('Update user', async () => {
        let user = new User({
            _id: "b846d654-b4e0-4cb8-bd0c-f44363f82f37",
            username: "Testsss",
            email: "test@testing.com",
            password: "1234.!Test",
            name: "Testsss",
            surname: "Testing Testating",
            roles: [],
            groups: []
        });

        const Added = await user.update();
        expect(Added).toEqual(expect.not.objectContaining(validationError));
        expect(Added).toEqual(expect.objectContaining(updateUserType));
        user = null;
    });

    test('Update Invalid User', async () => {
        let user = new User({
            username: "Testsss",
            email: "test@testing.com",
            password: "1234.!Test",
            name: "Testsss",
            surname: "Testing Testating",
            roles: [],
            groups: []
        });

        const Added = await user.update();
        expect(Added).toEqual(expect.objectContaining(validationError));
        user = null;
    });

    test('Delete user', async () => {
        let user = new User({
            _id: "b846d654-b4e0-4cb8-bd0c-f44363f82f37",
        });

        const Deleted = await user.delete();
        expect(Deleted).toEqual(expect.not.objectContaining(validationError));
        expect(Deleted).toEqual(expect.objectContaining(deleteUserType));
        user = null;
    });

    test('Update Invalid User', async () => {
        let user = new User({
            username: "Testsss",
            email: "test@testing.com",
            password: "1234.!Test",
        });

        const Deleted = await user.delete();
        expect(Deleted).toEqual(expect.objectContaining(validationError));
        user = null;
    });
});

