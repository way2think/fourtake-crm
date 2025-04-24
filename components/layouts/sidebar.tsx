'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/store/theme.store';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '@/store';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMenuNotes from '@/components/icon/menu/icon-menu-notes';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements';
import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables';
import IconMenuUsers from '@/components/icon/menu/icon-menu-users';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import { selectUser } from '@/store/user.store';
import { isAccessDenied } from '@/utils';
import { User } from '@/entities/user.entity';
import { Role } from '@/entities/role.entity';

import './sidebarstyle.css';
import IconHome from '../icon/icon-home';
import IconBook from '../icon/icon-book';

const Sidebar = () => {
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const { t } = getTranslation();
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [isAciveCondition, setIsAciveCondition] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);

    const user = useSelector(selectUser) as User;
    // console.log(';isser', user);

    const role = user?.role || 'guest';

    const toggleMenu = (value: string) => {
        if (value.charAt(0) === '1') {
            value = value.slice(1);
            setCurrentMenu(value);
        } else {
            setCurrentMenu((oldValue) => {
                return oldValue === value ? '' : value;
            });
        }

        if (currentMenu == 'User List') {
            setIsAciveCondition('active');
        }
        if (currentMenu == 'Lead Management') {
            setIsAciveCondition('active');
        }

        // if(value !== value) {
        //     setCurrentMenu((value) => {
        //         return value ;
        //      });
        // }

        // console.log(currentMenu);
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [dispatch, pathname, themeConfig.sidebar]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const handleClick = () => {
        toggleMenu('1User List');
        //navigate('/user-list');
        //router.push('/user-list');
    };

    // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     if (!clicked) {
    //         // First click: change background color
    //         e.preventDefault();
    //         setClicked(true);
    //         toggleMenu('Lead Management');
    //     } else {
    //         // Second click: navigate to the page
    //         router.push('/lead-list');
    //     }
    // };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-[#222D31] dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 justify-center items-center">
                            <Image className="w-[100px]" src="/assets/images/white logo fourtake.png" alt="logo" width={100} height={100} />
                            {/* <span className="align-middle text-2xl font-semibold text-[#fff] dark:text-white-light lg:inline ltr:ml-1.5 rtl:mr-1.5">Fourtake</span> */}
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto  rotate-90 !text-[#fff]" />
                        </button>
                    </div>

                    <PerfectScrollbar className="relative h-[calc(100vh-80px)] ">
                        <ul className="relative space-y-0.5 p-4 pt-5 font-semibold">
                            {isAccessDenied('/', role) && (
                                <li className="nav-item">
                                    <Link href="/" className="group ">
                                        <div className="flex items-center">
                                            <IconHome className="shrink-0 !text-[#fff] group-hover:!text-[#005fbe]" />
                                            <span className="group-hover:!text-[#005fbe]dark:group-hover:text-[#005fbe] text-white dark:text-[#506690] ltr:pl-3 rtl:pr-3">{t('Home')}</span>
                                        </div>
                                    </Link>
                                </li>
                            )}
                            {isAccessDenied('/dashboard', role) && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'Dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Dashboard')}>
                                        <div className="flex items-center">
                                            <IconMenuPages className="shrink-0 !text-[#fff] group-hover:!text-[#005fbe]" />
                                            <span className="text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Dashboard')}</span>
                                        </div>

                                        <div className={currentMenu !== 'Dashboard' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className="!text-[#fff] " />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'Dashboard' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/submission">Submission</Link>
                                            </li>
                                            <li>
                                                <Link href="/passport-collection">Passports Collections</Link>
                                            </li>
                                            <li>
                                                <Link href="/document-pickup-lead-level">Documents Pickup - lead level</Link>
                                            </li>
                                            <li>
                                                <Link href="/document-pickup-application-level ">Document Pickup - application level</Link>
                                            </li>
                                            <li>
                                                <Link href="/passport-drop-off">Passport Drop Off</Link>
                                            </li>
                                            <li>
                                                <Link href="/follow-up">Follow up</Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {isAccessDenied('/user-list', role) && (
                                <li className="menu nav-item">
                                    {/* <button type="button" className={`${currentMenu === 'User Management' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('User Management')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('User Management')}</span>
                                    </div>

                                    <div className={currentMenu !== 'User Management' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button> */}

                                    <Link
                                        href="/user-list"
                                        className={`${currentMenu === 'User List' || isAciveCondition === 'active' ? 'active' : ''} nav-link nabarbuttoncustom group w-full`}
                                        onClick={() => toggleMenu('User List')}
                                    >
                                        <div className="flex items-center">
                                            <IconMenuUsers className="shrink-0 !text-[#fff] " />
                                            <span className="text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                                {/* <Link href="/user-list">User List</Link> */}
                                                User List
                                            </span>
                                        </div>
                                        {/* 
                                    <div className={currentMenu !== 'User Management' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div> */}
                                    </Link>

                                    {/* <AnimateHeight duration={300} height={currentMenu === 'User Management' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/user-list">{t('User List')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/user-manage">{t('User Manage')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/assign-Password">{t('Assign Password')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight> */}
                                </li>
                            )}

                            {isAccessDenied('/lead-list', role) && (
                                <li className="menu nav-item">
                                    <Link
                                        href="/lead-list"
                                        className={`${currentMenu === 'Lead Management' || isAciveCondition === 'active' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('Lead Management')}
                                    >
                                        <div className="flex items-center">
                                            <IconMenuElements className="shrink-0 !text-[#fff] " />
                                            <span className="text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                                {/* <Link href="/lead-list">Lead Management</Link> */}
                                                Lead Management
                                            </span>
                                        </div>

                                        {/* <div className={currentMenu !== 'User Management' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>  */}
                                    </Link>

                                    {/* <button
                                    type="button"
                                    className={`${currentMenu === 'Lead Management' ? 'active' : ''} nav-link group w-full ${clicked ? 'active' : ''}`}
                                    onClick={handleClick}
                                >
                                    <div className="flex items-center">
                                        <IconMenuElements className="shrink-0 !text-[#fff] group-hover:!text-[#005fbe]" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                            <Link href="/lead-list">Lead Management</Link>
                                        </span>
                                    </div>
                                    <div className={currentMenu !== 'User Management' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button> */}
                                </li>
                            )}

                            {role === Role.SUPER_ADMIN && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'CMS' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('CMS')}>
                                        <div className="flex items-center">
                                            <IconMenuDatatables className="shrink-0 !text-[#fff] group-hover:!text-[#005fbe]" />
                                            <span className="text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('CMS')}</span>
                                        </div>

                                        <div className={currentMenu !== 'CMS' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className="!text-[#fff] " />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'CMS' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/countries-list">Countries List</Link>
                                            </li>
                                            <li>
                                                <Link href="/visa-checklist">Visa Checklist</Link>
                                            </li>
                                            <li>
                                                <Link href="/embassy-vfs">Embassy / VFS</Link>
                                            </li>
                                            <li>
                                                <Link href="/visa-types">Visa Types</Link>
                                            </li>
                                            <li>
                                                <Link href="/country-visa-type">Country Visa Types</Link>
                                            </li>
                                            <li>
                                                <Link href="/entry-types">Entry Types</Link>
                                            </li>
                                            <li>
                                                <Link href="/visa-status">Visa Status</Link>
                                            </li>
                                            <li>
                                                <Link href="/country-visa-urls">Country Visa Urls</Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {(role === Role.SUPER_ADMIN || role === Role.ADMIN || role === Role.EMPLOYEE) && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'Visa Process' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Visa Process')}>
                                        <div className="flex items-center">
                                            <IconMenuPages className="shrink-0 !text-[#fff] group-hover:!text-[#005fbe]" />
                                            <span className="text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Visa Process')}</span>
                                        </div>

                                        <div className={currentMenu !== 'Visa Process' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className="!text-[#fff] " />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'Visa Process' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/manage-visa">Manage Visa </Link>
                                            </li>
                                            <li>
                                                <Link href="/list-visa-applications">List Visa Applications</Link>
                                            </li>
                                            <li>
                                                <Link href="/deleted-application-list ">Deleted Application List</Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {(role === Role.SUPER_ADMIN || role === Role.ADMIN || role === Role.EMPLOYEE) && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'Reports ' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Reports ')}>
                                        <div className="flex items-center">
                                            <IconMenuNotes className="shrink-0 !text-[#fff]  group-hover:!text-[#005fbe]" />
                                            <span className="text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Reports ')}</span>
                                        </div>

                                        <div className={currentMenu !== 'Reports ' ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown className="!text-[#fff] " />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'Reports ' ? 'auto' : 0}>
                                        <ul className="sub-menu text-white">
                                            <li>
                                                <Link href="/daily-report">Daily Report</Link>
                                            </li>
                                            <li>
                                                <Link href="/finance-report">Finance Report </Link>
                                            </li>
                                            <li>
                                                <Link href="/status-wise-report">Status-wise Report </Link>
                                            </li>
                                            <li>
                                                <Link href="/payment-report  ">Payment Report </Link>
                                            </li>
                                            <li>
                                                <Link href="/out-scan">Out-scan </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/in-scan
                                             "
                                                >
                                                    In-Scan
                                                </Link>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {isAccessDenied('/list-attendence', role) && (
                                <li className="menu nav-item">
                                    {/* <Link
                                        href="/list-attendence"
                                        className={`${currentMenu === 'Attendence' || isAciveCondition === 'active' ? 'active' : ''} nav-link group w-full`}
                                        onClick={() => toggleMenu('Lead Management')}
                                    >
                                        <div className="flex items-center">
                                            <IconBook className="shrink-0 !text-[#fff] " />
                                            <span className="text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">Attendence</span>
                                        </div>
                                    </Link> */}

                                    {/* <button
                                    type="button"
                                    className={`${currentMenu === 'Lead Management' ? 'active' : ''} nav-link group w-full ${clicked ? 'active' : ''}`}
                                    onClick={handleClick}
                                >
                                    <div className="flex items-center">
                                        <IconMenuElements className="shrink-0 !text-[#fff] group-hover:!text-[#005fbe]" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                                            <Link href="/lead-list">Lead Management</Link>
                                        </span>
                                    </div>
                                    <div className={currentMenu !== 'User Management' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button> */}
                                </li>
                            )}

                            {/* <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('apps')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <Link href="/apps/chat" className="group">
                                            <div className="flex items-center">
                                                <IconMenuChat className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('chat')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/mailbox" className="group">
                                            <div className="flex items-center">
                                                <IconMenuMailbox className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('mailbox')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/todolist" className="group">
                                            <div className="flex items-center">
                                                <IconMenuTodo className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('todo_list')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/notes" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('notes')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/scrumboard" className="group">
                                            <div className="flex items-center">
                                                <IconMenuScrumboard className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('scrumboard')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/apps/contacts" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('contacts')}</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('invoice')}</span>
                                            </div>

                                            <div className={currentMenu !== 'invoice' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link href="/apps/invoice/list">{t('list')}</Link>
                                                </li>
                                                <li>
                                                    <Link href="/apps/invoice/preview">{t('preview')}</Link>
                                                </li>
                                                <li>
                                                    <Link href="/apps/invoice/add">{t('add')}</Link>
                                                </li>
                                                <li>
                                                    <Link href="/apps/invoice/edit">{t('edit')}</Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/apps/calendar" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCalendar className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('calendar')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('user_interface')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
                                    <div className="flex items-center">
                                        <IconMenuComponents className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('components')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'component' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/components/tabs">{t('tabs')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/accordions">{t('accordions')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/modals">{t('modals')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/cards">{t('cards')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/carousel">{t('carousel')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/countdown">{t('countdown')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/counter">{t('counter')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/sweetalert">{t('sweet_alerts')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/timeline">{t('timeline')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/notifications">{t('notifications')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/media-object">{t('media_object')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/list-group">{t('list_group')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/pricing-table">{t('pricing_tables')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/lightbox">{t('lightbox')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'element' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('element')}>
                                    <div className="flex items-center">
                                        <IconMenuElements className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('elements')}</span>
                                    </div>

                                    <div className={currentMenu !== 'element' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'element' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/elements/alerts">{t('alerts')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/avatar">{t('avatar')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/badges">{t('badges')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/breadcrumbs">{t('breadcrumbs')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/buttons">{t('buttons')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/buttons-group">{t('button_groups')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/color-library">{t('color_library')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/dropdown">{t('dropdown')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/infobox">{t('infobox')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/jumbotron">{t('jumbotron')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/loader">{t('loader')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/pagination">{t('pagination')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/popovers">{t('popovers')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/progress-bar">{t('progress_bar')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/search">{t('search')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/tooltips">{t('tooltips')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/treeview">{t('treeview')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/typography">{t('typography')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/charts" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('charts')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/widgets" className="group">
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('widgets')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/font-icons" className="group">
                                    <div className="flex items-center">
                                        <IconMenuFontIcons className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('font_icons')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <Link href="/dragndrop" className="group">
                                    <div className="flex items-center">
                                        <IconMenuDragAndDrop className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('drag_and_drop')}</span>
                                    </div>
                                </Link>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('tables_and_forms')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <Link href="/tables" className="group">
                                    <div className="flex items-center">
                                        <IconMenuTables className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('tables')}</span>
                                    </div>
                                </Link>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'datalabel' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('datalabel')}>
                                    <div className="flex items-center">
                                        <IconMenuDatatables className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('datatables')}</span>
                                    </div>

                                    <div className={currentMenu !== 'datalabel' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'datalabel' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/datatables/basic">{t('basic')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/advanced">{t('advanced')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/skin">{t('skin')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/order-sorting">{t('order_sorting')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/multi-column">{t('multi_column')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/multiple-tables">{t('multiple_tables')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/alt-pagination">{t('alt_pagination')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/checkbox">{t('checkbox')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/range-search">{t('range_search')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/export">{t('export')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/datatables/column-chooser">{t('column_chooser')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'forms' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('forms')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('forms')}</span>
                                    </div>

                                    <div className={currentMenu !== 'forms' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'forms' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/forms/basic">{t('basic')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/input-group">{t('input_group')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/layouts">{t('layouts')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/validation">{t('validation')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/input-mask">{t('input_mask')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/select2">{t('select2')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/touchspin">{t('touchspin')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/checkbox-radio">{t('checkbox_and_radio')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/switches">{t('switches')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/wizards">{t('wizards')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/file-upload">{t('file_upload')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/quill-editor">{t('quill_editor')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/markdown-editor">{t('markdown_editor')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/date-picker">{t('date_and_range_picker')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/forms/clipboard">{t('clipboard')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('user_and_pages')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('users')}</span>
                                    </div>

                                    <div className={currentMenu !== 'users' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/users/profile">{t('profile')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/users/user-account-settings">{t('account_settings')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'page' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('page')}>
                                    <div className="flex items-center">
                                        <IconMenuPages className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('pages')}</span>
                                    </div>

                                    <div className={currentMenu !== 'page' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'page' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/pages/knowledge-base">{t('knowledge_base')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/contact-us-boxed" target="_blank">
                                                {t('contact_us_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/contact-us-cover" target="_blank">
                                                {t('contact_us_cover')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/faq">{t('faq')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/coming-soon-boxed" target="_blank">
                                                {t('coming_soon_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/coming-soon-cover" target="_blank">
                                                {t('coming_soon_cover')}
                                            </Link>
                                        </li>
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    errorSubMenu ? 'open' : ''
                                                } w-full before:h-[5px] before:w-[5px] before:rounded before:bg-gray-300 hover:bg-gray-100 dark:text-[#888ea8] dark:hover:bg-gray-900 ltr:before:mr-2 rtl:before:ml-2`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                {t('error')}
                                                <div className={`${errorSubMenu ? '-rotate-90 rtl:rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="h-4 w-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/pages/error404" target="_blank">
                                                            {t('404')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/pages/error500" target="_blank">
                                                            {t('500')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/pages/error503" target="_blank">
                                                            {t('503')}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li>
                                            <Link href="/pages/maintenence" target="_blank">
                                                {t('maintenence')}
                                            </Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'auth' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('auth')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('authentication')}</span>
                                    </div>

                                    <div className={currentMenu !== 'auth' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'auth' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/auth/boxed-signin" target="_blank">
                                                {t('login_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/boxed-signup" target="_blank">
                                                {t('register_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/boxed-lockscreen" target="_blank">
                                                {t('unlock_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/boxed-password-reset" target="_blank">
                                                {t('recover_id_boxed')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/cover-login" target="_blank">
                                                {t('login_cover')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/cover-register" target="_blank">
                                                {t('register_cover')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/cover-lockscreen" target="_blank">
                                                {t('unlock_cover')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth/cover-password-reset" target="_blank">
                                                {t('recover_id_cover')}
                                            </Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('supports')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <Link href="https://vristo.sbthemes.com" target="_blank" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('documentation')}</span>
                                    </div>
                                </Link>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
