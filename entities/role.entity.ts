enum Role {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    ACCOUNTANT = 'accountant',
    AGENT = 'agent',
    CORPORATE = 'corporate',
    GUEST = 'guest',
}

const roles = [
    {
        name: 'Super Admin',
        value: 'super_admin',
    },
    {
        name: 'Admin',
        value: 'admin',
    },
    {
        name: 'Employee',
        value: 'employee',
    },
    {
        name: 'Accountant',
        value: 'accountant',
    },
    {
        name: 'Agent',
        value: 'agent',
    },
    {
        name: 'Corporate',
        value: 'corporate',
    },
];

const rolesObject = roles.reduce<{ [key: string]: string }>((acc, role) => {
    acc[role.value] = role.name;
    return acc;
}, {});

// {
//     'super_admin': 'Super Admin',
//     'admin': 'Admin',
//     'employee': 'Employee',
//     'accountant': 'Accountant',
//     'agent': 'Agent',
//     'corporate': 'Corporate'
// }

export { Role, roles, rolesObject };
