'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { toggleRTL, toggleTheme, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from '@/store/theme.store';
import Loading from '@/components/layouts/loading';
import { getTranslation } from '@/i18n';
import { useSession } from 'next-auth/react';
import { useLazyGetCurrentUserQuery } from './services/api/userSlice';
import { setCurrentUser } from './store/user.store';
import LoadingSpinner from './components/Reusable/LoadingSpinner/LoadingSpinner';
import { selectIsLoading } from './store/app.store';

function App({ children }: PropsWithChildren) {
    const dispatch = useDispatch();

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const { initLocale } = getTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const { data, status, update } = useSession();

    const [getCurrentUser, { isError, isFetching, isLoading: isGetCurrentUserLoading, error, data: currentUser, isSuccess }] = useLazyGetCurrentUserQuery();

    useEffect(() => {
        const userId = data?.user?.id;
        if (userId && status === 'authenticated') {
            // console.log('id:', userId);
            getCurrentUser(userId);
        }
    }, [data?.user?.id, getCurrentUser, status]);

    useEffect(() => {
        if (isSuccess && currentUser) {
            dispatch(setCurrentUser(currentUser));
        }
    }, [currentUser, dispatch, isSuccess]);

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
        // locale
        initLocale(themeConfig.locale);

        setIsLoading(false);
    }, [dispatch, initLocale, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

    // const checkSessionToken = async () => {};

    const isLoadingSpinner = useSelector(selectIsLoading);

    return (
        <div
            className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section relative font-nunito text-sm font-normal antialiased`}
        >
            {isLoadingSpinner && <LoadingSpinner />}
            {isLoading ? <Loading /> : children}
        </div>
    );
}

export default App;
