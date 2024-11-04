export const normalizePathname = (pathname: string) => pathname.split('?')[0].split('/').slice(0, 2).join('/');

export const roleAccessMap = {
    '/': ['super_admin', 'admin', 'employee', 'agent', 'corporate', 'accountant'],
    '/user-list': ['super_admin', 'admin'],
    '/lead-list': ['super_admin', 'admin', 'employee'],
    // '/cms': ['super_admin'],
    '/countries-list': ['super_admin'],
    '/visa-checklist': ['super_admin'],
    '/embassy-vfs': ['super_admin'],
    '/visa-types': ['super_admin'],
    '/country-visa-type': ['super_admin'],
    '/entry-types': ['super_admin'],
    '/visa-status': ['super_admin'],
    '/country-visa-urls': ['super_admin'],
    // '/visa-process': ['super_admin', 'admin', 'employee'],
    '/manage-visa': ['super_admin', 'admin', 'employee'],
    '/list-visa-applications': ['super_admin', 'admin', 'employee'],
    '/deleted-application-list': ['super_admin', 'admin', 'employee'],
    // reports
    '/reports': ['super_admin', 'admin', 'employee'],
    // accounts
    '/accounts': ['super_admin', 'accountant'],
};

export const isAccessDenied = (pathname: string, role: string) => {
    const normalizedPathname = normalizePathname(pathname);
    const allowedRoles = roleAccessMap[normalizedPathname as keyof typeof roleAccessMap];

    // console.log('isAcccessGranted', normalizedPathname, role, allowedRoles);

    if (allowedRoles && !allowedRoles.includes(role)) {
        return false;
    }

    return true;
};
