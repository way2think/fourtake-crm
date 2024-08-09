import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'checklist | Countries list',
};

const ForbiddenPage = () => {
    return (
        <div>
            <h1>403 - Forbidden</h1>
            <p>You do not have permission to access this page.</p>
        </div>
    );
};

export default ForbiddenPage;
