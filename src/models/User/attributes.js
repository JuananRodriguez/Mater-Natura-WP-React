import React from 'react';
import FormattedMessage from '../../Contexts/LanguageContext/Components/FormattedMessage';

/** Model by keys, values expected and constraints ( optional ) */
export const ModelExpected = [
    {
        key: '_id',
        defaultValue: null,
        constraints:{
            presence: {
                message: "can't be empty"
            },
        }
    },
    {
        key: 'name',
        defaultValue: '',
        constraints: {
            presence: true,
            length: {
                minimum: 6,
                message:
                    <FormattedMessage
                        id={"Validation.minimum"}
                        values={{ minimum: '6' }}
                    />

            }
        }
    },
    {
        key: 'surname',
        defaultValue: '',
        constraints: {
            presence: true,
            length: {
                minimum: 6,
                message:
                    <FormattedMessage
                        id={"Validation.minimum"}
                        values={{ minimum: '6' }}
                    />
            }
        }
    },
    {
        key: 'email',
        defaultValue: '',
        constraints: {
            presence: true,
            email: {
                message:
                    <FormattedMessage
                        id={"Validation.email"}
                    />
            },
        }
    },
    {
        key: 'roles', defaultValue: []
    },
    {
        key: 'groups', defaultValue: []
    },
];